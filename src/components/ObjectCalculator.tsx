import React, { useState, useEffect } from 'react';
import { objectStorageProviders } from '../data/object-provider';
import { Database, HardDrive, ChevronDown, ChevronUp, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function ObjectCalculator() {
  const [selectedProvider, setSelectedProvider] = useState(objectStorageProviders[0].id);
  const [storageAmount, setStorageAmount] = useState<number>(1);
  const [transferAmount, setTransferAmount] = useState<number>(1);
  const [selectedTier, setSelectedTier] = useState<string>('Standard');
  const [storageCost, setStorageCost] = useState<number>(0);
  const [transferCost, setTransferCost] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [showPricing, setShowPricing] = useState(false);
  const { addToCart } = useCart();


  const calculateCost = () => {
    const provider = objectStorageProviders.find(p => p.id === selectedProvider);
    if (!provider) return { total: 0, storage: 0, transfer: 0 };

    // Find the applicable storage tier based on name and storage amount
    const storageTier = provider.storageTiers.find(tier => 
      tier.name === selectedTier &&
      (!tier.minStorage || storageAmount >= tier.minStorage) &&
      (!tier.maxStorage || storageAmount <= tier.maxStorage)
    ) || provider.storageTiers[0]; // Default to first tier if none found

    // Calculate storage cost
    const storageCost = storageTier 
      ? storageAmount * storageTier.storagePrice
      : 0;

    // Calculate transfer cost
    const transferTier = provider.transferTiers[0];
    const transferCost = transferAmount * transferTier.price;

    return { total: storageCost + transferCost, storage: storageCost, transfer: transferCost };
  };

  useEffect(() => {
    const costs = calculateCost();
    setStorageCost(costs.storage);
    setTransferCost(costs.transfer);
    setTotalCost(costs.total);
  }, [selectedProvider, storageAmount, transferAmount, selectedTier]);

  const currentProvider = objectStorageProviders.find(p => p.id === selectedProvider);

  // Update selected tier when provider changes
  useEffect(() => {
    if (currentProvider && currentProvider.storageTiers.length > 0) {
      setSelectedTier(currentProvider.storageTiers[0].name);
    }
  }, [selectedProvider]);

  const handleAddToCart = () => {
    if (!currentProvider) return;
    
    addToCart({
      type: 'object-storage',
      provider: currentProvider.name,
      storageTier: selectedTier,
      storageAmount,
      transferAmount,
      cost: totalCost
    });
  };

  const renderPricingDetails = () => {
    return (
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="text-left py-2">Provider</th>
              <th className="text-left py-2">Storage Cost (per GB/month)</th>
              <th className="text-left py-2">Data Transfer Cost (per GB)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b dark:border-gray-700">
              <td className="py-2">Amazon S3</td>
              <td className="py-2">
                $0.023 (first 50 TB)<br />
                $0.022 (next 450 TB)<br />
                $0.021 (over 500 TB)
              </td>
              <td className="py-2">$0.09</td>
            </tr>
            <tr className="border-b dark:border-gray-700">
              <td className="py-2">DigitalOcean Spaces</td>
              <td className="py-2">$0.020</td>
              <td className="py-2">$0.01</td>
            </tr>
            <tr className="border-b dark:border-gray-700">
              <td className="py-2">Google Cloud Storage</td>
              <td className="py-2">
                $0.026 (Standard)<br />
                $0.010 (Nearline)<br />
                $0.007 (Coldline)<br />
                $0.004 (Archive)
              </td>
              <td className="py-2">$0.12</td>
            </tr>
            <tr>
              <td className="py-2">Azure Blob Storage</td>
              <td className="py-2">
                $0.018 (Hot)<br />
                $0.010 (Cool)<br />
                $0.00099 (Archive)
              </td>
              <td className="py-2">$0.087</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
              Provider
            </label>
            <div className="relative">
              <Database className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm bg-white dark:bg-gray-700 dark:text-gray-200"
              >
                {objectStorageProviders.map((provider) => (
                  <option key={provider.id} value={provider.id}>
                    {provider.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {currentProvider && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                Storage Tier
              </label>
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm bg-white dark:bg-gray-700 dark:text-gray-200"
              >
                {currentProvider.storageTiers.map((tier) => (
                  <option key={tier.name} value={tier.name}>
                    {tier.name} (${tier.storagePrice.toFixed(3)}/GB per month)
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
              Storage Amount (GB)
            </label>
            <div className="relative">
              <HardDrive className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
              <input
                type="number"
                min="0"
                value={storageAmount}
                onChange={(e) => setStorageAmount(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm bg-white dark:bg-gray-700 dark:text-gray-200"
                placeholder="Enter storage amount..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
              Data Transfer Amount (GB)
            </label>
            <div className="relative">
              <HardDrive className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
              <input
                type="number"
                min="0"
                value={transferAmount}
                onChange={(e) => setTransferAmount(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm bg-white dark:bg-gray-700 dark:text-gray-200"
                placeholder="Enter transfer amount..."
              />
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-sm">
              <span className="text-gray-600 dark:text-gray-400">Storage Cost:</span>
              <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">
                ${storageCost.toFixed(2)}/month
              </span>
            </div>
            <div className="text-sm">
              <span className="text-gray-600 dark:text-gray-400">Transfer Cost:</span>
              <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">
                ${transferCost.toFixed(2)}/month
              </span>
            </div>
            <div className="text-sm md:text-right">
              <span className="text-gray-600 dark:text-gray-400">Total Cost:</span>
              <span className="ml-2 font-semibold text-yellow-600 dark:text-yellow-400">
                ${totalCost.toFixed(2)}/month
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      <button
        onClick={() => setShowPricing(!showPricing)}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 
                  bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                  hover:bg-gray-50 dark:hover:bg-gray-700 
                  rounded-lg transition-colors duration-200
                  text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {showPricing ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        {showPricing ? 'Hide' : 'Show'} Pricing Details
      </button>

      {showPricing && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          {renderPricingDetails()}
        </div>
      )}
    </div>
  );
}

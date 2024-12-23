import React, { useState, useEffect } from 'react';
import { objectStorageProviders } from '../data/object-provider';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useCart } from '../context/CartContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Object Storage Calculator</CardTitle>
        <CardDescription>
          Calculate costs for different object storage providers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Provider</Label>
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            {objectStorageProviders.map((provider) => (
              <option key={provider.id} value={provider.id}>
                {provider.name}
              </option>
            ))}
          </select>
        </div>

        {currentProvider && (
          <div className="space-y-2">
            <Label>Storage Tier</Label>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              {currentProvider.storageTiers.map((tier) => (
                <option key={tier.name} value={tier.name}>
                  {tier.name} (${tier.storagePrice.toFixed(3)}/GB per month)
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="space-y-2">
          <Label>Storage Amount (GB)</Label>
          <Input
            type="number"
            min="0"
            value={storageAmount}
            onChange={(e) => setStorageAmount(Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label>Data Transfer Amount (GB)</Label>
          <Input
            type="number"
            min="0"
            value={transferAmount}
            onChange={(e) => setTransferAmount(Number(e.target.value))}
          />
        </div>

        <div className="pt-4 space-y-2">
          <div className="text-md">
            Storage Cost: ${storageCost.toFixed(2)}/month
          </div>
          <div className="text-md">
            Transfer Cost: ${transferCost.toFixed(2)}/month
          </div>
          <div className="text-lg font-semibold">
            Total Estimated Cost: ${totalCost.toFixed(2)}/month
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
        >
          Add to Cart
        </button>

        <button
          onClick={() => setShowPricing(!showPricing)}
          className="w-full mt-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
        >
          {showPricing ? 'Hide' : 'Show'} Pricing Details
          {showPricing ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showPricing && renderPricingDetails()}
      </CardContent>
    </Card>
  );
}

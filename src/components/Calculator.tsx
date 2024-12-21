import React, { useState } from 'react';
import { Clock, Calculator as CalcIcon, ChevronDown, ChevronUp, ShoppingCart } from 'lucide-react';
import { speechProviders } from '../data/providers';
import { calculateAllCosts } from '../utils/calculateCost';
import { PricingCard } from './PricingCard';
import { useCart } from '../context/CartContext';

export function Calculator() {
  const [minutes, setMinutes] = useState<number>(0);
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showAllPrices, setShowAllPrices] = useState<boolean>(false);
  const { addToCart } = useCart();
  
  const results = calculateAllCosts(minutes, 
    selectedProvider === 'all' 
      ? speechProviders 
      : speechProviders.filter(p => p.id === selectedProvider)
  );

  const sortedResults = [...results.breakdown].sort((a, b) => a.cost - b.cost);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
              Number of Minutes
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
              <input
                type="number"
                min="0"
                value={minutes}
                onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm bg-white dark:bg-gray-700 dark:text-gray-200"
                placeholder="Enter minutes..."
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
              Provider
            </label>
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm bg-white dark:bg-gray-700 dark:text-gray-200"
            >
              <option value="all">All Providers</option>
              {speechProviders.map(provider => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedResults
            .slice(0, showAllPrices ? undefined : 6)
            .map((result, index) => (
              <PricingCard
                key={result.provider}
                provider={speechProviders.find(p => p.name === result.provider)?.name || result.provider}
                cost={result.cost}
                isLowestPrice={index === 0}
                description={speechProviders.find(p => p.name === result.provider)?.description}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Duration: {minutes} minutes
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart({
                      type: 'speech-to-text',
                      provider: result.provider,
                      model: result.model,
                      duration: minutes,
                      cost: result.cost
                    })}
                    className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center gap-1"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </PricingCard>
            ))}
        </div>
        
        {sortedResults.length > 6 && (
          <button
            onClick={() => setShowAllPrices(!showAllPrices)}
            className="w-full py-2 text-sm font-medium text-yellow-600 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors mt-4"
          >
            {showAllPrices 
              ? "Show Less"
              : `Show ${sortedResults.length - 6} More Providers`
            }
          </button>
        )}
      </div>

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 
                  bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                  hover:bg-gray-50 dark:hover:bg-gray-700 
                  rounded-lg transition-colors duration-200
                  text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        {showDetails ? 'Hide' : 'Show'} Pricing Details
      </button>

      {showDetails && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <CalcIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
              Provider Pricing Tiers
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Non-Deepgram providers */}
            {speechProviders
              .filter(p => !p.group)
              .map(provider => (
                <div key={provider.id} className="border border-gray-100 dark:border-gray-700 rounded-lg p-3 bg-gray-50/50 dark:bg-gray-800">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">{provider.name}</h4>
                  <div className="space-y-1.5">
                    {provider.tiers.map((tier, index) => {
                      const nextTier = provider.tiers[index + 1];
                      const range = nextTier
                        ? `${tier.minutes.toLocaleString()}-${nextTier.minutes.toLocaleString()}`
                        : `${tier.minutes.toLocaleString()}+`;
                      
                      return (
                        <div key={index} className="flex justify-between text-sm bg-white dark:bg-gray-700 dark:text-gray-200 p-1.5 rounded border border-gray-100 dark:border-gray-700">
                          <span className="text-gray-600 dark:text-gray-300">{range} min</span>
                          <span className="font-medium">${tier.pricePerMinute}/min</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

            {/* Deepgram models grouped */}
            <div className="lg:col-span-3 border border-gray-100 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Deepgram</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {speechProviders
                  .filter(p => p.group === 'Deepgram')
                  .map(model => (
                    <div key={model.id} className="bg-white dark:bg-gray-700 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                      <div className="font-medium text-gray-800 dark:text-gray-200 mb-1">{model.name.replace('Deepgram ', '')}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 mb-2">{model.description}</div>
                      <div className="text-sm font-medium text-yellow-600">
                        ${model.tiers[0].pricePerMinute}/min
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Groq models grouped */}
            <div className="lg:col-span-3 border border-gray-100 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Groq</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {speechProviders
                  .filter(p => p.group === 'Groq')
                  .map(model => (
                    <div key={model.id} className="bg-white dark:bg-gray-700 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                      <div className="font-medium text-gray-800 dark:text-gray-200 mb-1">{model.name.replace('Groq ', '')}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 mb-2">{model.description}</div>
                      <div className="text-sm font-medium text-yellow-600">
                        ${model.tiers[0].pricePerMinute}/min
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
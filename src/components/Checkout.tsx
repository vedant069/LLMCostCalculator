import React from 'react';
import { ShoppingCart, ExternalLink, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { llmProviders, LLMProvider } from '../data/llm-providers';
import { speechProviders } from '../data/providers';
import { objectStorageProviders } from '../data/object-provider';
import { CartItem, LLMCartItem, SpeechToTextCartItem } from '../context/CartContext';

export function Checkout() {
  const { items, total } = useCart();

  const getPricingUrl = (provider: string, type: 'llm' | 'speech-to-text' | 'object-storage'): string | undefined => {
    if (type === 'llm') {
      const llmProvider = llmProviders.find(p => p.name === provider) as LLMProvider;
      return llmProvider?.pricingUrl;
    } else if (type === 'speech-to-text') {
      const speechProvider = speechProviders.find(p => p.name === provider);
      return speechProvider?.pricingUrl;
    } else if (type === 'object-storage') {
      const storageProvider = objectStorageProviders.find(p => p.name === provider);
      // Add pricing URLs to object-provider.ts if needed
      return undefined;
    }
  };

  const renderCheckoutItem = (item: CartItem, index: number) => {
    if (item.type === 'llm') {
      const pricingUrl = getPricingUrl(item.provider, 'llm');
      return (
        <div key={index} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-0.5 rounded">
                LLM
              </span>
              <div className="flex items-center gap-1">
                {pricingUrl ? (
                  <a
                    href={pricingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1"
                  >
                    {item.provider}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="font-medium">{item.provider}</span>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Model: {item.model} (Version: {item.version})
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tokens: {item.inputTokens.toLocaleString()} input, {item.outputTokens.toLocaleString()} output
              </p>
            </div>
          </div>
          <div className="ml-4">
            <p className="font-medium">${item.cost.toFixed(2)}</p>
          </div>
        </div>
      );
    } else if (item.type === 'speech-to-text') {
      const pricingUrl = getPricingUrl(item.provider, 'speech-to-text');
      return (
        <div key={index} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2 py-0.5 rounded">
                Speech to Text
              </span>
              <div className="flex items-center gap-1">
                {pricingUrl ? (
                  <a
                    href={pricingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1"
                  >
                    {item.provider}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="font-medium">{item.provider}</span>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Model: {item.model}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Duration: {item.duration.toLocaleString()} minutes
              </p>
            </div>
          </div>
          <div className="ml-4">
            <p className="font-medium">${item.cost.toFixed(2)}</p>
          </div>
        </div>
      );
    } else if (item.type === 'object-storage') {
      const pricingUrl = getPricingUrl(item.provider, 'object-storage');
      return (
        <div key={index} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 px-2 py-0.5 rounded">
                Object Storage
              </span>
              <div className="flex items-center gap-1">
                {pricingUrl ? (
                  <a
                    href={pricingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1"
                  >
                    {item.provider}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="font-medium">{item.provider}</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Storage Tier
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.storageTier}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Storage Amount
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.storageAmount.toLocaleString()} GB
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Transfer Amount
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.transferAmount.toLocaleString()} GB
                </p>
              </div>
            </div>
          </div>
          <div className="ml-4">
            <p className="font-medium">${item.cost.toFixed(2)}</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <ShoppingCart className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Checkout</h2>
        </div>

        <div className="space-y-4 mb-8">
          {items.map((item, index) => renderCheckoutItem(item, index))}
        </div>

        {items.length > 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Order Summary</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${total.toFixed(2)}</p>
            </div>
            <button
              className="w-full bg-yellow-500 text-white py-3 rounded-lg font-medium hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Proceed to Payment
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Your cart is empty</p>
          </div>
        )}
      </div>
    </div>
  );
}
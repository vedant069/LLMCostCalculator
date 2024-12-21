import React from 'react';
import { ShoppingCart, X, ExternalLink } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { llmProviders } from '../data/llm-providers';
import { speechProviders } from '../data/providers';

export function Cart() {
  const { items, removeFromCart, total } = useCart();

  const getPricingUrl = (provider: string, type: string) => {
    if (type === 'llm') {
      const llmProvider = llmProviders.find(p => p.name === provider);
      return llmProvider?.pricingUrl;
    } else {
      const speechProvider = speechProviders.find(p => p.name === provider);
      return speechProvider?.pricingUrl;
    }
  };

  const renderCartItem = (item: any, index: number) => {
    if (item.type === 'llm') {
      const pricingUrl = getPricingUrl(item.provider, 'llm');
      return (
        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <div className="flex items-center gap-2">
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
                <span className="font-medium text-gray-600 dark:text-gray-300">- {item.model}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Version: {item.version}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tokens: {item.inputTokens.toLocaleString()} input, {item.outputTokens.toLocaleString()} output
            </p>
            <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
              ${item.cost.toFixed(4)}
            </p>
          </div>
          <button
            onClick={() => removeFromCart(index)}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      );
    } else if (item.type === 'speech-to-text') {
      const pricingUrl = getPricingUrl(item.provider, 'speech-to-text');
      return (
        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2 py-0.5 rounded">
                Speech-to-Text
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
                <span className="font-medium text-gray-600 dark:text-gray-300">- {item.model}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Duration: {item.duration.toLocaleString()} minutes
            </p>
            <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
              ${item.cost.toFixed(4)}
            </p>
          </div>
          <button
            onClick={() => removeFromCart(index)}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingCart className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Cart</h2>
      </div>
      
      {items.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => renderCartItem(item, index))}
          
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                ${total.toFixed(4)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

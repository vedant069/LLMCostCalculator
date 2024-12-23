import React from 'react';
import { ShoppingCart, ExternalLink, CreditCard, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { llmProviders, LLMProvider } from '../data/llm-providers';
import { speechProviders } from '../data/providers';
import { objectStorageProviders } from '../data/object-provider';
import { CartItem, LLMCartItem, SpeechToTextCartItem } from '../context/CartContext';

export function Checkout() {
  const { items, total, removeFromCart } = useCart();

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
        <div key={index} className="flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2.5 py-1 rounded-md">
                LLM
              </span>
              <div className="flex items-center gap-1.5">
                {pricingUrl ? (
                  <a
                    href={pricingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1.5 transition-colors"
                  >
                    {item.provider}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="font-medium">{item.provider}</span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Model: <span className="font-medium">{item.model}</span> (Version: {item.version})
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tokens: <span className="font-medium">{item.inputTokens.toLocaleString()}</span> input, <span className="font-medium">{item.outputTokens.toLocaleString()}</span> output
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">
              ${item.cost.toFixed(4)}
            </p>
            <button
              onClick={() => removeFromCart(index)}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
              aria-label="Remove item"
            >
              <X className="w-4 h-4 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400" />
            </button>

          </div>
        </div>
      );
    } else if (item.type === 'speech-to-text') {
      const pricingUrl = getPricingUrl(item.provider, 'speech-to-text');
      return (
        <div key={index} className="flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2.5 py-1 rounded-md">
                Speech-to-Text

              </span>
              <div className="flex items-center gap-1.5">
                {pricingUrl ? (
                  <a
                    href={pricingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1.5 transition-colors"
                  >
                    {item.provider}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="font-medium">{item.provider}</span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Model: <span className="font-medium">{item.model}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Duration: <span className="font-medium">{item.duration.toLocaleString()}</span> minutes
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">
              ${item.cost.toFixed(4)}
            </p>
            <button
              onClick={() => removeFromCart(index)}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
              aria-label="Remove item"
            >
              <X className="w-4 h-4 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400" />
            </button>

          </div>
        </div>
      );
    }
  };

  return (

    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <ShoppingCart className="w-7 h-7" />
        <h1 className="text-2xl font-bold">Checkout</h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
        </div>
      ) : (
        <>
        <div className="space-y-4">
          {items.map((item, index) => renderCheckoutItem(item, index))}
        </div>

        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Order Summary</h2>
            <CreditCard className="w-7 h-7 text-yellow-500 dark:text-yellow-400" />
          </div>
          
          <div className="space-y-6">
            {/* <div className="flex justify-between pb-4 border-b-2 border-gray-200 dark:border-gray-700">
              <span className="text-lg text-gray-600 dark:text-gray-400">Subtotal</span>
              <span className="text-lg font-medium">${total.toFixed(4)}</span>
            </div> */}
            
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900 dark:text-white">Total Amount</span>
                <span className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  ${total.toFixed(4)}
                </span>
              </div>
            </div>

            {/* <button 
              className="w-full mt-6 px-6 py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-bold text-lg flex items-center justify-center gap-3 transition-all duration-200 shadow-md hover:shadow-lg"

            >
              <CreditCard className="w-6 h-6" />
              Proceed to Payment
            </button> */}
          </div>

        </div>
      </>
    )}
  </div>
);
}
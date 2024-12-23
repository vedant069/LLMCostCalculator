import React from 'react';
import { ShoppingCart, ExternalLink, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { llmProviders, LLMProvider } from '../data/llm-providers';
import { speechProviders } from '../data/providers';
import { CartItem, LLMCartItem, SpeechToTextCartItem } from '../context/CartContext';

export function Checkout() {
  const { items, total } = useCart();

  const getPricingUrl = (provider: string, type: 'llm' | 'speech-to-text'): string | undefined => {
    if (type === 'llm') {
      const llmProvider = llmProviders.find(p => p.name === provider) as LLMProvider;
      return llmProvider?.pricingUrl;
    } else {
      const speechProvider = speechProviders.find(p => p.name === provider);
      return speechProvider?.pricingUrl;
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
          <div className="text-right">
            <p className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">
              ${item.cost.toFixed(4)}
            </p>
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
          <div className="text-right">
            <p className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">
              ${item.cost.toFixed(4)}
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCart className="w-6 h-6" />
        <h1 className="text-2xl font-bold">Checkout</h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item, index) => renderCheckoutItem(item, index))}
          </div>

          <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <CreditCard className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="font-medium">${total.toFixed(4)}</span>
              </div>
              
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-yellow-600 dark:text-yellow-400">${total.toFixed(4)}</span>
              </div>
            </div>

            <button 
              className="w-full mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <CreditCard className="w-5 h-5" />
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
}
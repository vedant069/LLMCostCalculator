import React, { useState } from 'react';
import { ShoppingCart, ExternalLink, CreditCard, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { llmProviders, LLMProvider } from '../data/llm-providers';
import { speechProviders } from '../data/providers';
import { objectStorageProviders } from '../data/object-provider';
import { CartItem } from '../context/CartContext';
import {Slider}  from './ui/slider';

export function Summary() {
  const { items, removeFromCart } = useCart();
  const [numQuestions, setNumQuestions] = useState(1);

  const calculateTotalCost = () => {
    // Calculate costs based on number of questions
    const inputTokensPerQuestion = 200;
    const outputTokensPerQuestion = 150;
    const sttMinutesPerQuestion = 2;
    const storageGBPerQuestion = 0.01;

    const totalInputTokens = numQuestions * inputTokensPerQuestion;
    const totalOutputTokens = numQuestions * outputTokensPerQuestion;
    const totalSTTMinutes = numQuestions * sttMinutesPerQuestion;
    const totalStorageGB = numQuestions * storageGBPerQuestion;

    // You can adjust these rates based on your needs
    const llmInputRate = 0.0001; // per token
    const llmOutputRate = 0.0002; // per token
    const sttRate = 0.01; // per minute
    const storageRate = 0.02; // per GB

    const llmCost = (totalInputTokens * llmInputRate) + (totalOutputTokens * llmOutputRate);
    const sttCost = totalSTTMinutes * sttRate;
    const storageCost = totalStorageGB * storageRate;

    return {
      llmCost,
      sttCost,
      storageCost,
      total: llmCost + sttCost + storageCost,
      metrics: {
        inputTokens: totalInputTokens,
        outputTokens: totalOutputTokens,
        sttMinutes: totalSTTMinutes,
        storageGB: totalStorageGB
      }
    };
  };

  const costs = calculateTotalCost();

  const getPricingUrl = (provider: string, type: string): string | undefined => {
    if (type === 'llm') {
      const llmProvider = llmProviders.find(p => p.name === provider) as LLMProvider;
      return llmProvider?.pricingUrl;
    } else if (type === 'speech-to-text') {
      const speechProvider = speechProviders.find(p => p.name === provider);
      return speechProvider?.pricingUrl;
    } else if (type === 'object-storage') {
      const storageProvider = objectStorageProviders.find(p => p.name === provider);
      return storageProvider?.pricingUrl;
    }
  };

  const renderSummaryItem = (item: CartItem, index: number) => {
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
            </div>
          </div>
          <button
            onClick={() => removeFromCart(index)}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
            aria-label="Remove item"
          >
            <X className="w-4 h-4 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400" />
          </button>
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
            </div>
          </div>
          <button
            onClick={() => removeFromCart(index)}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
            aria-label="Remove item"
          >
            <X className="w-4 h-4 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400" />
          </button>
        </div>
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <ShoppingCart className="w-7 h-7" />
        <h1 className="text-2xl font-bold">Summary</h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item, index) => renderSummaryItem(item, index))}
          </div>

          <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Cost Calculator</h2>
              <CreditCard className="w-7 h-7 text-yellow-500 dark:text-yellow-400" />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Number of Questions: {numQuestions}</label>
                <Slider
                  value={[numQuestions]}
                  onValueChange={(value) => setNumQuestions(value[0])}
                  min={1}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h3 className="font-medium mb-2">LLM Usage</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Input Tokens: {costs.metrics.inputTokens.toLocaleString()}<br />
                    Output Tokens: {costs.metrics.outputTokens.toLocaleString()}<br />
                    Cost: ${costs.llmCost.toFixed(4)}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h3 className="font-medium mb-2">Speech-to-Text Usage</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Duration: {costs.metrics.sttMinutes.toLocaleString()} minutes<br />
                    Cost: ${costs.sttCost.toFixed(4)}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h3 className="font-medium mb-2">Storage Usage</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Storage: {costs.metrics.storageGB.toFixed(3)} GB<br />
                    Cost: ${costs.storageCost.toFixed(4)}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">Total Cost</span>
                  <span className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                    ${costs.total.toFixed(4)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { Calculator as CalcIcon, ChevronDown, ChevronUp, MessageSquare, ShoppingCart } from 'lucide-react';
import { llmProviders } from '../data/llm-providers';
import { LLMPricingCard } from './LLMPricingCard';
import { Provider } from '../types/pricing';
import { useCart } from '../context/CartContext';

export function LLMCalculator() {
  const [inputTokens, setInputTokens] = useState<number>(0);
  const [outputTokens, setOutputTokens] = useState<number>(0);
  const [inputWords, setInputWords] = useState<number>(0);
  const [outputWords, setOutputWords] = useState<number>(0);
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showAllPrices, setShowAllPrices] = useState<boolean>(false);
  const [calculationType, setCalculationType] = useState<'tokens' | 'words'>('tokens');
  const { addToCart } = useCart();

  const WORDS_TO_TOKENS_RATIO = 0.8;

  const handleInputChange = (value: number, type: 'input' | 'output') => {
    const numValue = Math.max(0, value || 0);
    if (calculationType === 'tokens') {
      if (type === 'input') {
        setInputTokens(numValue);
        setInputWords(Math.round(numValue / WORDS_TO_TOKENS_RATIO));
      } else {
        setOutputTokens(numValue);
        setOutputWords(Math.round(numValue / WORDS_TO_TOKENS_RATIO));
      }
    } else {
      if (type === 'input') {
        setInputWords(numValue);
        setInputTokens(Math.round(numValue * WORDS_TO_TOKENS_RATIO));
      } else {
        setOutputWords(numValue);
        setOutputTokens(Math.round(numValue * WORDS_TO_TOKENS_RATIO));
      }
    }
  };

  const calculateCost = (provider: Provider) => {
    const results = [];

    provider.models?.forEach((model) => {
      model.versions.forEach((version) => {
        const inputCost = (inputTokens / 1_000_000) * version.pricing.inputPrice;
        const outputCost = (outputTokens / 1_000_000) * version.pricing.outputPrice;
        const cost = inputCost + outputCost;

        results.push({
          provider: provider.name,
          model: model.name,
          version: version.name,
          pricing: version.pricing,
          cost
        });
      });
    });

    return results;
  };

  const results = selectedProvider === 'all'
    ? llmProviders.flatMap(provider => calculateCost(provider))
    : calculateCost(llmProviders.find(p => p.id === selectedProvider)!);

  const sortedResults = [...results].sort((a, b) => a.cost - b.cost);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Calculation Type
            </label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCalculationType('tokens')}
                className={`px-4 py-1.5 text-sm rounded-lg transition-colors ${
                  calculationType === 'tokens'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Tokens
              </button>
              <button
                onClick={() => setCalculationType('words')}
                className={`px-4 py-1.5 text-sm rounded-lg transition-colors ${
                  calculationType === 'words'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Words
              </button>
            </div>
          </div>
          {calculationType === 'words' && (
            <p className="text-sm text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
              1 word ≈ 0.8 tokens (Approximate conversion)
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Input {calculationType === 'tokens' ? 'Tokens' : 'Words'}
            </label>
            <div className="relative flex flex-col">
              <div className="relative">
                <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                <input
                  type="number"
                  min="0"
                  value={calculationType === 'tokens' ? inputTokens : inputWords}
                  onChange={(e) => handleInputChange(parseInt(e.target.value), 'input')}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                            focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 
                            dark:focus:ring-yellow-400 dark:focus:border-yellow-400
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                  placeholder={`Enter input ${calculationType}...`}
                />
              </div>
              <div className="h-6"> {/* Fixed height container for conversion text */}
                {calculationType === 'words' && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 pl-2 mt-1">
                    ≈ {inputTokens.toLocaleString()} tokens
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Output {calculationType === 'tokens' ? 'Tokens' : 'Words'}
            </label>
            <div className="relative flex flex-col">
              <div className="relative">
                <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                <input
                  type="number"
                  min="0"
                  value={calculationType === 'tokens' ? outputTokens : outputWords}
                  onChange={(e) => handleInputChange(parseInt(e.target.value), 'output')}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                            focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 
                            dark:focus:ring-yellow-400 dark:focus:border-yellow-400
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                  placeholder={`Enter output ${calculationType}...`}
                />
              </div>
              <div className="h-6"> {/* Fixed height container for conversion text */}
                {calculationType === 'words' && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 pl-2 mt-1">
                    ≈ {outputTokens.toLocaleString()} tokens
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Provider
            </label>
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                        focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500
                        dark:focus:ring-yellow-400 dark:focus:border-yellow-400
                        bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
            >
              <option value="all">All Providers</option>
              {llmProviders.map(provider => (
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
              <LLMPricingCard
                key={index}
                provider={result.provider}
                model={result.model}
                version={result.version}
                pricing={result.pricing}
                cost={result.cost}
                isLowestPrice={index === 0}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {calculationType === 'tokens' 
                        ? `${inputTokens.toLocaleString()} input, ${outputTokens.toLocaleString()} output tokens`
                        : `${inputWords.toLocaleString()} input, ${outputWords.toLocaleString()} output words`}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart({
                      type: 'llm',
                      provider: result.provider,
                      model: result.model,
                      version: result.version,
                      cost: result.cost,
                      inputTokens,
                      outputTokens
                    })}
                    className="px-3 py-1.5 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </LLMPricingCard>
            ))}
        </div>
        
        {sortedResults.length > 6 && (
          <button
            onClick={() => setShowAllPrices(!showAllPrices)}
            className="w-full py-2 text-sm font-medium text-yellow-600 dark:text-yellow-400 
                      bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 
                      dark:hover:bg-yellow-900/30 rounded-lg transition-colors mt-4"
          >
            {showAllPrices 
              ? "Show Less"
              : `Show ${sortedResults.length - 6} More Options`
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
            <CalcIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
              Model Pricing Details
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {llmProviders.map(provider => (
              <div key={provider.id} className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/50">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">{provider.name}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {provider.models?.map(model => (
                    <div key={model.id} className="bg-white dark:bg-gray-700 p-3 rounded-lg border border-gray-100 dark:border-gray-600">
                      <div className="font-medium text-gray-800 dark:text-gray-200 mb-1">{model.name}</div>
                      {model.description && (
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">{model.description}</div>
                      )}
                      <div className="space-y-2">
                        {model.versions.map((version, idx) => (
                          <div key={idx} className="text-sm">
                            <div className="font-medium text-gray-700 dark:text-gray-300">{version.name}</div>
                            <div className="text-yellow-600 dark:text-yellow-400">
                              ${version.pricing.inputPrice.toFixed(3)}/${version.pricing.outputPrice.toFixed(3)} per 1M tokens
                            </div>
                            {version.pricing.speed && (
                              <div className="text-gray-500 dark:text-gray-400">
                                Speed: {version.pricing.speed.toLocaleString()} tokens/s
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
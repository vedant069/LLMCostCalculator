import React from 'react';
import { LLMPricing } from '../types/pricing';

interface LLMPricingCardProps {
  provider: string;
  model: string;
  version: string;
  pricing: LLMPricing;
  isLowestPrice?: boolean;
  cost: number;
}

export function LLMPricingCard({ provider, model, version, pricing, isLowestPrice, cost }: LLMPricingCardProps) {
  return (
    <div 
      className={`
        rounded-lg p-5 transition-all hover:shadow-md
        ${isLowestPrice 
          ? 'border-2 border-yellow-400 bg-yellow-50/50 dark:border-yellow-500/50 dark:bg-yellow-900/10' 
          : 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}
      `}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
              {model}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Version: {version}
            </p>
            {pricing.speed && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Speed: {pricing.speed.toLocaleString()} tokens/s
              </p>
            )}
            {isLowestPrice && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 mt-2">
                Best Price
              </span>
            )}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">
              ${cost.toFixed(4)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Total Cost
            </div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">
              ${pricing.inputPrice.toFixed(3)}/${pricing.outputPrice.toFixed(3)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Input/Output per 1M tokens
            </div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">
              {provider}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
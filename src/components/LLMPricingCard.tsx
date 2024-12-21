import React from 'react';
import { LLMPricing } from '../types/pricing';

interface LLMPricingCardProps {
  provider: string;
  model: string;
  version: string;
  pricing: LLMPricing;
  cost: number;
  isLowestPrice?: boolean;
  children?: React.ReactNode;
}

export function LLMPricingCard({ 
  provider, 
  model, 
  version, 
  pricing, 
  cost, 
  isLowestPrice,
  children 
}: LLMPricingCardProps) {
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
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {model}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Version: {version}
            </p>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Input: ${pricing.inputPrice.toFixed(4)}/1M tokens
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Output: ${pricing.outputPrice.toFixed(4)}/1M tokens
              </p>
              {pricing.speed && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Speed: {pricing.speed.toLocaleString()} tokens/s
                </p>
              )}
            </div>
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
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">
              {provider}
            </div>
          </div>
        </div>
        {children && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
export interface PricingTier {
  minutes: number;
  pricePerMinute: number;
}

export interface LLMPricing {
  inputPrice: number;  // Price per million tokens
  outputPrice: number; // Price per million tokens
  speed?: number;      // Tokens per second
  version?: string;    // Model version
}

export interface LLMModel {
  id: string;
  name: string;
  description?: string;
  versions: {
    name: string;
    pricing: LLMPricing;
  }[];
}

export interface DeepgramModel {
  name: string;
  description: string;
  pricePerMinute: number;
}

export interface Provider {
  id: string;
  name: string;
  type: 'speech' | 'llm';
  description?: string;
  group?: string;
  models?: LLMModel[] | DeepgramModel[];
  tiers?: PricingTier[];
}

export interface CalculationResult {
  totalCost: number;
  breakdown: {
    provider: string;
    cost: number;
    tiersUsed: {
      minutes: number;
      rate: number;
      cost: number;
    }[];
  }[];
}
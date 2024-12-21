import { Provider } from '../types/pricing';

export interface LLMProvider {
  id: string;
  name: string;
  type: 'llm';
  pricingUrl?: string;
  models: Provider['models'];
}

export const llmProviders: LLMProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    type: 'llm',
    pricingUrl: 'https://openai.com/api/pricing/',
    models: [
      {
        id: 'o1',
        name: 'O1',
        versions: [
          {
            name: 'On-Demand',
            pricing: { inputPrice: 15.00, outputPrice: 60.00 }
          },
          {
            name: '2024-12-17',
            pricing: { inputPrice: 15.00, outputPrice: 60.00 }
          },
          {
            name: 'preview',
            pricing: { inputPrice: 15.00, outputPrice: 60.00 }
          },
          {
            name: 'preview-2024-09-12',
            pricing: { inputPrice: 15.00, outputPrice: 60.00 }
          }
        ]
      },
      {
        id: 'gpt-4o',
        name: 'GPT-4',
        versions: [
          {
            name: 'Default',
            pricing: { inputPrice: 2.50, outputPrice: 10.00 }
          },
          {
            name: '20-11-2024',
            pricing: { inputPrice: 2.50, outputPrice: 10.00 }
          },
          {
            name: '06-08-2024',
            pricing: { inputPrice: 2.50, outputPrice: 10.00 }
          },
          {
            name: 'Audio-Preview',
            pricing: { inputPrice: 2.50, outputPrice: 10.00 }
          },
          {
            name: 'Audio-Preview-2024-12-17',
            pricing: { inputPrice: 2.50, outputPrice: 10.00 }
          },
          {
            name: 'Audio-Preview-2024-10-01',
            pricing: { inputPrice: 2.50, outputPrice: 10.00 }
          }
        ]
      },
      {
        id: 'gpt-4o-2024-05-13',
        name: 'GPT-4 (2024-05-13)',
        versions: [
          {
            name: 'Default',
            pricing: { inputPrice: 5.00, outputPrice: 15.00 }
          }
        ]
      },
      {
        id: 'gpt-4o-mini',
        name: 'GPT-4 Mini',
        versions: [
          {
            name: 'Default',
            pricing: { inputPrice: 0.150, outputPrice: 0.600 }
          },
          {
            name: '18-07-2024',
            pricing: { inputPrice: 0.150, outputPrice: 0.600 }
          },
          {
            name: 'Audio-Preview',
            pricing: { inputPrice: 0.150, outputPrice: 0.600 }
          },
          {
            name: 'Audio-Preview-2024-12-17',
            pricing: { inputPrice: 0.150, outputPrice: 0.600 }
          }
        ]
      }
    ]
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    type: 'llm',
    pricingUrl: 'https://www.anthropic.com/pricing#anthropic-api',
    models: [
      {
        id: 'claude-3-5-sonnet',
        name: 'Claude 3.5 Sonnet',
        versions: [
          {
            name: 'Default',
            pricing: { inputPrice: 3.00, outputPrice: 15.00 }
          }
        ]
      },
      {
        id: 'claude-3-5-haiku',
        name: 'Claude 3.5 Haiku',
        versions: [
          {
            name: 'Default',
            pricing: { inputPrice: 0.80, outputPrice: 4.00 }
          }
        ]
      },
      {
        id: 'claude-3-opus',
        name: 'Claude 3 Opus',
        versions: [
          {
            name: 'Default',
            pricing: { inputPrice: 15.00, outputPrice: 75.00 }
          }
        ]
      }
    ]
  },
  {
    id: 'aws-ai21',
    name: 'AWS (AI21 Labs)',
    type: 'llm',
    models: [
      {
        id: 'jamba-1-5-large',
        name: 'Jamba 1.5 Large',
        versions: [
          {
            name: 'On-Demand',
            pricing: { inputPrice: 2.00, outputPrice: 8.00 }
          }
        ]
      },
      {
        id: 'jamba-1-5-mini',
        name: 'Jamba 1.5 Mini',
        versions: [
          {
            name: 'On-Demand',
            pricing: { inputPrice: 0.20, outputPrice: 0.40 }
          }
        ]
      },
      {
        id: 'jurassic-2-mid',
        name: 'Jurassic-2 Mid',
        versions: [
          {
            name: 'On-Demand',
            pricing: { inputPrice: 12.50, outputPrice: 12.50 }
          }
        ]
      },
      {
        id: 'jurassic-2-ultra',
        name: 'Jurassic-2 Ultra',
        versions: [
          {
            name: 'On-Demand',
            pricing: { inputPrice: 18.80, outputPrice: 18.80 }
          }
        ]
      }
    ]
  },
  {
    id: 'aws-anthropic',
    name: 'AWS (Anthropic)',
    type: 'llm',
    models: [
      {
        id: 'claude-3-5-sonnet-aws',
        name: 'Claude 3.5 Sonnet',
        versions: [
          {
            name: 'Default',
            pricing: { inputPrice: 3.00, outputPrice: 15.00 }
          }
        ]
      },
      {
        id: 'claude-3-5-haiku-aws',
        name: 'Claude 3.5 Haiku',
        versions: [
          {
            name: 'Default',
            pricing: { inputPrice: 0.80, outputPrice: 4.00 }
          }
        ]
      },
      {
        id: 'claude-3-opus-aws',
        name: 'Claude 3 Opus',
        versions: [
          {
            name: 'Default',
            pricing: { inputPrice: 15.00, outputPrice: 75.00 }
          }
        ]
      },
      {
        id: 'claude-3-haiku-aws',
        name: 'Claude 3 Haiku',
        versions: [
          {
            name: 'Default',
            pricing: { inputPrice: 0.25, outputPrice: 1.25 }
          }
        ]
      },
      {
        id: 'claude-3-sonnet-aws',
        name: 'Claude 3 Sonnet',
        versions: [
          {
            name: 'Default',
            pricing: { inputPrice: 3.00, outputPrice: 15.00 }
          }
        ]
      }
    ]
  },
  {
    id: 'aws-meta',
    name: 'AWS (Meta)',
    type: 'llm',
    models: [
      {
        id: 'llama-3-3-instruct-70b',
        name: 'Llama 3.3 Instruct (70B)',
        versions: [
          {
            name: 'On-Demand',
            pricing: { inputPrice: 0.72, outputPrice: 0.72 }
          }
        ]
      },
      {
        id: 'llama-3-2-instruct-1b',
        name: 'Llama 3.2 Instruct (1B)',
        versions: [
          {
            name: 'On-Demand',
            pricing: { inputPrice: 0.10, outputPrice: 0.10 }
          }
        ]
      },
      {
        id: 'llama-3-2-instruct-3b',
        name: 'Llama 3.2 Instruct (3B)',
        versions: [
          {
            name: 'On-Demand',
            pricing: { inputPrice: 0.15, outputPrice: 0.15 }
          }
        ]
      },
      {
        id: 'llama-3-2-instruct-11b',
        name: 'Llama 3.2 Instruct (11B)',
        versions: [
          {
            name: 'On-Demand',
            pricing: { inputPrice: 0.16, outputPrice: 0.16 }
          }
        ]
      },
      {
        id: 'llama-3-1-instruct-8b',
        name: 'Llama 3.1 Instruct (8B)',
        versions: [
          {
            name: 'On-Demand',
            pricing: { inputPrice: 0.22, outputPrice: 0.22 }
          }
        ]
      },
      {
        id: 'llama-3-1-instruct-70b',
        name: 'Llama 3.1 Instruct (70B)',
        versions: [
          {
            name: 'On-Demand',
            pricing: { inputPrice: 0.72, outputPrice: 0.72 }
          }
        ]
      },
      {
        id: 'llama-3-instruct-8b',
        name: 'Llama 3 Instruct (8B)',
        versions: [
          {
            name: 'On-Demand',
            pricing: { inputPrice: 0.30, outputPrice: 0.60 }
          }
        ]
      },
      {
        id: 'llama-3-instruct-70b',
        name: 'Llama 3 Instruct (70B)',
        versions: [
          {
            name: 'On-Demand',
            pricing: { inputPrice: 2.65, outputPrice: 3.50 }
          }
        ]
      },
      {
        id: 'llama-2-chat-13b',
        name: 'Llama 2 Chat (13B)',
        versions: [
          {
            name: 'On-Demand',
            pricing: { inputPrice: 0.75, outputPrice: 1.00 }
          }
        ]
      },
      {
        id: 'llama-2-chat-70b',
        name: 'Llama 2 Chat (70B)',
        versions: [
          {
            name: 'On-Demand',
            pricing: { inputPrice: 1.95, outputPrice: 2.56 }
          }
        ]
      }
    ]
  },
  {
    id: 'groq',
    name: 'Groq',
    type: 'llm',
    pricingUrl: 'https://groq.com/pricing/',
    models: [
      {
        id: 'llama-3-2-1b',
        name: 'Llama 3.2 1B (Preview) 8k',
        versions: [
          {
            name: 'Default',
            pricing: { inputPrice: 0.04, outputPrice: 0.04, speed: 3100 }
          }
        ]
      },
      {
        id: 'llama-3-2-3b',
        name: 'Llama 3.2 3B (Preview) 8k',
        versions: [
          {
            name: 'Default',
            pricing: { inputPrice: 0.06, outputPrice: 0.06, speed: 1600 }
          }
        ]
      },
      {
        id: 'llama-3-3-70b',
        name: 'Llama 3.3 70B Versatile 128k',
        versions: [
          {
            name: 'Default',
            pricing: { inputPrice: 0.59, outputPrice: 0.79, speed: 275 }
          }
        ]
      },
      {
        id: 'llama-3-1-8b',
        name: 'Llama 3.1 8B Instant 128k',
        versions: [
          {
            name: 'Default',
            pricing: { inputPrice: 0.05, outputPrice: 0.08, speed: 750 }
          }
        ]
      },
      {
        id: 'mixtral-8x7b',
        name: 'Mixtral 8x7B Instruct 32k',
        versions: [
          {
            name: 'Default',
            pricing: { inputPrice: 0.24, outputPrice: 0.24, speed: 575 }
          }
        ]
      },
      {
        id: 'gemma-7b',
        name: 'Gemma 7B 8k Instruct',
        versions: [
          {
            name: 'Default',
            pricing: { inputPrice: 0.07, outputPrice: 0.07, speed: 950 }
          }
        ]
      },
      {
        id: 'gemma-2-9b',
        name: 'Gemma 2 9B 8k',
        versions: [
          {
            name: 'Default',
            pricing: { inputPrice: 0.20, outputPrice: 0.20, speed: 500 }
          }
        ]
      }
    ]
  },
  {
    id: 'aws',
    name: 'AWS Bedrock',
    type: 'llm',
    pricingUrl: 'https://aws.amazon.com/bedrock/pricing/',
    models: []
  }
];
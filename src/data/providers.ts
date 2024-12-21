import { Provider } from "../types/pricing";

export const speechProviders: Provider[] = [
  {
    id: 'aws',
    name: 'AWS',
    type: 'speech',
    description: 'Amazon Web Services Transcription',
    pricingUrl: 'https://aws.amazon.com/transcribe/pricing/',
    tiers: [
      { minutes: 0, pricePerMinute: 0.024 },
      { minutes: 250000, pricePerMinute: 0.015 },
      { minutes: 1000000, pricePerMinute: 0.012 }
    ]
  },
  {
    id: 'gcp',
    name: 'Google Cloud',
    type: 'speech',
    description: 'Google Speech-to-Text Standard Recognition',
    pricingUrl: 'https://cloud.google.com/speech-to-text/pricing?hl=en',
    tiers: [
      { minutes: 0, pricePerMinute: 0.016 },
      { minutes: 500000, pricePerMinute: 0.01 },
      { minutes: 1000000, pricePerMinute: 0.008 }
    ]
  },
  {
    id: 'gcp-logged',
    name: 'Google Cloud (Logged)',
    type: 'speech',
    description: 'Google Speech-to-Text with Logging',
    pricingUrl: 'https://cloud.google.com/speech-to-text/pricing?hl=en',
    tiers: [
      { minutes: 0, pricePerMinute: 0.012 },
      { minutes: 500000, pricePerMinute: 0.01 }
    ]
  },
  {
    id: 'openai',
    name: 'OpenAI',
    type: 'speech',
    description: 'Whisper API',
    pricingUrl: 'https://openai.com/api/pricing/',
    tiers: [
      { minutes: 0, pricePerMinute: 0.006 }
    ]
  },
  {
    id: 'deepgram-nova',
    type: 'speech',
    description: 'Nova-20/Nova-10 (Growth)',
    group: 'Deepgram',
    pricingUrl: 'https://deepgram.com/pricing',
    tiers: [
      { minutes: 0, pricePerMinute: 0.0036 }
    ]
  },
  {
    id: 'deepgram-whisper',
    type: 'speech',
    description: 'Whisper Large',
    group: 'Deepgram',
    pricingUrl: 'https://deepgram.com/pricing',
    tiers: [
      { minutes: 0, pricePerMinute: 0.0048 }
    ]
  },
  {
    id: 'deepgram-enhanced',
    type: 'speech',
    description: 'Enhanced (Pay as you go)',
    group: 'Deepgram',
    pricingUrl: 'https://deepgram.com/pricing',
    tiers: [
      { minutes: 0, pricePerMinute: 0.0145 }
    ]
  },
  {
    id: 'deepgram-base',
    type: 'speech',
    description: 'Base (Pay as you go)',
    group: 'Deepgram',
    pricingUrl: 'https://deepgram.com/pricing',
    tiers: [
      { minutes: 0, pricePerMinute: 0.0125 }
    ]
  },
  {
    id: 'deepgram-redaction',
    type: 'speech',
    description: 'Custom Redaction (Growth)',
    group: 'Deepgram',
    pricingUrl: 'https://deepgram.com/pricing',
    tiers: [
      { minutes: 0, pricePerMinute: 0.0017 }
    ]
  },
  {
    id: 'deepgram-entity',
    type: 'speech',
    description: 'Custom Entity Detection',
    group: 'Deepgram',
    pricingUrl: 'https://deepgram.com/pricing',
    tiers: [
      { minutes: 0, pricePerMinute: 0.0011 }
    ]
  },
  {
    id: 'groq-189x',
    type: 'speech',
    description: '189x Speed Factor',
    group: 'Groq',
    pricingUrl: 'https://groq.com/pricing/',
    tiers: [
      { minutes: 0, pricePerMinute: 0.001850 }
    ]
  },
  {
    id: 'groq-216x',
    type: 'speech',
    description: '216x Speed Factor',
    group: 'Groq',
    pricingUrl: 'https://groq.com/pricing/',
    tiers: [
      { minutes: 0, pricePerMinute: 0.000667 }
    ]
  },
  {
    id: 'groq-250x',
    type: 'speech',
    description: '250x Speed Factor',
    group: 'Groq',
    pricingUrl: 'https://groq.com/pricing/',
    tiers: [
      { minutes: 0, pricePerMinute: 0.000333 }
    ]
  }
];

export const providers = speechProviders;
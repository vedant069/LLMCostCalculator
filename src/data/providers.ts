import { Provider } from '../types/pricing';

export const speechProviders: Provider[] = [
  {
    id: 'aws',
    name: 'AWS',
    type: 'speech',
    description: 'Amazon Web Services Transcription',
    tiers: [
      { minutes: 0, pricePerMinute: 0.024 },
      { minutes: 250000, pricePerMinute: 0.015 },
      { minutes: 1000000, pricePerMinute: 0.0102 },
      { minutes: 5000000, pricePerMinute: 0.0078 }
    ]
  },
  {
    id: 'google',
    name: 'Google Cloud',
    type: 'speech',
    description: 'Google Speech-to-Text Standard Recognition',
    tiers: [
      { minutes: 0, pricePerMinute: 0.016 },
      { minutes: 500000, pricePerMinute: 0.01 },
      { minutes: 1000000, pricePerMinute: 0.008 },
      { minutes: 2000000, pricePerMinute: 0.004 }
    ]
  },
  {
    id: 'google-logged',
    name: 'Google Cloud (Logged)',
    type: 'speech',
    description: 'Google Speech-to-Text with Logging',
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
    tiers: [
      { minutes: 0, pricePerMinute: 0.006 }
    ]
  },
  {
    id: 'deepgram-nova',
    name: 'Deepgram Nova',
    type: 'speech',
    description: 'Nova-20/Nova-10 (Growth)',
    group: 'Deepgram',
    tiers: [
      { minutes: 0, pricePerMinute: 0.0036 }
    ]
  },
  {
    id: 'deepgram-whisper',
    name: 'Deepgram Whisper',
    type: 'speech',
    description: 'Whisper Large',
    group: 'Deepgram',
    tiers: [
      { minutes: 0, pricePerMinute: 0.0048 }
    ]
  },
  {
    id: 'deepgram-enhanced',
    name: 'Deepgram Enhanced',
    type: 'speech',
    description: 'Enhanced (Pay as you go)',
    group: 'Deepgram',
    tiers: [
      { minutes: 0, pricePerMinute: 0.0145 }
    ]
  },
  {
    id: 'deepgram-base',
    name: 'Deepgram Base',
    type: 'speech',
    description: 'Base (Pay as you go)',
    group: 'Deepgram',
    tiers: [
      { minutes: 0, pricePerMinute: 0.0125 }
    ]
  },
  {
    id: 'deepgram-redaction',
    name: 'Deepgram Redaction',
    type: 'speech',
    description: 'Custom Redaction (Growth)',
    group: 'Deepgram',
    tiers: [
      { minutes: 0, pricePerMinute: 0.0017 }
    ]
  },
  {
    id: 'deepgram-entity',
    name: 'Deepgram Entity Detection',
    type: 'speech',
    description: 'Custom Entity Detection',
    group: 'Deepgram',
    tiers: [
      { minutes: 0, pricePerMinute: 0.0011 }
    ]
  },
  {
    id: 'groq-whisper-v3',
    name: 'Groq Whisper V3 Large',
    type: 'speech',
    description: '189x Speed Factor',
    group: 'Groq',
    tiers: [
      { minutes: 0, pricePerMinute: 0.001850 }
    ]
  },
  {
    id: 'groq-whisper-v3-turbo',
    name: 'Groq Whisper V3 Turbo',
    type: 'speech',
    description: '216x Speed Factor',
    group: 'Groq',
    tiers: [
      { minutes: 0, pricePerMinute: 0.000667 }
    ]
  },
  {
    id: 'groq-distil',
    name: 'Groq Distil-Whisper',
    type: 'speech',
    description: '250x Speed Factor',
    group: 'Groq',
    tiers: [
      { minutes: 0, pricePerMinute: 0.000333 }
    ]
  }
];
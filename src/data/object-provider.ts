export interface StorageTier {
  name: string;
  storagePrice: number;
  minStorage?: number;
  maxStorage?: number;
}

export interface TransferTier {
  price: number;
  minTransfer?: number;
  maxTransfer?: number;
}

export interface ObjectStorageProvider {
  id: string;
  name: string;
  storageTiers: StorageTier[];
  transferTiers: TransferTier[];
}

export const objectStorageProviders: ObjectStorageProvider[] = [
  {
    id: 'aws-s3',
    name: 'Amazon S3',
    storageTiers: [
      { name: 'Standard (0-50TB)', storagePrice: 0.023, minStorage: 0, maxStorage: 50000 },
      { name: 'Standard (50-500TB)', storagePrice: 0.022, minStorage: 50000, maxStorage: 500000 },
      { name: 'Standard (500TB+)', storagePrice: 0.021, minStorage: 500000 }
    ],
    transferTiers: [
      { price: 0.09 }
    ]
  },
  {
    id: 'digitalocean-spaces',
    name: 'DigitalOcean Spaces',
    storageTiers: [
      { name: 'Standard (0-250GB)', storagePrice: 0.02, minStorage: 0, maxStorage: 250 },
      { name: 'Standard (250GB+)', storagePrice: 0.02, minStorage: 250 }
    ],
    transferTiers: [
      { price: 0.01 }
    ]
  },
  {
    id: 'google-cloud-storage',
    name: 'Google Cloud Storage',
    storageTiers: [
      { name: 'Standard', storagePrice: 0.020 },
      { name: 'Nearline', storagePrice: 0.010 },
      { name: 'Coldline', storagePrice: 0.004 },
      { name: 'Archive', storagePrice: 0.0012 }
    ],
    transferTiers: [
      { price: 0.12 }
    ]
  },
  {
    id: 'azure-blob',
    name: 'Azure Blob Storage',
    storageTiers: [
      { name: 'Premium', storagePrice: 0.15 },
      { name: 'Hot', storagePrice: 0.018 },
      { name: 'Cool', storagePrice: 0.01 },
      { name: 'Cold', storagePrice: 0.0036 },
      { name: 'Archive', storagePrice: 0.002 }
    ],
    transferTiers: [
      { price: 0.087 }
    ]
  }
];

import React, { useState, useEffect } from 'react';
import { llmProviders } from '../data/llm-providers';
import { objectStorageProviders } from '../data/object-provider';
import { speechProviders } from '../data/providers';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { ChevronDown, ChevronUp, Edit2 } from 'lucide-react';
import { Input } from './ui/input';

interface CalculatorState {
  llmModel: string;
  storageProvider: string;
  speechProvider: string;
  numberOfAssessments: number;
}

interface FixedParameters {
  inputWords: number;
  outputWords: number;
  storageGB: number;
  transferGB: number;
  minutes: number;
}

export function AssessmentCalculator() {
  const [state, setState] = useState<CalculatorState>({
    llmModel: 'gpt-4o',
    storageProvider: 'aws-s3',
    speechProvider: 'aws',
    numberOfAssessments: 1
  });

  const [fixedParams, setFixedParams] = useState<FixedParameters>({
    inputWords: 500,
    outputWords: 500,
    storageGB: 0.02,
    transferGB: 0.02,
    minutes: 2
  });

  const [costs, setCosts] = useState({
    llmCost: 0,
    storageCost: 0,
    speechCost: 0
  });

  const [totalCost, setTotalCost] = useState<number>(0);
  const [showPricing, setShowPricing] = useState(false);
  const [editingParams, setEditingParams] = useState(false);

  // Calculate tokens from words
  const INPUT_TOKENS = fixedParams.inputWords * 1.4;
  const OUTPUT_TOKENS = fixedParams.outputWords * 1.4;

  const calculateCost = () => {
    // Get selected LLM model pricing
    const selectedLLMProvider = llmProviders.find(provider => 
      provider.models.some(model => model.id === state.llmModel)
    );
    const selectedModel = selectedLLMProvider?.models.find(model => model.id === state.llmModel);
    const llmPricing = selectedModel?.versions[0].pricing;

    // Get selected storage provider pricing
    const selectedStorageProvider = objectStorageProviders.find(
      provider => provider.id === state.storageProvider
    );
    
    // Calculate storage cost
    const storageTier = selectedStorageProvider?.storageTiers[0];
    const storageCostPerGB = storageTier?.storagePrice || 0;
    const storageCost = fixedParams.storageGB * storageCostPerGB;
    
    // Calculate data transfer cost
    const transferTier = selectedStorageProvider?.transferTiers[0];
    const transferCostPerGB = transferTier?.price || 0;
    const transferCost = fixedParams.transferGB * transferCostPerGB;
    
    // Total storage cost is sum of storage and transfer costs
    const storageCostPerAssessment = storageCost + transferCost;

    // Get selected speech provider pricing
    const selectedSpeechProvider = speechProviders.find(
      provider => provider.id === state.speechProvider
    );
    const speechPricing = selectedSpeechProvider?.tiers[0].pricePerMinute || 0;

    // Calculate individual costs
    // LLM cost calculation (per million tokens)
    const inputCost = (INPUT_TOKENS / 1_000_000) * (llmPricing?.inputPrice || 0);
    const outputCost = (OUTPUT_TOKENS / 1_000_000) * (llmPricing?.outputPrice || 0);
    const llmCostPerAssessment = inputCost + outputCost;

    const speechCostPerAssessment = fixedParams.minutes * speechPricing;

    // Total cost for all assessments
    const total = (llmCostPerAssessment + storageCostPerAssessment + speechCostPerAssessment) * state.numberOfAssessments;
    
    // Update state with all costs for display
    setTotalCost(total);
    setCosts({
      llmCost: llmCostPerAssessment,
      storageCost: storageCostPerAssessment,
      speechCost: speechCostPerAssessment
    });
  };

  useEffect(() => {
    calculateCost();
  }, [state, fixedParams]);

  const handleParamChange = (param: keyof FixedParameters, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFixedParams(prev => ({
      ...prev,
      [param]: numValue
    }));
  };

  const renderPricingDetails = () => {
    const selectedStorageProvider = objectStorageProviders.find(
      provider => provider.id === state.storageProvider
    );
    const storageTier = selectedStorageProvider?.storageTiers[0];
    const transferTier = selectedStorageProvider?.transferTiers[0];

    return (
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Fixed Parameters</h3>
          <button
            onClick={() => setEditingParams(!editingParams)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
          >
            <Edit2 className="h-4 w-4" />
          </button>
        </div>
        
        {editingParams ? (
          <div className="space-y-4 mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Input Words</Label>
                <Input
                  type="number"
                  value={fixedParams.inputWords}
                  onChange={(e) => handleParamChange('inputWords', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Output Words</Label>
                <Input
                  type="number"
                  value={fixedParams.outputWords}
                  onChange={(e) => handleParamChange('outputWords', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Storage (GB)</Label>
                <Input
                  type="number"
                  value={fixedParams.storageGB}
                  onChange={(e) => handleParamChange('storageGB', e.target.value)}
                  className="mt-1"
                  step="0.01"
                />
              </div>
              <div>
                <Label>Data Transfer (GB)</Label>
                <Input
                  type="number"
                  value={fixedParams.transferGB}
                  onChange={(e) => handleParamChange('transferGB', e.target.value)}
                  className="mt-1"
                  step="0.01"
                />
              </div>
              <div>
                <Label>Minutes</Label>
                <Input
                  type="number"
                  value={fixedParams.minutes}
                  onChange={(e) => handleParamChange('minutes', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        ) : (
          <ul className="list-disc list-inside mb-4 text-sm text-gray-600 dark:text-gray-300">
            <li>Input Words per Assessment: {fixedParams.inputWords}</li>
            <li>Output Words per Assessment: {fixedParams.outputWords}</li>
            <li>Minutes per Assessment: {fixedParams.minutes}</li>
            <li>Storage per Assessment: {fixedParams.storageGB} GB (${storageTier?.storagePrice.toFixed(4)}/GB)</li>
            <li>Data Transfer per Assessment: {fixedParams.transferGB} GB (${transferTier?.price.toFixed(4)}/GB)</li>
          </ul>
        )}

        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Cost Breakdown (per assessment)</h3>
        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
          <li>LLM Processing: ${costs.llmCost.toFixed(4)}</li>
          <li>Speech-to-Text ({fixedParams.minutes} minutes): ${costs.speechCost.toFixed(4)}</li>
          <li>Storage + Transfer: ${costs.storageCost.toFixed(4)}</li>
        </ul>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Assessment Calculator</CardTitle>
        <CardDescription>
          Calculate costs for assessments with fixed parameters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>LLM Model</Label>
          <select
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={state.llmModel}
            onChange={(e) => setState({ ...state, llmModel: e.target.value })}
          >
            {llmProviders.map(provider =>
              provider.models.map(model => (
                <option key={model.id} value={model.id}>
                  {provider.name} - {model.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="space-y-2">
          <Label>Speech-to-Text Provider</Label>
          <select
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={state.speechProvider}
            onChange={(e) => setState({ ...state, speechProvider: e.target.value })}
          >
            {speechProviders.map(provider => (
              <option key={provider.id} value={provider.id}>
                {provider.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label>Storage Provider</Label>
          <select
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={state.storageProvider}
            onChange={(e) => setState({ ...state, storageProvider: e.target.value })}
          >
            {objectStorageProviders.map(provider => (
              <option key={provider.id} value={provider.id}>
                {provider.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label>Number of Questions</Label>
          <input
            type="number"
            min="1"
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={state.numberOfAssessments}
            onChange={(e) => setState({ ...state, numberOfAssessments: parseInt(e.target.value) || 1 })}
          />
        </div>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Total Estimated Cost: ${totalCost.toFixed(4)}
            </span>
            <button
              onClick={() => setShowPricing(!showPricing)}
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              {showPricing ? 'Hide Details' : 'Show Details'}
              {showPricing ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
          {showPricing && renderPricingDetails()}
        </div>
      </CardContent>
    </Card>
  );
};

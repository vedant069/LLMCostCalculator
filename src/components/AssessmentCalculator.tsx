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
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Brain, Mic, HardDrive, ChevronDown, ChevronUp, Edit2, ShoppingCart, Settings2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CalculatorState {
  llmModel: string;
  storageProvider: string;
  speechProvider: string;
  numberOfQuestions: number;
  calculationType: 'questions' | 'assessments';
  currency: 'USD' | 'INR';
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
    numberOfQuestions: 10,
    calculationType: 'questions',
    currency: 'USD'
  });

  const [fixedParams, setFixedParams] = useState<FixedParameters>({
    inputWords: 300,
    outputWords: 300,
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
    const inputCost = (INPUT_TOKENS / 1_000_000) * (llmPricing?.inputPrice || 0);
    const outputCost = (OUTPUT_TOKENS / 1_000_000) * (llmPricing?.outputPrice || 0);
    const llmCostPerAssessment = inputCost + outputCost;

    const speechCostPerAssessment = fixedParams.minutes * speechPricing;

    // Calculate total cost based on calculation type
    const total = state.calculationType === 'questions' 
      ? (llmCostPerAssessment + storageCostPerAssessment + speechCostPerAssessment) * state.numberOfQuestions
      : (llmCostPerAssessment + storageCostPerAssessment + speechCostPerAssessment) * (state.numberOfQuestions * 10); // 10 questions per assessment

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
      <div className="mt-4 space-y-6">
        <div className="bg-white-50/50 dark:bg-white-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-yellow-500" />
              Fixed Parameters
            </h3>
            <button
              onClick={() => setEditingParams(!editingParams)}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <Edit2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          
          {editingParams ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-gray-600 dark:text-gray-400">Input Words</Label>
                  <Input
                    type="number"
                    value={fixedParams.inputWords}
                    onChange={(e) => handleParamChange('inputWords', e.target.value)}
                    className="border-gray-200 dark:border-gray-700 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-gray-600 dark:text-gray-400">Output Words</Label>
                  <Input
                    type="number"
                    value={fixedParams.outputWords}
                    onChange={(e) => handleParamChange('outputWords', e.target.value)}
                    className="border-gray-200 dark:border-gray-700 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-gray-600 dark:text-gray-400">Storage (GB)</Label>
                  <Input
                    type="number"
                    value={fixedParams.storageGB}
                    onChange={(e) => handleParamChange('storageGB', e.target.value)}
                    step="0.01"
                    className="border-gray-200 dark:border-gray-700 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-gray-600 dark:text-gray-400">Data Transfer (GB)</Label>
                  <Input
                    type="number"
                    value={fixedParams.transferGB}
                    onChange={(e) => handleParamChange('transferGB', e.target.value)}
                    step="0.01"
                    className="border-gray-200 dark:border-gray-700 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-gray-600 dark:text-gray-400">Minutes</Label>
                  <Input
                    type="number"
                    value={fixedParams.minutes}
                    onChange={(e) => handleParamChange('minutes', e.target.value)}
                    className="border-gray-200 dark:border-gray-700 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="space-y-1">
                <span className="text-gray-500 dark:text-gray-400">Input Words:</span>
                <p className="font-medium text-gray-900 dark:text-gray-100">{fixedParams.inputWords}</p>
              </div>
              <div className="space-y-1">
                <span className="text-gray-500 dark:text-gray-400">Output Words:</span>
                <p className="font-medium text-gray-900 dark:text-gray-100">{fixedParams.outputWords}</p>
              </div>
              <div className="space-y-1">
                <span className="text-gray-500 dark:text-gray-400">Storage:</span>
                <p className="font-medium text-gray-900 dark:text-gray-100">{fixedParams.storageGB} GB</p>
              </div>
              <div className="space-y-1">
                <span className="text-gray-500 dark:text-gray-400">Data Transfer:</span>
                <p className="font-medium text-gray-900 dark:text-gray-100">{fixedParams.transferGB} GB</p>
              </div>
              <div className="space-y-1">
                <span className="text-gray-500 dark:text-gray-400">Minutes:</span>
                <p className="font-medium text-gray-900 dark:text-gray-100">{fixedParams.minutes}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50/50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Cost Breakdown (per assessment)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Brain className="w-4 h-4" />
                LLM Processing
              </div>
              <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                ${costs.llmCost.toFixed(4)}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Mic className="w-4 h-4" />
                Speech-to-Text
              </div>
              <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                ${costs.speechCost.toFixed(4)}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <HardDrive className="w-4 h-4" />
                Storage + Transfer
              </div>
              <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                ${costs.storageCost.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full border-0 shadow-none bg-transparent">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-500 dark:text-gray-100">Assessment Calculator</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Calculate costs for assessments with customizable parameters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm text-gray-600 dark:text-gray-400">LLM Model</Label>
            <div className="relative">
              <Brain className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-200 w-4 h-4" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={state.llmModel}
                onChange={(e) => setState({ ...state, llmModel: e.target.value })}
              >
                {llmProviders.map(provider =>
                  provider.models.map(model => (
                    <option key={model.id} value={model.id}>
                      {provider.name} - {model.name}
                    </option>
                  )))
                }
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-600 dark:text-gray-400">Speech-to-Text Provider</Label>
            <div className="relative">
              <Mic className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-200 w-4 h-4" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-600 dark:text-gray-400">Storage Provider</Label>
            <div className="relative">
              <HardDrive className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-200 w-4 h-4" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
          </div>

          <div className="space-y-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <Label>Calculate by:</Label>
                <div className="flex space-x-4">
                  <button
                    className={`px-3 py-1 rounded ${state.calculationType === 'questions' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
                    onClick={() => setState(prev => ({ ...prev, calculationType: 'questions' }))}
                  >
                    Questions
                  </button>
                  <button
                    className={`px-3 py-1 rounded ${state.calculationType === 'assessments' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
                    onClick={() => setState(prev => ({ ...prev, calculationType: 'assessments' }))}
                  >
                    Assessments
                  </button>
                </div>
              </div>
              <div className="flex flex-col space-y-6 w-full p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <Label htmlFor="numberOfQuestions" className="text-sm font-medium">
                    Number of {state.calculationType === 'questions' ? 'Questions' : 'Assessments'}
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      min="0"
                      max="100000"
                      value={state.numberOfQuestions}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value >= 0 && value <= 100000) {
                          setState(prev => ({ ...prev, numberOfQuestions: value }));
                        }
                      }}
                      className="w-28 text-right"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <Slider
                    id="numberOfQuestions"
                    min={0}
                    max={100000}
                    step={100}
                    value={[state.numberOfQuestions]}
                    onValueChange={(value) => setState(prev => ({ ...prev, numberOfQuestions: value[0] }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-2">
                    <span>0</span>
                    <span>25,000</span>
                    <span>50,000</span>
                    <span>75,000</span>
                    <span>100,000</span>
                  </div>
                </div>
                {state.calculationType === 'assessments' && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Total questions: {(state.numberOfQuestions * 10).toLocaleString()} (10 questions per assessment)
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Estimated Cost</p>
                <button
                  onClick={() => setState(prev => ({ 
                    ...prev, 
                    currency: prev.currency === 'USD' ? 'INR' : 'USD' 
                  }))}
                  className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {state.currency}
                </button>
              </div>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {state.currency === 'USD' ? '$' : '₹'}{(state.currency === 'USD' ? totalCost : totalCost * 83.33).toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                For {state.numberOfQuestions} {state.calculationType === 'questions' ? 'questions' : 'assessments'}
                {state.calculationType === 'assessments' && ` (${(state.numberOfQuestions * 10).toLocaleString()} total questions)`}
              </p>
            </div>
          </div>
        </div>

        {renderPricingDetails()}

      </CardContent>
    </Card>
  );
}
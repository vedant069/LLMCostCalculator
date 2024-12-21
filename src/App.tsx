import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Calculator } from './components/Calculator';
import { LLMCalculator } from './components/LLMCalculator';

function App() {
  const [activeItem, setActiveItem] = useState('speech-to-text');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const getTitle = () => {
    switch (activeItem) {
      case 'speech-to-text':
        return {
          title: 'Speech to Text Pricing',
          description: 'Calculate and compare pricing across different speech-to-text providers'
        };
      case 'llms':
        return {
          title: 'LLM Pricing',
          description: 'Calculate and compare pricing across different LLM providers'
        };
      case 'text-to-speech':
        return {
          title: 'Text to Speech Pricing',
          description: 'Calculate and compare pricing across different text-to-speech providers'
        };
      case 'image':
        return {
          title: 'Image Generation Pricing',
          description: 'Calculate and compare pricing across different image generation providers'
        };
      case 'video':
        return {
          title: 'Video Generation Pricing',
          description: 'Calculate and compare pricing across different video generation providers'
        };
      default:
        return {
          title: 'AI Services Pricing',
          description: 'Calculate and compare pricing across different AI service providers'
        };
    }
  };

  const renderCalculator = () => {
    switch (activeItem) {
      case 'speech-to-text':
        return <Calculator />;
      case 'llms':
        return <LLMCalculator />;
      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Coming Soon</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              This calculator is currently under development.
            </p>
          </div>
        );
    }
  };

  const { title, description } = getTitle();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        activeItem={activeItem} 
        onItemClick={setActiveItem} 
      />
      <main className={`flex-1 p-8 transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>
          {renderCalculator()}
        </div>
      </main>
    </div>
  );
}

export default App;
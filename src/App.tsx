import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Calculator } from './components/Calculator';
import { LLMCalculator } from './components/LLMCalculator';
import { ObjectCalculator } from './components/ObjectCalculator';
import { Cart } from './components/Cart';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

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
      case 'object-storage':
        return {
          title: 'Object Storage Pricing',
          description: 'Calculate and compare pricing across different object storage providers'
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

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
          <Sidebar 
            activeItem={activeItem} 
            onItemClick={setActiveItem}
            isCollapsed={isSidebarCollapsed}
            setIsCollapsed={setIsSidebarCollapsed}
          />
          <main className={`flex-1 transition-all duration-200 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
            <div className="container mx-auto px-4 py-8">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {getTitle().title}
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {getTitle().description}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                  {activeItem === 'speech-to-text' ? (
                    <Calculator />
                  ) : activeItem === 'llms' ? (
                    <LLMCalculator />
                  ) : activeItem === 'object-storage' ? (
                    <ObjectCalculator />
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Coming Soon</h3>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        This calculator is currently under development.
                      </p>
                    </div>
                  )}
                </div>
                <div className="lg:col-span-1">
                  <div className="sticky top-8">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
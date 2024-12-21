import React from 'react';
import { 
  MessageSquare, 
  Mic, 
  Volume2, 
  Image as ImageIcon, 
  Video,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({ activeItem, onItemClick, isCollapsed, setIsCollapsed }: SidebarProps) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  const items = [
    {
      id: 'speech-to-text',
      name: 'Speech to Text',
      icon: Mic,
    },
    {
      id: 'llms',
      name: 'LLMs',
      icon: MessageSquare,
    },
    {
      id: 'text-to-speech',
      name: 'Text to Speech',
      icon: Volume2,
    },
    {
      id: 'image',
      name: 'Image Generation',
      icon: ImageIcon,
    },
    {
      id: 'video',
      name: 'Video Generation',
      icon: Video,
    },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
                transition-all duration-200 ${isCollapsed ? 'w-20' : 'w-64'}`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              AI Calculator
            </h1>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onItemClick(item.id)}
                    className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} p-2 rounded-lg
                              ${activeItem === item.id
                                ? 'bg-yellow-500 text-white'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                  >
                    <Icon className="w-5 h-5" />
                    {!isCollapsed && (
                      <span className="ml-3">{item.name}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
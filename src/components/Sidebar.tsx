import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MessageSquare, 
  VolumeX, 
  Brain, 
  Image, 
  Video,
  Settings,
  HelpCircle,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  id: string;
  active?: boolean;
}

interface SidebarProps {
  activeItem: string;
  onItemClick: (id: string) => void;
}

const navItems: NavItem[] = [
  { icon: Mic, label: 'Speech to Text', id: 'speech-to-text' },
  { icon: VolumeX, label: 'Text to Speech', id: 'text-to-speech' },
  { icon: MessageSquare, label: 'LLMs', id: 'llms' },
  { icon: Image, label: 'Image Generation', id: 'image' },
  { icon: Video, label: 'Video Generation', id: 'video' },
];

const bottomNavItems: NavItem[] = [
  { icon: Settings, label: 'Settings', id: 'settings' },
  { icon: HelpCircle, label: 'Help & Support', id: 'help' },
];

export function Sidebar({ activeItem, onItemClick }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const NavLink = ({ icon: Icon, label, id }: NavItem) => (
    <button
      onClick={() => onItemClick(id)}
      className={`
        w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200
        ${activeItem === id 
          ? 'bg-yellow-100 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-200' 
          : 'hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-800 dark:text-gray-300'}
        ${isCollapsed ? 'justify-center' : ''}
      `}
    >
      <Icon className={`w-5 h-5 ${isCollapsed ? 'mr-0' : ''}`} />
      {!isCollapsed && <span className="font-medium truncate">{label}</span>}
    </button>
  );

  return (
    <div 
      className={`
        h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 
        flex flex-col transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}
    >
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-yellow-500" />
            <h1 className="text-xl font-bold dark:text-white">AI Services</h1>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>
      </div>

      <nav className="flex-1 px-2 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => (
          <NavLink key={item.id} {...item} />
        ))}
      </nav>

      <div className="p-2 border-t border-gray-200 dark:border-gray-800 space-y-1">
        {bottomNavItems.map((item) => (
          <NavLink key={item.id} {...item} />
        ))}
        <button
          onClick={toggleDarkMode}
          className={`
            w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors
            hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-800 dark:text-gray-300
            ${isCollapsed ? 'justify-center' : ''}
          `}
        >
          {isDarkMode ? (
            <>
              <Sun className="w-5 h-5" />
              {!isCollapsed && <span className="font-medium">Light Mode</span>}
            </>
          ) : (
            <>
              <Moon className="w-5 h-5" />
              {!isCollapsed && <span className="font-medium">Dark Mode</span>}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

import React from 'react';
import { WeatherClock } from './ui/WeatherClock';

interface HeaderProps {
    title: string;
    isSidebarVisible: boolean;
    onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, isSidebarVisible, onMenuClick }) => {
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        {!isSidebarVisible && (
          <button 
            onClick={onMenuClick} 
            className="p-2 rounded-md text-[#b7c0d6] hover:text-white hover:bg-[#1C202A] transition-colors"
            aria-label="Open sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        <div>
          <h1 className="text-3xl font-bold text-white">Good Evening, M. Maynul Hasan</h1>
          <p className="text-md text-[#b7c0d6]">Welcome to your {title}</p>
        </div>
      </div>
      <WeatherClock />
    </header>
  );
};

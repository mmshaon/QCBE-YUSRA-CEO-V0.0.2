
import React from 'react';
import { Header } from '../components/Header';

interface ComingSoonProps {
    pageName: string;
    isSidebarVisible: boolean;
    onMenuClick: () => void;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ pageName, isSidebarVisible, onMenuClick }) => {
  return (
    <div className="p-8 h-full flex flex-col">
        <Header title={pageName} isSidebarVisible={isSidebarVisible} onMenuClick={onMenuClick} />
        <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 mb-4 bg-gradient-to-br from-[#24c38b] to-[#7a5cff] rounded-2xl animate-spin"></div>
            <h1 className="text-3xl font-bold text-white mb-2">{pageName}</h1>
            <p className="text-md text-[#b7c0d6]">This module is under construction.</p>
            <p className="text-md text-[#b7c0d6]">Full functionality will be available soon.</p>
        </div>
    </div>
  );
};

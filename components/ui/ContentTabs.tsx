
import React from 'react';

export interface Tab {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

interface ContentTabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabClick: (tabId: string) => void;
}

export const ContentTabs: React.FC<ContentTabsProps> = ({ tabs, activeTab, onTabClick }) => {
    return (
        <div className="border-b border-white/10 flex items-center space-x-2">
            {tabs.map(tab => (
                 <button
                    key={tab.id}
                    onClick={() => onTabClick(tab.id)}
                    className={`relative px-3 py-3 text-sm font-medium transition-colors duration-300 flex items-center
                    ${activeTab === tab.id ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    {tab.icon}
                    {tab.label}
                    {activeTab === tab.id && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 rounded-full" style={{boxShadow: '0 0 10px #7a5cff'}}/>
                    )}
                </button>
            ))}
        </div>
    );
};

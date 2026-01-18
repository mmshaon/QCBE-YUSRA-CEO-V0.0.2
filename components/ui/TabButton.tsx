
import React from 'react';

interface TabButtonProps {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

export const TabButton: React.FC<TabButtonProps> = ({ active, onClick, children }) => {
    return (
        <button
            onClick={onClick}
            className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300
            ${active ? 'text-white' : 'text-gray-400 hover:text-white'}`}
        >
            {children}
            {active && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 rounded-full" style={{boxShadow: '0 0 10px #7a5cff'}}/>
            )}
        </button>
    )
}


import React from 'react';

interface HorizontalBarGroupProps {
    data: { label: string; value: number }[]; // value is 0-100
}

export const HorizontalBarGroup: React.FC<HorizontalBarGroupProps> = ({ data }) => {
    return (
        <div className="w-full h-full flex flex-col justify-center space-y-3">
            {data.map(item => (
                <div key={item.label}>
                    <div className="flex justify-between items-center text-xs mb-1">
                        <span className="font-semibold text-gray-300">{item.label}</span>
                        <span className="font-mono text-white">{item.value}%</span>
                    </div>
                    <div className="w-full h-2 bg-cyan-900/50 rounded-full">
                        <div 
                            className="h-2 bg-cyan-400 rounded-full" 
                            style={{ 
                                width: `${item.value}%`,
                                transition: 'width 1s ease-out'
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

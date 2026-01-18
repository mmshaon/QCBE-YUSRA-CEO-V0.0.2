
import React from 'react';

interface FunnelChartProps {
    data: { label: string, value: number }[];
}

export const FunnelChart: React.FC<FunnelChartProps> = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const colors = ['#00f6ff', '#24a1c3', '#007A7A', '#07575B'];

    return (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-1">
            {data.map((item, index) => {
                const widthPercentage = (item.value / maxValue) * 100;
                return (
                    <div key={item.label} className="w-full flex flex-col items-center group">
                        <div className="flex items-center justify-between w-full text-xs mb-0.5">
                            <span className="text-gray-300">{item.label}</span>
                            <span className="font-bold text-white">{item.value}</span>
                        </div>
                        <div className="w-full h-4 rounded-sm bg-cyan-900/50">
                            <div 
                                className="h-4 rounded-sm transition-all duration-500"
                                style={{ 
                                    width: `${widthPercentage}%`,
                                    backgroundColor: colors[index % colors.length]
                                }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

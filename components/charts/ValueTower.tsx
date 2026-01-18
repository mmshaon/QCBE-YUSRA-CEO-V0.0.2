
import React from 'react';

interface ValueTowerProps {
    values: { value: number; label: string }[];
}

export const ValueTower: React.FC<ValueTowerProps> = ({ values }) => {
    const totalValue = values.reduce((sum, item) => sum + item.value, 0);
    const colors = ['#A0F85A', '#24c38b'];

    return (
        <div className="w-full h-full flex items-end justify-center space-x-2">
            <div className="w-1/2 h-full flex flex-col-reverse">
                {values.map((item, index) => (
                    <div 
                        key={item.label} 
                        className="w-full relative group"
                        style={{
                            height: `${(item.value / totalValue) * 100}%`,
                            backgroundColor: colors[index % colors.length],
                            animation: `bar-grow 0.5s ${index * 0.2}s ease-out forwards`,
                            transformOrigin: 'bottom',
                        }}
                    >
                         <div className="absolute bottom-1 right-1 text-right text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="font-bold text-black">{item.label}</p>
                            <p className="text-black/70">{item.value} SAR</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

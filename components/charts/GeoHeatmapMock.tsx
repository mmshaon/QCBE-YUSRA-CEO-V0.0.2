
import React from 'react';

export const GeoHeatmapMock: React.FC = () => {
    const regions = [
        { name: 'Riyadh', value: 90 },
        { name: 'Jeddah', value: 75 },
        { name: 'Dammam', value: 60 },
        { name: 'Abha', value: 40 },
    ];
    
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
                {regions.map(region => (
                    <div 
                        key={region.name}
                        className="rounded-lg flex items-center justify-center text-center p-2"
                        style={{ 
                            backgroundColor: `rgba(122, 92, 255, ${region.value / 100})`,
                            border: '1px solid rgba(122, 92, 255, 0.7)'
                        }}
                    >
                        <div>
                            <p className="text-xs font-bold text-white">{region.name}</p>
                            <p className="text-xxs text-purple-200">{region.value}M SAR</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

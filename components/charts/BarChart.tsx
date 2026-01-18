
import React, { useState } from 'react';

interface BarChartProps {
  data: { name: string; value: number }[];
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const maxValue = Math.ceil(Math.max(...data.map(d => d.value)) / 1000) * 1000;
  const chartHeight = 200;
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  return (
    <div className="relative pt-4">
      <div className="absolute w-full h-full top-0 left-0 grid grid-rows-4 pt-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border-t border-white/10">
            <span className="text-xs text-gray-500 -mt-2">{maxValue - (maxValue/4 * i)}</span>
          </div>
        ))}
      </div>
      <div className="flex items-end h-56 space-x-2 sm:space-x-4 relative z-10 pt-4">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * chartHeight;
          const isHovered = hoveredBar === item.name;

          return (
            <div 
              key={index} 
              className="relative flex-1 h-full flex flex-col justify-end items-center group"
              onMouseEnter={() => setHoveredBar(item.name)}
              onMouseLeave={() => setHoveredBar(null)}
            >
                {isHovered && (
                    <div className="absolute bottom-full mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded-md transition-opacity duration-300" style={{ transform: 'translateY(-10px)' }}>
                        {item.value.toLocaleString()} SAR
                    </div>
                )}
              <div 
                className="relative w-full bg-gradient-to-b from-[#7a5cff] to-[#00f6ff] rounded-t-sm transition-all duration-300 group-hover:brightness-125"
                style={{ 
                  height: `${barHeight}px`,
                  animation: `bar-grow 0.5s ${index * 0.1}s ease-out forwards`,
                  transformOrigin: 'bottom',
                }}
              />
              <span className="mt-2 text-xs text-gray-300 text-center">{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};


import React from 'react';

interface CircularGaugeProps {
  value: number; // 0-100
  color: string;
}

export const CircularGauge: React.FC<CircularGaugeProps> = ({ value, color }) => {
  const circumference = 2 * Math.PI * 25; // 2 * pi * radius
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="w-full h-full flex items-center justify-center">
        <svg className="w-20 h-20 transform -rotate-90">
            <circle
                cx="50%"
                cy="50%"
                r="40%"
                fill="transparent"
                stroke="#ffffff10"
                strokeWidth="8"
            />
            <circle
                cx="50%"
                cy="50%"
                r="40%"
                fill="transparent"
                stroke={color}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={circumference} 
                strokeLinecap="round"
                style={{
                    transition: 'stroke-dashoffset 1.5s cubic-bezier(0.25, 1, 0.5, 1)',
                    strokeDashoffset: offset
                }}
            />
        </svg>
    </div>
  );
};

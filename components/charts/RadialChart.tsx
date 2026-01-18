
import React from 'react';
import { AnimatedNumber } from '../ui/AnimatedNumber';

interface RadialChartProps {
  title?: string;
  value: number; // 0-100
  unit: string;
  description: string;
  slim?: boolean; // New prop for compact version
  color?: 'green' | 'blue' | 'purple';
}

export const RadialChart: React.FC<RadialChartProps> = ({ title, value, unit, description, slim = false, color = 'green' }) => {
  const circumference = 2 * Math.PI * 45; // 2 * pi * radius
  const offset = circumference - (value / 100) * circumference;

  const colorStops = {
    green: ['#A0F85A', '#24c38b'],
    blue: ['#00f6ff', '#24a1c3'],
    purple: ['#a27eff', '#7a5cff']
  }

  const content = (
    <>
      {!slim && <h3 className="text-lg font-bold text-white mb-4">{title}</h3>}
      <div className={`relative flex items-center justify-center ${slim ? 'w-24 h-24' : 'my-4 w-40 h-40'}`}>
          <svg className="w-full h-full transform -rotate-90">
              <defs>
                  <linearGradient id={`radial-grad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={colorStops[color][0]} />
                      <stop offset="100%" stopColor={colorStops[color][1]} />
                  </linearGradient>
              </defs>
              <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="transparent"
                  stroke="#ffffff10"
                  strokeWidth="10"
              />
              <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="transparent"
                  stroke={`url(#radial-grad-${color})`}
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference} // Start with full offset
                  strokeLinecap="round"
                  style={{
                      transition: 'stroke-dashoffset 1.5s cubic-bezier(0.25, 1, 0.5, 1)',
                      strokeDashoffset: offset
                  }}
              />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-white">
              <span className={`font-bold ${slim ? 'text-2xl' : 'text-4xl'}`}>
                  <AnimatedNumber value={value} />
                  <span className={`opacity-70 ${slim ? 'text-lg' : 'text-2xl'}`}>{unit}</span>
              </span>
              <span className="text-gray-400 text-xs">{description}</span>
          </div>
      </div>
    </>
  );

  if (slim) {
    return <div className="w-full h-full flex flex-col items-center justify-center">{content}</div>;
  }

  return (
    <div className="rounded-2xl bg-[#1C202A] border border-white/10 p-6 h-full flex flex-col items-center justify-center text-center">
        {content}
    </div>
  );
};

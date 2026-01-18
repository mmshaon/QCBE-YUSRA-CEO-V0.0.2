
import React from 'react';

interface MiniLineChartProps {
    data: number[];
    color: string;
}

export const MiniLineChart: React.FC<MiniLineChartProps> = ({ data, color }) => {
    const width = 150;
    const height = 60;
    const padding = 5;
    
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue === 0 ? 1 : maxValue - minValue;

    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
        const y = height - ((d - minValue) / range) * (height - padding * 2) - padding;
        return `${x},${y}`;
    }).join(' ');

    const firstPoint = points.split(' ')[0];

    return (
        <div className="w-full h-full flex items-center justify-center">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
                <defs>
                    <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                        <stop offset="100%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <path d={`M${firstPoint} L${points} L${width - padding},${height - padding} L${padding},${height - padding} Z`} fill={`url(#gradient-${color})`} />
                <polyline
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                />
            </svg>
        </div>
    );
};

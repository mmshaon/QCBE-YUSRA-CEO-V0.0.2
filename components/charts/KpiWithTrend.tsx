
import React from 'react';

interface KpiWithTrendProps {
    value: number;
    trend: 'up' | 'down';
    trendValue?: number;
    period: string;
}

export const KpiWithTrend: React.FC<KpiWithTrendProps> = ({ value, trend, trendValue, period }) => {
    const isPositive = trend === 'up';
    const trendColor = isPositive ? 'text-green-400' : 'text-red-400';

    const Arrow = () => isPositive 
        ? <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
        : <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center">
            <div className={`flex items-center gap-2 ${trendColor}`}>
                <Arrow />
                {trendValue && <span className="text-xl font-bold">{trendValue.toFixed(1)}%</span>}
            </div>
            <p className="text-xs text-gray-400 mt-1">{period}</p>
        </div>
    );
};

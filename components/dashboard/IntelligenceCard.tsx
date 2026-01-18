
import React, { useState } from 'react';
import { AnimatedNumber } from '../ui/AnimatedNumber';

interface IntelligenceCardProps {
    title: string;
    kpiValue?: number;
    kpiUnit?: string;
    children: React.ReactNode;
    statusColor: 'purple' | 'green' | 'blue' | 'red';
    fullWidth?: boolean;
}

export const IntelligenceCard: React.FC<IntelligenceCardProps> = ({ title, kpiValue, kpiUnit, children, statusColor, fullWidth = false }) => {
    const [style, setStyle] = useState({});

    const colorMap = {
        purple: { shadow: 'shadow-purple-500/50', border: 'border-purple-500' },
        green: { shadow: 'shadow-green-500/50', border: 'border-green-400' },
        blue: { shadow: 'shadow-cyan-500/50', border: 'border-cyan-400' },
        red: { shadow: 'shadow-red-500/50', border: 'border-red-500' },
    };

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { currentTarget: el } = e;
        const { left, top, width, height } = el.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        const rotateX = (y / height - 0.5) * -15;
        const rotateY = (x / width - 0.5) * 15;
        setStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
            transition: 'transform 0.1s ease-out'
        });
    };

    const onMouseLeave = () => {
        setStyle({
            transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
            transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
        });
    };
    
    const containerClass = `relative rounded-2xl bg-[#1C202A] border border-white/10 p-4 sm:p-5 group transition-all duration-300 transform-style-preserve-3d overflow-hidden ${fullWidth ? 'col-span-full' : 'min-h-[200px]'} ${colorMap[statusColor].border} border-t-4`;

    return (
        <div 
            className={containerClass}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={style}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.05)_1px,_transparent_0)] [background-size:20px_20px] opacity-50 z-0"></div>
            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-2xl ${colorMap[statusColor].shadow}`} style={{ zIndex: -1 }} />
            
            <div className="relative z-10 flex justify-between items-start">
                 <h3 className="text-md sm:text-lg font-bold text-white">{title}</h3>
                 {kpiValue !== undefined && (
                    <div className="text-xl sm:text-2xl font-bold text-white flex items-baseline">
                        <AnimatedNumber value={kpiValue} />
                        {kpiUnit && <span className="text-lg ml-1 opacity-70">{kpiUnit}</span>}
                    </div>
                 )}
            </div>

            <div className="relative z-10 mt-2 h-full">
                {children}
            </div>
        </div>
    );
};

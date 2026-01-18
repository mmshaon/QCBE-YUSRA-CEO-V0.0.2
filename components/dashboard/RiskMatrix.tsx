
import React from 'react';

interface Risk {
    name: string;
    prob: number;
    impact: number;
}

interface RiskMatrixProps {
    risks: Risk[];
}

export const RiskMatrix: React.FC<RiskMatrixProps> = ({ risks }) => {
    const gridSize = 5;
    return (
        <div className="w-full h-full flex flex-col justify-center text-xs">
            <div className="flex justify-center items-center mb-1">
                <span className="font-bold text-red-400">Impact</span>
            </div>
            <div className="flex">
                <div className="flex items-center -rotate-90 whitespace-nowrap">
                     <span className="font-bold text-amber-400">Probability</span>
                </div>
                <div className="grid grid-cols-5 grid-rows-5 gap-1 flex-1 aspect-square">
                    {[...Array(gridSize * gridSize)].map((_, i) => {
                        const x = (i % gridSize) + 1; // prob
                        const y = gridSize - Math.floor(i / gridSize); // impact
                        const risk = risks.find(r => r.prob === x && r.impact === y);
                        const bgColor = `rgba(239, 68, 68, ${(x*y)/40})`;

                        return (
                            <div key={i} className="bg-white/5 rounded-sm flex items-center justify-center relative group"
                                style={{backgroundColor: risk ? bgColor : undefined}}
                            >
                                {risk && <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>}
                                {risk && <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">{risk.name}</div>}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

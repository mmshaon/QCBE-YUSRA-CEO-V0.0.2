
import React from 'react';

interface BalanceBeamProps {
    leftValue: number;
    rightValue: number;
}

export const BalanceBeam: React.FC<BalanceBeamProps> = ({ leftValue, rightValue }) => {
    const ratio = leftValue / (leftValue + rightValue);
    // Clamp rotation between -15 and 15 degrees
    const rotation = Math.max(-15, Math.min(15, (0.5 - ratio) * 30));

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-full flex justify-between items-end px-2">
                <div className="text-center">
                    <p className="text-xs text-green-400">LTV</p>
                    <div className="text-lg font-bold text-white">{leftValue}</div>
                </div>
                <div className="text-center">
                    <p className="text-xs text-red-400">CAC</p>
                    <div className="text-lg font-bold text-white">{rightValue}</div>
                </div>
            </div>
            <div className="w-full h-12 flex flex-col items-center">
                 <div className="w-3/4 h-1 bg-gray-600 rounded-full transition-transform duration-500 ease-out"
                    style={{ transform: `rotate(${rotation}deg)` }}
                 >
                    <div className="w-1/2 h-full bg-green-400 rounded-l-full"></div>
                    <div className="w-1/2 h-full bg-red-400 rounded-r-full absolute top-0 right-0"></div>
                 </div>
                 <div className="w-0.5 h-4 bg-gray-600"></div>
            </div>
        </div>
    );
};

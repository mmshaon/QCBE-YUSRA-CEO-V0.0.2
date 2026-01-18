
import React from 'react';

interface ScoreIndicatorProps {
    value: number; // 0-100
}

export const ScoreIndicator: React.FC<ScoreIndicatorProps> = ({ value }) => {
    const rotation = -90 + (value / 100) * 180;
    
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[120px] aspect-video overflow-hidden">
                <div 
                    className="absolute top-0 left-0 w-full h-[200%] rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                    style={{
                        transformOrigin: 'bottom center',
                        transform: `rotate(${rotation}deg)`
                    }}
                >
                </div>
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[85%] bg-[#1C202A] rounded-t-full"></div>
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-[#1C202A]"></div>
            </div>
        </div>
    );
};

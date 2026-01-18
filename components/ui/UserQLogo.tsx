
import React from 'react';

interface UserQLogoProps {
  size?: 'sm' | 'lg';
  vaultState?: 'locked' | 'unlocking' | 'unlocked';
}

export const UserQLogo: React.FC<UserQLogoProps> = ({ size = 'lg', vaultState = 'locked' }) => {
    const dimensions = size === 'sm' ? { w: 40, h: 40, sw: 4 } : { w: 160, h: 160, sw: 8 };
    
    const isUnlocking = vaultState === 'unlocking';

    const ringStrokeWidth = dimensions.sw;

    // Arcs for the main 'Q' ring. Each is a separate path.
    const arcs = [
        "M 65.3,21.7 A 40 40 0 0 1 90 50", // Top-right arc
        "M 90,50 A 40 40 0 0 1 65.3,78.3", // Bottom-right arc
        "M 34.7,78.3 A 40 40 0 0 1 10,50", // Bottom-left arc
        "M 10,50 A 40 40 0 0 1 34.7,21.7", // Top-left arc
    ];

    const arcAnimationStyles = [
        { animation: isUnlocking ? 'q-arc-1-unlock 1s 1.5s forwards' : '' },
        { animation: isUnlocking ? 'q-arc-2-unlock 1s 1.5s forwards' : '' },
        { animation: isUnlocking ? 'q-arc-3-unlock 1s 1.5s forwards' : '' },
        { animation: isUnlocking ? 'q-arc-4-unlock 1s 1.5s forwards' : '' },
    ];

    return (
        <div className="relative" style={{ width: dimensions.w, height: dimensions.h }}>
            <style>
                {`
                    @keyframes q-glow {
                        0%, 100% { filter: drop-shadow(0 0 5px #00f6ff) drop-shadow(0 0 10px #00f6ff); }
                        50% { filter: drop-shadow(0 0 15px #00f6ff) drop-shadow(0 0 25px #00f6ff); }
                    }
                    @keyframes q-breathe {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                    }
                    .q-logo-animate {
                        animation: q-glow 4s infinite ease-in-out, q-breathe 8s infinite ease-in-out;
                    }
                    @keyframes circuitry-anim {
                        0% { stroke-dashoffset: 20; }
                        100% { stroke-dashoffset: 0; }
                    }
                `}
            </style>
            <svg 
                viewBox="0 0 100 100" 
                className="q-logo-animate"
                style={{ width: dimensions.w, height: dimensions.h, overflow: 'visible' }}
            >
                <defs>
                    <linearGradient id="q-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#24c38b" />
                        <stop offset="100%" stopColor="#7a5cff" />
                    </linearGradient>
                    <pattern id="circuit-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
                        <path d="M0 10h20M10 0v20" stroke="#00f6ff" strokeWidth="0.2" className="animate-circuitry" style={{animation: 'circuitry-anim 5s linear infinite'}} strokeDasharray="5, 5"/>
                    </pattern>
                </defs>

                {/* Unlocking animations */}
                {isUnlocking && (
                  <>
                    <rect x="-25" y="-25" width="150" height="0.5" fill="#00f6ff" style={{ animation: 'vault-scan-line 1.5s 0.2s cubic-bezier(0.64, 0, 0.78, 0) forwards', filter: 'blur(1px)'}} />
                    <circle cx="50" cy="50" r="45" stroke="#00f6ff" strokeWidth="0.5" fill="none" style={{animation: 'ring-pulse 1s 0.5s ease-out forwards'}} />
                    <circle cx="50" cy="50" r="45" stroke="#00f6ff" strokeWidth="0.5" fill="none" style={{animation: 'ring-pulse 1s 0.8s ease-out forwards'}} />
                  </>
                )}
                
                {/* Circuitry Background */}
                <circle cx="50" cy="50" r="45" fill="url(#circuit-pattern)" opacity="0.1" />

                {/* Main Q Ring - now as 4 arcs */}
                {arcs.map((arc, index) => (
                    <g key={index} className="transition-transform duration-1000" style={{ transformOrigin: '50% 50%', ...arcAnimationStyles[index] }}>
                        <path 
                            d={arc}
                            fill="none"
                            stroke="url(#q-grad)"
                            strokeWidth={ringStrokeWidth}
                            strokeLinecap="round"
                        />
                    </g>
                ))}
                
                {/* Q Tail */}
                 <g className="transition-transform duration-1000" style={{ transformOrigin: '50% 50%', animation: isUnlocking ? 'q-tail-unlock-rotate 1s 1.5s forwards' : '' }}>
                     <path
                        d="M 65 65 L 85 85"
                        stroke="#00f6ff"
                        strokeWidth={dimensions.sw}
                        strokeLinecap="round"
                     />
                 </g>
            </svg>
        </div>
    );
};


import React, { useState } from 'react';
import { ToggleSwitch } from '../ui/ToggleSwitch';
import { Button } from '../ui/Button';

interface SecuritySettingCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    isEnabled: boolean;
    onToggle: () => void;
    isAction?: boolean;
    disabled?: boolean;
}

export const SecuritySettingCard: React.FC<SecuritySettingCardProps> = ({ title, description, icon, isEnabled, onToggle, isAction = false, disabled = false }) => {
    const [cardStyle, setCardStyle] = useState({});

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) return;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 15;
        const y = (e.clientY - top - height / 2) / 15;
        setCardStyle({
            transform: `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.03, 1.03, 1.03)`,
            transition: 'transform 0.1s ease-out'
        });
    };

    const handleMouseLeave = () => {
        setCardStyle({
            transform: 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)',
            transition: 'transform 0.6s ease-in-out'
        });
    };

    return (
        <div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={cardStyle}
            className={`relative rounded-2xl bg-white/5 backdrop-blur-xl p-5 overflow-hidden shadow-2xl shadow-black/40 group flex flex-col justify-between animated-border ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
             <div 
                className="absolute inset-0 transition-all duration-300 opacity-0 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.15), transparent 50%)`
                }}
             />
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                    <div className="p-2 bg-black/30 rounded-lg text-purple-400">{icon}</div>
                    { !isAction && <ToggleSwitch isEnabled={isEnabled} onToggle={onToggle} disabled={disabled} /> }
                </div>
                <h4 className="font-bold text-white">{title}</h4>
                <p className="text-xs text-gray-400 min-h-[32px]">{description}</p>
            </div>
             { isAction && <div className="relative z-10 mt-3"><Button size="sm" className="w-full" onClick={onToggle} disabled={disabled}>Register Now</Button></div>}
        </div>
    )
}
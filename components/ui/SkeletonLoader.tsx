
import React from 'react';

interface SkeletonLoaderProps {
    className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ className }) => {
    return (
        <div className={`relative rounded-2xl bg-white/5 p-5 overflow-hidden ${className}`}>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                 style={{
                    transform: 'translateX(-100%)',
                    animation: 'shimmer 1.5s infinite'
                 }}
            />
            <style>
                {`
                    @keyframes shimmer {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                `}
            </style>
        </div>
    );
};

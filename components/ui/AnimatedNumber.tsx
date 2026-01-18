
import React, { useState, useEffect, useRef } from 'react';

interface AnimatedNumberProps {
    value: number;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const prevValueRef = useRef(0);
    const animationFrameRef = useRef<number>();

    useEffect(() => {
        const startValue = prevValueRef.current;
        const endValue = value;
        const duration = 1500; // ms
        let startTime: number | null = null;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            const easedPercentage = 1 - Math.pow(1 - percentage, 3); // easeOutCubic

            const currentValue = Math.floor(startValue + (endValue - startValue) * easedPercentage);
            
            setDisplayValue(currentValue);

            if (percentage < 1) {
                animationFrameRef.current = requestAnimationFrame(animate);
            } else {
                 setDisplayValue(endValue); // Ensure it ends on the exact value
                 prevValueRef.current = endValue;
            }
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if(animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [value]);

    return <span>{displayValue.toLocaleString()}</span>;
};

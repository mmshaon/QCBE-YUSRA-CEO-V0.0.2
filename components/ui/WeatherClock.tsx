
import React, { useState, useEffect } from 'react';

export const WeatherClock: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-[#1C202A]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <div className="text-sm">
                    <p className="font-bold text-white">28°C</p>
                    <p className="text-xs text-gray-400">Sunny</p>
                </div>
            </div>
             <div className="text-right">
                <p className="font-bold text-white text-lg">{formatTime(time)}</p>
                <p className="text-xs text-gray-400">{formatDate(time)}</p>
            </div>
        </div>
    );
};

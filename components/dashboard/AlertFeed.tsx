
import React from 'react';

interface Alert {
    id: number;
    text: string;
}

interface AlertFeedProps {
    alerts: Alert[];
}

export const AlertFeed: React.FC<AlertFeedProps> = ({ alerts }) => {
    return (
        <div className="w-full h-full flex flex-col">
            <ul className="space-y-3">
                {alerts.map(alert => (
                    <li key={alert.id} className="flex items-start text-sm">
                        <div className="w-4 h-4 mt-0.5 mr-3 flex-shrink-0">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        </div>
                        <p className="text-gray-300">{alert.text}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

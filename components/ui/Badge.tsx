
import React from 'react';

export type StatusType = 'Pending' | 'Approved' | 'Rejected' | 'Active' | 'Inactive';

interface BadgeProps {
    status: StatusType;
}

export const Badge: React.FC<BadgeProps> = ({ status }) => {
    const statusStyles: Record<StatusType, string> = {
        Approved: 'bg-green-500/20 text-green-400 border-green-500/30',
        Active: 'bg-green-500/20 text-green-400 border-green-500/30',
        Pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        Rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
        Inactive: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    };

    const style = statusStyles[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';

    return (
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${style}`}>
            {status}
        </span>
    );
};

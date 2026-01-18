
import React from 'react';

interface ToggleSwitchProps {
    isEnabled: boolean;
    onToggle: () => void;
    disabled?: boolean;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isEnabled, onToggle, disabled = false }) => {
    return (
        <button
            onClick={onToggle}
            disabled={disabled}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ease-in-out
            ${isEnabled ? 'bg-purple-600' : 'bg-gray-600'}
            ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
        >
            <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ease-in-out
                ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`}
            />
        </button>
    )
}
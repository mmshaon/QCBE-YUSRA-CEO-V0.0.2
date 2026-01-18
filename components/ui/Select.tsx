
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ options, ...props }) => {
    return (
        <select 
            className="w-full bg-[#0f1220] border border-[#2a314e] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#7a5cff] transition-all duration-200"
            {...props}
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    );
};

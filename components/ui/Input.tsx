
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = (props) => {
    const baseStyles = "w-full bg-[#0f1220] border border-[#2a314e] rounded-lg px-4 py-2 text-white placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#7a5cff] transition-all duration-200";
    const fileInputStyles = "file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#2a314e] file:text-[#b7c0d6] hover:file:bg-[#3a415e]";
    
    const className = props.type === 'file' 
        ? `${baseStyles} ${fileInputStyles}` 
        : baseStyles;
        
    return <input className={className} {...props} />;
};


import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', ...props }) => {
    const baseStyles = "font-semibold rounded-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";

    const variantStyles = {
        primary: 'bg-[#7a5cff] hover:bg-[#6a4ff9] text-white',
        secondary: 'bg-[#2a314e] hover:bg-[#3a415e] text-[#b7c0d6] border border-[#3a415e]',
        danger: 'bg-red-500/20 hover:bg-red-500/30 text-red-400',
    };

    const sizeStyles = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-5 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    return (
        <button className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`} {...props}>
            {children}
        </button>
    );
};

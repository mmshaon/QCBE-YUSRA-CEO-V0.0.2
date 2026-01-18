
import React from 'react';

interface YusraIconProps {
  className?: string;
}

export const YusraIcon: React.FC<YusraIconProps> = ({ className }) => {
  return (
    <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
    >
        <defs>
            <linearGradient id="yusra-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#24c38b" />
                <stop offset="100%" stopColor="#7a5cff" />
            </linearGradient>
        </defs>
        <path d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z" stroke="url(#yusra-grad)" strokeWidth="1.5"/>
        <path d="M9.663 17H14.337" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 3V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.364 5.63604L17.656 6.34304" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 12H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.343 6.34304L5.636 5.63604" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.828 14.8284C14.037 15.6194 13.047 16.0664 12 16.0664C10.953 16.0664 9.963 15.6194 9.172 14.8284C8.381 14.0374 7.934 13.0474 7.934 12C7.934 10.953 8.381 9.96304 9.172 9.17204C9.963 8.38104 10.953 7.93404 12 7.93404C13.047 7.93404 14.037 8.38104 14.828 9.17204C15.619 9.96304 16.066 10.953 16.066 12C16.066 13.0474 15.619 14.0374 14.828 14.8284Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
};

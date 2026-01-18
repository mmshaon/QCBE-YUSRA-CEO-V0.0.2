
import React from 'react';

interface ModuleIconProps {
    iconName: string;
    color: string;
    className?: string;
}

const colors = {
    purple: { light: '#a27eff', dark: '#7a5cff' },
    cyan: { light: '#00f6ff', dark: '#24a1c3' },
    red: { light: '#ff7a7a', dark: '#f95c5c' },
    yellow: { light: '#ffd24d', dark: '#ffc31f' },
    blue: { light: '#5cc7f9', dark: '#4aa9f9' },
    orange: { light: '#ffb45e', dark: '#ffa136' },
    green: { light: '#A0F85A', dark: '#24c38b' },
    gray: { light: '#b7c0d6', dark: '#8a94a6' },
};

const iconPaths: Record<string, React.ReactNode> = {
    dashboard: <><path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" fill="currentColor" opacity="0.6" /><path d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" fill="currentColor" /></>,
    auth: <><path d="M15 7a2 2 0 012 2v10m-2-10a2 2 0 00-2 2v10m-2-10a2 2 0 00-2 2v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" /><path d="M7 7a2 2 0 00-2 2v10m-2-10a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2h-2.586a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 009.586 5H7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="currentColor" fillOpacity="0.2" /></>,
    access: <><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" opacity="0.6" /><path d="M18 9V7a4 4 0 00-8 0v2h8z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2"/></>,
    godmode: <><path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" /></>,
    cube: <><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></>,
    projects: <><path d="M5 17v-2h14v2" fill="currentColor" opacity="0.6" /><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" /></>,
    tasks: <><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="1.5" opacity="0.6" /><path d="M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" /></>,
    invoice: <><path d="M13 16h-1v-4h-1m1-4h.01" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.6" /></>,
    clients: <><path d="M12 4.354a4 4 0 110 5.292" stroke="currentColor" strokeWidth="1.5" /><path d="M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-1.78-4.125" stroke="currentColor" strokeWidth="1.5" opacity="0.6" /></>,
    assets: <><path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0122 12c0 3.032-1.665 5.68-4.014 7.014C15 21.014 12 22 12 20c-2 1-2.657-1.343-2.657-1.343" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" /></>,
    documents: <><path d="M9 12h6m-6 4h6" stroke="currentColor" strokeWidth="1.5" /><path d="M19 21H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="1.5" opacity="0.6" fill="currentColor" fillOpacity="0.2" /></>,
    messaging: <><path d="M8 12h.01M12 12h.01M16 12h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="1.5" opacity="0.6" /></>,
    voice: <><path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" /><path d="M12 18a3 3 0 01-3-3V5a3 3 0 116 0v10a3 3 0 01-3 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></>,
    video: <><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14" fill="currentColor" opacity="0.6"/><path d="M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" /></>,
    worlds: <><path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945C17.065 14.184 14.246 16 12 16s-5.065-1.816-6.945-5z" fill="currentColor" opacity="0.6" /><path d="M12 4c2.246 0 5.065 1.816 6.945 5H19a2 2 0 00-2-2v-1a2 2 0 01-2-2H7a2 2 0 01-2 2v1a2 2 0 00-2 2h1.945C5.935 5.816 8.754 4 12 4z" fill="currentColor" /></>,
    yusra: <><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" /><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></>,
    notifications: <><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" stroke="currentColor" strokeWidth="1.5"/><path d="M9 17v1a3 3 0 006 0v-1" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/></>,
    reporting: <><rect x="4" y="11" width="4" height="8" rx="1" fill="currentColor" opacity="0.6" /><rect x="10" y="7" width="4" height="12" rx="1" fill="currentColor" /><rect x="16" y="4" width="4" height="15" rx="1" fill="currentColor" opacity="0.6" /></>,
    audit: <><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/><path d="M10 16v-5a1 1 0 011-1h2a1 1 0 011 1v5h-4z" stroke="currentColor" strokeWidth="1.5" /></>,
    workflow: <><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2"/></>,
    distribution: <><path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2" stroke="currentColor" strokeWidth="1.5" opacity="0.6" /><rect x="9" y="13" width="10" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" /><path d="M16 15h2m-2 2h2m-2 2h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
    ui_control: <><path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" /><path d="M12 12v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>,
    integrations: <><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>,
    billing: <><path d="M3 10h18M7 15h1m4 0h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 8a3 3 0 013-3h12a3 3 0 013 3v8a3 3 0 01-3 3H6a3 3 0 01-3-3V8z" stroke="currentColor" strokeWidth="1.5" opacity="0.6" /></>,
    settings: <><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" stroke="currentColor" strokeWidth="1.5" opacity="0.6" /></>,
};

export const ModuleIcon: React.FC<ModuleIconProps> = ({ iconName, color, className }) => {
    const colorSet = colors[color] || colors.gray;

    return (
        <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className={className}
        >
            <defs>
                <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={colorSet.light} />
                    <stop offset="100%" stopColor={colorSet.dark} />
                </linearGradient>
            </defs>
            <g color={`url(#grad-${color})`}>
                {iconPaths[iconName] || iconPaths['cube']}
            </g>
        </svg>
    );
};

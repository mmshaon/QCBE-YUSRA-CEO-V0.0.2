
import React from 'react';
import { Button } from '../ui/Button';
import { useTranslation } from '../../hooks/useTranslation';

const mockSessions = [
    { id: 1, browser: 'Chrome', os: 'Windows', location: 'Riyadh, SA', isCurrent: true, icon: 'desktop' },
    { id: 2, browser: 'Safari', os: 'iPhone', location: 'Jeddah, SA', isCurrent: false, icon: 'mobile' },
    { id: 3, browser: 'Firefox', os: 'macOS', location: 'Dammam, SA', isCurrent: false, icon: 'desktop' },
];

const icons: Record<string, React.ReactNode> = {
    desktop: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    mobile: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
}

export const SessionManager: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="relative rounded-2xl bg-white/5 backdrop-blur-xl p-6 shadow-2xl shadow-black/40 group animated-border">
             <div 
                className="absolute inset-0 transition-all duration-300 opacity-0 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.1), transparent 50%)`
                }}
             />
            <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-4">{t('session.title')}</h3>
                <p className="text-sm text-gray-400 mb-6">{t('session.description')}</p>
                <ul className="space-y-3">
                    {mockSessions.map(session => (
                        <li key={session.id} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                            <div className="flex items-center gap-4 text-start">
                                <div className="text-gray-400">{icons[session.icon]}</div>
                                <div>
                                    <p className="font-semibold text-white">{session.browser} on {session.os}</p>
                                    <p className="text-xs text-gray-400">{session.location} {session.isCurrent && <span className="text-green-400">({t('session.current')})</span>}</p>
                                </div>
                            </div>
                            {!session.isCurrent && <Button variant="danger" size="sm">{t('session.revoke')}</Button>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

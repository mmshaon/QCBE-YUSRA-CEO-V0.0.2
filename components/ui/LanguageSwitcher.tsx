
import React, { useContext } from 'react';
import { LanguageContext, Language } from '../../context/LanguageContext';

const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'bn', name: 'Bengali', flag: '🇧🇩' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
];

export const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useContext(LanguageContext);

    return (
        <div className="flex items-center bg-black/30 backdrop-blur-xl border border-white/20 rounded-full p-1">
            {languages.map(lang => (
                <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors duration-300 ${
                        language === lang.code ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-white/10'
                    }`}
                    aria-label={`Switch to ${lang.name}`}
                >
                    {lang.flag}
                </button>
            ))}
        </div>
    );
};


import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../translations';

export const useTranslation = () => {
    const { language } = useContext(LanguageContext);

    const t = (key: string): string => {
        const keys = key.split('.');
        let result: any = translations;
        for (const k of keys) {
            result = result[k];
            if (!result) {
                return key; // Return the key if translation is not found
            }
        }
        return result[language] || result['en'];
    };

    return { t, language };
};

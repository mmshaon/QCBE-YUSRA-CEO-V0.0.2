
import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

interface PasswordStrengthProps {
    password?: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password = '' }) => {
    const { t } = useTranslation();
    const calculateStrength = () => {
        let score = 0;
        if (password.length > 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    };

    const strength = calculateStrength();
    const strengthLevels = [
        { labelKey: 'password.weak', color: 'bg-red-500', width: '25%' },
        { labelKey: 'password.medium', color: 'bg-orange-500', width: '50%' },
        { labelKey: 'password.strong', color: 'bg-yellow-500', width: '75%' },
        { labelKey: 'password.veryStrong', color: 'bg-green-500', width: '100%' },
    ];
    
    const currentStrength = strength > 0 ? strengthLevels[strength - 1] : { labelKey: '', color: 'bg-gray-700', width: '0%' };

    return (
        <div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div 
                    className={`h-1.5 rounded-full transition-all duration-300 ${currentStrength.color}`} 
                    style={{ width: currentStrength.width }}
                ></div>
            </div>
            {password.length > 0 && (
                <p className="text-xs text-gray-400 mt-1">{t('password.strength')}: {t(currentStrength.labelKey)}</p>
            )}
        </div>
    );
};


import React, { useState, useContext, useEffect } from 'react';
import { BiometricModal, BiometricState } from '../components/ui/BiometricModal';
import { LanguageSwitcher } from '../components/ui/LanguageSwitcher';
import { LanguageContext } from '../context/LanguageContext';
import { webAuthnHelpers } from '../utils/webauthn';
import { VaultAuth } from '../components/auth/VaultAuth';

interface LoginPageProps {
    onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
    const { language } = useContext(LanguageContext);
    const [isBiometricRegistered, setIsBiometricRegistered] = useState(webAuthnHelpers.isBiometricRegistered());
    const [isWebAuthnSupported, setIsWebAuthnSupported] = useState(true);
    const [biometricModalState, setBiometricModalState] = useState<BiometricState>({ isOpen: false, status: 'idle' });

    useEffect(() => {
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        setIsWebAuthnSupported(webAuthnHelpers.isWebAuthnSupported());
    }, [language]);

    const handleBiometricLogin = async () => {
        if (!isWebAuthnSupported) {
             setBiometricModalState({ isOpen: true, status: 'error', message: 'Biometrics are not supported on this browser.' });
             setTimeout(() => setBiometricModalState({ isOpen: false, status: 'idle' }), 3000);
             return;
        }
        if (!isBiometricRegistered) {
            setBiometricModalState({ isOpen: true, status: 'error', message: "No biometrics registered for this account. Please sign in with a password and register from the Authentication settings." });
            setTimeout(() => setBiometricModalState({ isOpen: false, status: 'idle' }), 4000);
            return;
        }
        setBiometricModalState({ isOpen: true, status: 'authenticating', message: 'Quantum Vault unlocked. Awaiting biometric confirmation...' });
        try {
            const success = await webAuthnHelpers.login();
            if (success) {
                setBiometricModalState({ isOpen: true, status: 'success', message: 'Authentication successful! Welcome back.' });
                setTimeout(() => {
                    setBiometricModalState({ isOpen: false, status: 'idle' });
                    onLoginSuccess();
                }, 1500);
            } else {
                 setBiometricModalState({ isOpen: true, status: 'error', message: 'Authentication failed. Please try again.' });
                 setTimeout(() => setBiometricModalState({ isOpen: false, status: 'idle' }), 3000);
            }
        } catch (error) {
            console.error("Login Error:", error);
            let message = 'An unknown error occurred.';
            if (error instanceof Error) {
                 if (error.name === 'NotAllowedError') {
                    message = 'Authentication was cancelled.';
                } else if (error.message.includes('supported')) {
                    message = error.message;
                } else {
                    message = 'Authentication failed. Please try again.';
                }
            }
            setBiometricModalState({ isOpen: true, status: 'error', message: message });
            setTimeout(() => setBiometricModalState({ isOpen: false, status: 'idle' }), 3000);
        }
    };
    
    const handlePasswordLogin = (rememberMe: boolean) => {
        console.log('Login attempt with Remember Me:', rememberMe);
        // In a real app, you would handle the session persistence here.
        onLoginSuccess();
    };

    const handleSignupSuccess = () => {
        alert("Signup request submitted! An administrator will review your request.");
    };

    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative z-10 animated-bg">
                <div className="absolute top-6 right-6 z-20">
                    <LanguageSwitcher />
                </div>
                 
                <VaultAuth 
                    onBiometricLogin={handleBiometricLogin} 
                    isBiometricEnabled={isBiometricRegistered}
                    isBiometricSupported={isWebAuthnSupported}
                    onPasswordLogin={handlePasswordLogin}
                    onSignupSuccess={handleSignupSuccess}
                />
            </div>
            <BiometricModal
                state={biometricModalState}
                onClose={() => setBiometricModalState({ isOpen: false, status: 'idle' })}
            />
        </>
    );
};

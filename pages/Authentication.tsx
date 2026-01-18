
import React, { useState, useContext, useEffect } from 'react';
import { Header } from '../components/Header';
import { SecuritySettingCard } from '../components/auth/SecuritySettingCard';
import { SessionManager } from '../components/auth/SessionManager';
import { BiometricModal, BiometricState } from '../components/ui/BiometricModal';
import { LanguageSwitcher } from '../components/ui/LanguageSwitcher';
import { LanguageContext } from '../context/LanguageContext';
import { UserManagement } from '../components/admin/UserManagement';
import { YusraAIPermissions } from '../components/admin/YusraAIPermissions';
import { webAuthnHelpers } from '../utils/webauthn';

interface AuthenticationProps {
  isSidebarVisible: boolean;
  onMenuClick: () => void;
}

export const Authentication: React.FC<AuthenticationProps> = ({ isSidebarVisible, onMenuClick }) => {
    const { language } = useContext(LanguageContext);
    const [mfaEnabled, setMfaEnabled] = useState(true);

    const [isBiometricRegistered, setIsBiometricRegistered] = useState(webAuthnHelpers.isBiometricRegistered());
    const [biometricModalState, setBiometricModalState] = useState<BiometricState>({ isOpen: false, status: 'idle' });
    const [isWebAuthnSupported, setIsWebAuthnSupported] = useState(true);

    useEffect(() => {
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        setIsWebAuthnSupported(webAuthnHelpers.isWebAuthnSupported());
    }, [language]);

    const handleRegisterBiometrics = async () => {
        if (!isWebAuthnSupported) return;
        setBiometricModalState({ isOpen: true, status: 'registering', message: 'Please follow your browser or OS prompt to register your biometrics...' });
        try {
            const success = await webAuthnHelpers.register();
            if (success) {
                setBiometricModalState({ isOpen: true, status: 'success', message: 'Biometric registration successful!' });
                setIsBiometricRegistered(true);
                setTimeout(() => setBiometricModalState({ isOpen: false, status: 'idle' }), 2000);
            } else {
                 setBiometricModalState({ isOpen: true, status: 'error', message: 'Biometric registration failed. The request was unsuccessful.' });
                 setTimeout(() => setBiometricModalState({ isOpen: false, status: 'idle' }), 3000);
            }
        } catch (error) {
            console.error("Registration Error:", error);
            let message = 'An unknown error occurred. Please try again.';
            if (error instanceof Error) {
                 if (error.name === 'NotAllowedError') {
                    message = 'Registration was cancelled. You can try again at any time.';
                } else if (error.message.includes('supported')) {
                    message = error.message;
                } else {
                    message = 'A technical error occurred during registration.';
                }
            }
            setBiometricModalState({ isOpen: true, status: 'error', message: message });
            setTimeout(() => setBiometricModalState({ isOpen: false, status: 'idle' }), 3000);
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { currentTarget: target } = e;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        target.style.setProperty("--mouse-x", `${x}px`);
        target.style.setProperty("--mouse-y", `${y}px`);
    };

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 relative" onMouseMove={handleMouseMove}>
        <Header title="Authentication & Identity" isSidebarVisible={isSidebarVisible} onMenuClick={onMenuClick} />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">Your Security Settings</h3>
                    <div className="grid grid-cols-1 gap-6">
                      <SecuritySettingCard 
                        title="Multi-Factor Auth" 
                        description="Add an extra layer of security to your account."
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.789-2.756 9.356-1.747-2.567-2.756-5.839-2.756-9.356C6.488 7.483 8.984 5 12 5s5.512 2.483 5.512 6.116z" /></svg>}
                        isEnabled={mfaEnabled}
                        onToggle={() => setMfaEnabled(!mfaEnabled)}
                      />
                      <SecuritySettingCard 
                        title="Biometric Login" 
                        description={
                            !isWebAuthnSupported ? "Biometrics are not supported on this browser or device." :
                            isBiometricRegistered ? "Biometrics are active on this device." : "Register your fingerprint or face to sign in."
                        }
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" /></svg>}
                        isEnabled={isBiometricRegistered}
                        onToggle={handleRegisterBiometrics}
                        isAction={!isBiometricRegistered}
                        disabled={!isWebAuthnSupported}
                      />
                    </div>
                </div>
                <YusraAIPermissions />
                <SessionManager />
            </div>
            <div className="lg:col-span-3">
                <UserManagement />
            </div>
        </div>
      </div>
      <BiometricModal
        state={biometricModalState}
        onClose={() => setBiometricModalState({ isOpen: false, status: 'idle' })}
      />
    </>
  );
};
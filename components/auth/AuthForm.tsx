
import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { TabButton } from '../ui/TabButton';
import { useTranslation } from '../../hooks/useTranslation';
import { PasswordStrength } from '../ui/PasswordStrength';

interface AuthFormProps {
    onBiometricLogin: () => void;
    isBiometricEnabled: boolean;
    isBiometricSupported: boolean;
    onPasswordLogin: (rememberMe: boolean) => void;
    onSignupSuccess: () => void;
    isUnlocked: boolean;
}

const SignUpStep1: React.FC<{ onNext: () => void }> = ({ onNext }) => {
    const { t } = useTranslation();
    return (
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
            <Input type="text" placeholder={t('auth.fullName')} required />
            <Input type="email" placeholder={t('auth.email')} required />
            <Button className="w-full" type="submit">{t('auth.next')}</Button>
        </form>
    )
}

const SignUpStep2: React.FC<{ onNext: () => void }> = ({ onNext }) => {
    const { t } = useTranslation();
    const [password, setPassword] = useState('');
    return (
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
            <Input type="password" placeholder={t('auth.createPassword')} value={password} onChange={e => setPassword(e.target.value)} required />
            <PasswordStrength password={password} />
            <Button className="w-full" type="submit">{t('auth.next')}</Button>
        </form>
    )
}

const SignUpStep3: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const { t } = useTranslation();
    return (
        <div className="space-y-4 text-center">
            <p className="text-gray-300">{t('auth.otpSent')}</p>
            <Input type="tel" placeholder={t('auth.enterOtp')} maxLength={6} required />
            <Button className="w-full" onClick={onComplete}>{t('auth.completeSignup')}</Button>
        </div>
    )
}

const BiometricIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:scale-125 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
    </svg>
);

export const AuthForm: React.FC<AuthFormProps> = ({ onBiometricLogin, isBiometricEnabled, isBiometricSupported, onPasswordLogin, onSignupSuccess, isUnlocked }) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'signIn' | 'signUp'>('signIn');
    const [signupStep, setSignupStep] = useState(1);
    const [loginMethod, setLoginMethod] = useState<'password' | 'passwordless'>('password');
    const [otpSent, setOtpSent] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const resetForms = () => {
        setSignupStep(1);
        setLoginMethod('password');
        setOtpSent(false);
    }
    
    const formContainerClass = `relative rounded-2xl animated-border bg-white/5 backdrop-blur-xl p-6 shadow-2xl shadow-black/40 h-full group transition-all duration-700 ease-in-out`;
    
    const unlockedStyle: React.CSSProperties = {
        animation: 'form-materialize 0.8s 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        opacity: 0,
    };

    const renderSignUp = () => {
        switch (signupStep) {
            case 1: return <SignUpStep1 onNext={() => setSignupStep(2)} />;
            case 2: return <SignUpStep2 onNext={() => setSignupStep(3)} />;
            case 3: return <SignUpStep3 onComplete={() => { onSignupSuccess(); setActiveTab('signIn'); resetForms(); }} />;
            default: return null;
        }
    }
    
    const getBiometricButtonText = () => {
        if (!isBiometricSupported) return t('auth.biometricsNotSupported');
        if (!isBiometricEnabled) return t('auth.biometricsNotRegistered');
        return t('auth.signInBiometrics');
    }

    return (
        <div 
            className={formContainerClass}
            style={isUnlocked ? unlockedStyle : { opacity: 0, transform: 'scale(1.2)' }}
        >
             <div className="relative z-10 flex flex-col h-full">
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">{t('auth.title')}</h3>
                    <div className="flex border-b border-white/10 mb-6">
                        <TabButton active={activeTab === 'signIn'} onClick={() => { setActiveTab('signIn'); resetForms(); }}>{t('auth.signIn')}</TabButton>
                        <TabButton active={activeTab === 'signUp'} onClick={() => { setActiveTab('signUp'); resetForms(); }}>{t('auth.createAccount')}</-Button>
                    </div>
                </div>

                <div className="flex-1">
                    {activeTab === 'signIn' ? (
                        <>
                            {loginMethod === 'password' && (
                                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onPasswordLogin(rememberMe); }}>
                                    <Input type="email" placeholder={t('auth.email')} required/>
                                    <Input type="password" placeholder={t('auth.password')} required/>
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center text-sm text-gray-300 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-purple-500 focus:ring-purple-500 accent-purple-500"
                                            />
                                            <span className="ml-2">Remember Me</span>
                                        </label>
                                    </div>
                                    <Button className="w-full" type="submit">{t('auth.signIn')}</Button>
                                </form>
                            )}
                            {loginMethod === 'passwordless' && !otpSent && (
                                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setOtpSent(true); }}>
                                    <Input type="email" placeholder={t('auth.emailForOtp')} required />
                                    <Button className="w-full" type="submit">{t('auth.sendCode')}</Button>
                                </form>
                            )}
                            {loginMethod === 'passwordless' && otpSent && (
                                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onPasswordLogin(false); }}>
                                    <Input type="tel" placeholder={t('auth.enterOtp')} maxLength={6} required />
                                    <Button className="w-full" type="submit">{t('auth.signInWithCode')}</Button>
                                </form>
                            )}
                        </>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
                                <span>{t(`auth.step${signupStep}Title`)}</span>
                                <span>{t('auth.step')} {signupStep} / 3</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                <div className="bg-purple-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${(signupStep / 3) * 100}%` }}></div>
                            </div>
                            <div className="pt-4">
                                {renderSignUp()}
                            </div>
                        </div>
                    )}
                </div>

                {activeTab === 'signIn' && (
                    <div className="mt-4">
                        <div className="text-center text-xs text-gray-400 my-4">{t('auth.orContinueWith')}</div>
                        <div className="space-y-3">
                            <Button variant="secondary" className="w-full group" onClick={() => setLoginMethod(loginMethod === 'password' ? 'passwordless' : 'password')}>
                               {loginMethod === 'password' ? t('auth.usePasswordless') : t('auth.usePassword')}
                            </Button>
                            <Button 
                                variant="secondary" 
                                className="w-full group relative overflow-hidden !border-cyan-400/50"
                                onClick={onBiometricLogin} 
                                disabled={!isBiometricSupported || !isBiometricEnabled}
                            >
                                <span className="absolute top-0 left-0 w-full h-full bg-cyan-400/20 blur-2xl animate-pulse"></span>
                                <BiometricIcon />
                                {getBiometricButtonText()}
                            </Button>
                        </div>
                    </div>
                )}
             </div>
        </div>
    )
}

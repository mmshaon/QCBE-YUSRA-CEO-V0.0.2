
import React, { useState, useEffect } from 'react';
import { UserQLogo } from '../ui/UserQLogo';
import { AuthForm } from './AuthForm';

interface VaultAuthProps {
    onBiometricLogin: () => void;
    isBiometricEnabled: boolean;
    isBiometricSupported: boolean;
    onPasswordLogin: (rememberMe: boolean) => void;
    onSignupSuccess: () => void;
}

export const VaultAuth: React.FC<VaultAuthProps> = (props) => {
    const [vaultState, setVaultState] = useState<'locked' | 'unlocking' | 'unlocked'>('locked');
    const [style, setStyle] = useState({});

    useEffect(() => {
        if (vaultState === 'unlocking') {
            const timer = setTimeout(() => {
                setVaultState('unlocked');
            }, 3000); // Sync with animation duration (extended for new animations)
            return () => clearTimeout(timer);
        }
    }, [vaultState]);

    const handleInitiateUnlock = () => {
        if (vaultState === 'locked') {
            setVaultState('unlocking');
            // If biometrics are enabled, we can trigger the login directly after the animation
            if (props.isBiometricEnabled && props.isBiometricSupported) {
                 setTimeout(() => {
                    props.onBiometricLogin();
                 }, 3100);
            }
        }
    };

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (vaultState !== 'locked') return;
        const { currentTarget: el } = e;
        const { left, top, width, height } = el.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        const rotateX = (y - 0.5) * -15;
        const rotateY = (x - 0.5) * 15;
        setStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: 'transform 0.1s ease-out'
        });
    };

    const onMouseLeave = () => {
        setStyle({
            transform: 'perspective(1000px) rotateX(0) rotateY(0)',
            transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
        });
    };
    
    const vaultContainerStyle: React.CSSProperties = {
        transformStyle: 'preserve-3d',
        animation: vaultState === 'unlocked' ? 'vault-iris-open 0.8s cubic-bezier(0.7, 0, 0.84, 0) forwards' : '',
        animationDelay: '0.3s',
    };

    return (
        <div className="w-full max-w-md h-[550px] flex flex-col items-center justify-center" style={{ perspective: '1000px' }}>
             <div className="text-center mb-8">
                 <h1 className="text-3xl font-bold text-white">Quantum Cube Business Engine</h1>
                 <p className="text-md text-[#b7c0d6]">Created by Mohammad Maynul Hasan</p>
             </div>
             
             <div className="relative w-full h-full flex items-center justify-center">
                {/* Pulsing background effect */}
                <div className={`absolute w-96 h-96 bg-cyan-900/50 rounded-full blur-3xl transition-opacity duration-1000 ${vaultState === 'locked' ? 'opacity-50 animate-pulse' : 'opacity-0'}`} />

                {/* Vault Door (Logo) */}
                <div 
                    className="absolute w-full h-full flex items-center justify-center cursor-pointer"
                    style={vaultState !== 'unlocked' ? vaultContainerStyle : { ...vaultContainerStyle, pointerEvents: 'none' }}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    onClick={handleInitiateUnlock}
                >
                    <div style={style}>
                       <UserQLogo vaultState={vaultState} />
                    </div>
                    {vaultState === 'locked' && (
                        <div className="absolute bottom-24 text-center">
                            <p className="text-cyan-300 font-semibold animate-pulse">
                                {props.isBiometricSupported && props.isBiometricEnabled ? 'Biometric Scan or Click to Initiate' : 'Click to Initiate'}
                            </p>
                            <p className="text-xs text-gray-400">Quantum-Grade Security Lock Engaged</p>
                        </div>
                    )}
                </div>

                {/* Auth Form (hidden until unlocked) */}
                {vaultState !== 'locked' && (
                     <div className="w-full">
                        <AuthForm {...props} isUnlocked={vaultState === 'unlocked'} />
                     </div>
                )}
             </div>

        </div>
    );
};

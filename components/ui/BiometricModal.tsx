
import React from 'react';

export interface BiometricState {
    isOpen: boolean;
    status: 'idle' | 'registering' | 'authenticating' | 'success' | 'error';
    message?: string;
}

interface BiometricModalProps {
    state: BiometricState;
    onClose: () => void;
}

const FingerprintIcon: React.FC<{ status: BiometricState['status'] }> = ({ status }) => {
    const isScanning = status === 'registering' || status === 'authenticating';
    const isSuccess = status === 'success';
    const isError = status === 'error';
    
    return (
        <div className="relative w-24 h-24 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.588 8.268M12 18H8.25c-.621 0-1.125-.504-1.125-1.125V9.75c0-.621.504-1.125 1.125-1.125H12m7.5 8.25h-4.5M12 15h3.75" />
            </svg>
            {isScanning && (
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border-2 border-dashed border-cyan-400 rounded-full animate-spin"></div>
                 </div>
            )}
            {isSuccess && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            )}
            {isError && (
                 <div className="absolute inset-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            )}
        </div>
    );
};

export const BiometricModal: React.FC<BiometricModalProps> = ({ state, onClose }) => {
    if (!state.isOpen) return null;

    const titles = {
        idle: 'Biometrics',
        registering: 'Register Biometrics',
        authenticating: 'Authenticating',
        success: 'Success',
        error: 'Error'
    }

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
            <div 
                className="bg-[#161a2d] border border-[#2a314e] rounded-2xl p-8 shadow-2xl w-full max-w-sm text-center"
            >
                <h3 className="text-xl font-bold text-white mb-4">{titles[state.status]}</h3>
                <div className="flex justify-center my-8">
                    <FingerprintIcon status={state.status} />
                </div>
                <p className="text-gray-300 min-h-[40px]">{state.message}</p>
            </div>
        </div>
    );
};

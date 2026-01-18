
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface GodModeContextType {
    isGodMode: boolean;
    activateGodMode: () => void;
    deactivateGodMode: () => void;
}

const GodModeContext = createContext<GodModeContextType | undefined>(undefined);

export const GodModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isGodMode, setIsGodMode] = useState(false);

    const activateGodMode = () => setIsGodMode(true);
    const deactivateGodMode = () => setIsGodMode(false);

    return (
        <GodModeContext.Provider value={{ isGodMode, activateGodMode, deactivateGodMode }}>
            {children}
        </GodModeContext.Provider>
    );
};

export const useGodMode = () => {
    const context = useContext(GodModeContext);
    if (context === undefined) {
        throw new Error('useGodMode must be used within a GodModeProvider');
    }
    return context;
};

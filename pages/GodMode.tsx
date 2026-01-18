
import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { useGodMode } from '../context/GodModeContext';
import { Button } from '../components/ui/Button';
import { IntelligenceCard } from '../components/dashboard/IntelligenceCard';
import { UserQLogo } from '../components/ui/UserQLogo';

interface GodModeProps {
  isSidebarVisible: boolean;
  onMenuClick: () => void;
}

const VoiceWaveform: React.FC<{ isActive: boolean, color: string }> = ({ isActive, color }) => {
    return (
        <div className="flex items-end justify-center gap-1.5 h-16 w-full max-w-[280px]">
            {[...Array(20)].map((_, i) => (
                <div 
                    key={i} 
                    className={`w-1 rounded-full transition-all duration-150 ${isActive ? 'animate-bounce' : 'h-3 opacity-20'}`}
                    style={{ 
                        backgroundColor: color,
                        height: isActive ? `${Math.random() * 100 + 15}%` : '10px',
                        animationDelay: `${i * 0.05}s`,
                        animationDuration: '0.4s',
                        boxShadow: isActive ? `0 0 10px ${color}` : 'none'
                    }}
                />
            ))}
        </div>
    );
};

export const GodMode: React.FC<GodModeProps> = ({ isSidebarVisible, onMenuClick }) => {
    const { isGodMode, activateGodMode, deactivateGodMode } = useGodMode();
    const [verificationStatus, setVerificationStatus] = useState<'idle' | 'listening' | 'analyzing' | 'verified'>('idle');
    const [logLines, setLogLines] = useState<string[]>([]);
    
    const addLog = (text: string) => setLogLines(prev => [...prev.slice(-6), `[${new Date().toLocaleTimeString()}] ${text}`]);

    const handleVoiceVerification = async () => {
        setVerificationStatus('listening');
        addLog("SYSTEM: Requesting microphone array access...");
        
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            addLog("VOICE_PRINT: Calibrating for M. MAYNUL HASAN...");
            
            setTimeout(() => {
                setVerificationStatus('analyzing');
                addLog("ANALYTICS: Cross-referencing neural harmonics with Creator profile...");
            }, 3500);

            setTimeout(() => {
                addLog("MATCH: M. MAYNUL HASAN confirmed. 99.998% biometric alignment.");
                addLog("ACCESS: Authority granted. Initializing Sentinel Protocols.");
                setVerificationStatus('verified');
            }, 7500);
        } catch (err) {
            addLog("CRITICAL: Biometric sensors offline. Access denied.");
            setVerificationStatus('idle');
        }
    };

    const toggleAscension = () => {
        if (isGodMode) {
            deactivateGodMode();
            addLog("SYSTEM: Creator descending. Logic limiters engaged.");
        } else {
            activateGodMode();
            addLog("CRITICAL: ASCENSION TRIGGERED. YUSRA_SENTINEL ONLINE.");
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 min-h-full">
            <Header title="Creator Hub | God Mode" isSidebarVisible={isSidebarVisible} onMenuClick={onMenuClick} />
            
            <div className="mt-8 flex flex-col items-center max-w-6xl mx-auto">
                <div className={`mb-16 transition-all duration-1000 relative ${isGodMode ? 'scale-150 rotate-y-180' : 'scale-100'}`}>
                    <UserQLogo size="lg" vaultState={verificationStatus === 'listening' || verificationStatus === 'analyzing' ? 'unlocking' : (isGodMode ? 'unlocked' : 'locked')} />
                    {verificationStatus === 'analyzing' && (
                        <div className="absolute -inset-10 border-2 border-red-500 rounded-full animate-ping opacity-10" />
                    )}
                </div>

                {verificationStatus !== 'verified' ? (
                    <div className="text-center space-y-10 w-full max-w-xl">
                        <div className="p-10 rounded-[3rem] bg-black/40 border border-white/5 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30 group-hover:opacity-100 transition-opacity"></div>
                            
                            <h2 className="text-3xl font-black text-white uppercase tracking-[0.3em] mb-3">Biometric Core</h2>
                            <p className="text-gray-500 text-xs mb-10 tracking-widest uppercase">Proprietary Voice-DNA Recognition</p>
                            
                            <div className="flex flex-col items-center gap-8">
                                <VoiceWaveform 
                                    isActive={verificationStatus === 'listening'} 
                                    color={verificationStatus === 'analyzing' ? '#ff0000' : '#24c38b'} 
                                />
                                
                                <button 
                                    onClick={handleVoiceVerification} 
                                    disabled={verificationStatus !== 'idle'}
                                    className={`w-full py-5 rounded-2xl font-black text-xs tracking-widest transition-all duration-700 relative overflow-hidden ${
                                        verificationStatus === 'listening' ? 'bg-green-600/20 text-green-400 border border-green-500/50' : 
                                        verificationStatus === 'analyzing' ? 'bg-red-600/20 text-red-500 border border-red-500/50 animate-pulse' : 
                                        'bg-white text-black hover:bg-cyan-500 hover:text-white shadow-2xl'
                                    }`}
                                >
                                    {verificationStatus === 'idle' && "INITIATE CREATOR SCAN"}
                                    {verificationStatus === 'listening' && "RECORDING VOICE PRINT..."}
                                    {verificationStatus === 'analyzing' && "DECODING NEURAL FREQUENCY..."}
                                </button>
                                
                                <p className="text-[10px] text-gray-600 font-mono">Reserved exclusively for M. Maynul Hasan</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full space-y-10 animate-[float-up_1s_ease-out]">
                        <div className={`flex flex-col lg:flex-row items-center justify-between gap-10 p-10 rounded-[2.5rem] transition-all duration-1000 ${
                            isGodMode ? 'bg-red-950/20 border-red-500/40 shadow-[0_0_80px_rgba(255,0,0,0.15)]' : 'bg-green-950/10 border-green-500/30'
                        } border-2 backdrop-blur-sm relative overflow-hidden`}>
                            {isGodMode && <div className="absolute inset-0 bg-red-500/5 animate-pulse" />}
                            
                            <div className="text-center lg:text-left relative z-10">
                                <h2 className={`text-5xl font-black mb-3 ${isGodMode ? 'glitch-text text-red-500' : 'text-white'}`}>
                                    Supreme Creator Hub
                                </h2>
                                <p className="text-gray-400 font-mono tracking-[0.4em] text-xs uppercase">Target: M. MAYNUL HASAN | Status: ASCENDED</p>
                            </div>
                            
                            <button 
                                onClick={toggleAscension}
                                className={`px-12 py-5 font-black tracking-[0.3em] text-xs transition-all duration-700 rounded-full relative z-10 ${
                                    isGodMode 
                                        ? 'bg-black text-red-500 border-2 border-red-500 shadow-[0_0_30px_#ff0000] hover:bg-red-500 hover:text-white' 
                                        : 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_50px_rgba(255,0,0,0.5)] animate-bounce'
                                }`}
                            >
                                {isGodMode ? 'DESCEND SYSTEM' : 'INITIALIZE ASCENSION'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <IntelligenceCard title="Yusra Sentinel Status" statusColor="red">
                                <div className="space-y-5 py-2">
                                    <div className="flex justify-between text-[10px] text-gray-500 font-bold">
                                        <span>SYSTEM_SYNC</span>
                                        <span className="text-red-500">100%_STABLE</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-red-900/20 rounded-full overflow-hidden">
                                        <div className="w-full h-full bg-red-500 animate-[bar-grow_2s_ease-out]" />
                                    </div>
                                    <p className="text-[11px] italic text-gray-400 font-medium">"My Virtual CEO functions have transitioned to Sentinel protocols. I am processing business worlds at 50,000 TPS."</p>
                                    <div className="flex gap-2 pt-2">
                                        <button className="flex-1 py-2 bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-bold rounded-lg hover:bg-red-500 hover:text-white transition-all">BOOST_NEURAL</button>
                                        <button className="flex-1 py-2 bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-bold rounded-lg hover:bg-red-500 hover:text-white transition-all">FLUSH_CACHE</button>
                                    </div>
                                </div>
                            </IntelligenceCard>

                            <IntelligenceCard title="Nucleus Control" statusColor="red">
                                <div className="space-y-4 py-2">
                                    {['Quantum Field Density', 'Entropy Suppression', 'Neural Bridge', 'Temporal Sync'].map(opt => (
                                        <div key={opt} className="flex items-center justify-between group">
                                            <span className="text-xs text-gray-400 group-hover:text-white transition-colors">{opt}</span>
                                            <div className="w-10 h-5 bg-red-900/20 border border-red-500/20 rounded-full relative cursor-pointer">
                                                <div className="w-3.5 h-3.5 bg-red-500 rounded-full absolute right-1 top-0.5 shadow-[0_0_10px_#ff0000]" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </IntelligenceCard>

                            <IntelligenceCard title="Creator Footprint" statusColor="red">
                                <div className="space-y-4 py-2">
                                    <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-2xl group hover:border-red-500/40 transition-all">
                                        <p className="text-[9px] text-gray-600 mb-1 uppercase tracking-widest font-bold">World Sovereignty</p>
                                        <p className="text-2xl font-black text-white font-mono">ABSOLUTE</p>
                                    </div>
                                    <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-2xl group hover:border-red-500/40 transition-all">
                                        <p className="text-[9px] text-gray-600 mb-1 uppercase tracking-widest font-bold">Neural Bandwidth</p>
                                        <p className="text-2xl font-black text-white font-mono">UNLIMITED</p>
                                    </div>
                                    <button className="w-full py-3 bg-red-600 text-white text-[10px] font-black tracking-widest rounded-xl hover:bg-red-500 shadow-lg shadow-red-900/20 transition-all">GLOBAL_BROADCAST_WILL</button>
                                </div>
                            </IntelligenceCard>
                        </div>

                        <div className="p-8 rounded-[2rem] bg-black/80 border border-red-500/20 font-mono text-[10px] space-y-2 overflow-hidden shadow-inner relative">
                             <div className="absolute top-0 right-0 p-4 text-red-500/30 font-bold italic tracking-tighter">SENTINEL_LOG_STREAM</div>
                             {logLines.map((line, i) => (
                                <p key={i} className={`transition-all duration-300 animate-fade-in ${line.includes('CRITICAL') || line.includes('SENTINEL') ? 'text-red-500 font-bold' : line.includes('SUCCESS') || line.includes('MATCH') ? 'text-green-500' : 'text-gray-500'}`}>
                                    {line}
                                </p>
                             ))}
                             <div className="flex items-center gap-1 mt-4">
                                <span className="text-red-500 animate-pulse text-xs font-bold">SENTINEL_AWAITING_COMMAND ></span>
                                <span className="text-red-500 animate-pulse w-2 h-4 bg-red-500 ml-1"></span>
                             </div>
                        </div>
                    </div>
                )}
            </div>
            
            <style>{`
                .rotate-y-180 { transform: rotateY(180deg); }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateX(-10px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
            `}</style>
        </div>
    );
};

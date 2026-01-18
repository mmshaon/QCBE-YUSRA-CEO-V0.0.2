
import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { IntelligenceCard } from '../../components/dashboard/IntelligenceCard';
import { UserQLogo } from '../../components/ui/UserQLogo';
import { Button } from '../../components/ui/Button';

export const BioVault: React.FC<{ isSidebarVisible: boolean; onMenuClick: () => void }> = ({ isSidebarVisible, onMenuClick }) => {
  const [isScanning, setIsScanning] = useState(false);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="Biometric Engine" isSidebarVisible={isSidebarVisible} onMenuClick={onMenuClick} />
      
      <div className="mt-12 flex flex-col items-center">
         <div className={`relative mb-16 transition-all duration-1000 ${isScanning ? 'scale-110 shadow-[0_0_100px_#00f6ff44]' : 'scale-100'}`}>
            <UserQLogo size="lg" vaultState={isScanning ? 'unlocking' : 'locked'} />
            {isScanning && (
                <div className="absolute inset-0 border-4 border-cyan-400 rounded-full animate-ping opacity-20" />
            )}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-500 text-black text-[9px] font-black uppercase rounded-full shadow-lg">Bio-Hash Locked</div>
         </div>

         <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
            <IntelligenceCard title="Liveness Matrix" statusColor="blue">
               <div className="p-4 space-y-4">
                  <div className="aspect-square bg-black/40 rounded-3xl border border-white/5 flex flex-col items-center justify-center relative group overflow-hidden">
                     <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                     <svg xmlns="http://www.w3.org/2000/svg" className={`h-24 w-24 text-cyan-400 transition-transform duration-500 ${isScanning ? 'scale-110' : 'scale-100'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                     <p className="mt-4 text-[10px] font-black uppercase text-gray-500 tracking-[0.3em]">Face Geometry Analysis</p>
                  </div>
                  <Button 
                    onClick={() => setIsScanning(!isScanning)} 
                    className={`w-full py-4 text-[10px] font-black uppercase tracking-widest ${isScanning ? 'bg-red-600' : 'bg-cyan-500'} text-white shadow-xl transition-all`}
                  >
                     {isScanning ? 'Terminate Scan' : 'Initialize Liveness Test'}
                  </Button>
               </div>
            </IntelligenceCard>

            <div className="space-y-6">
               <IntelligenceCard title="Privacy-First Hashing" statusColor="purple">
                  <div className="p-4 space-y-3 text-[11px] text-gray-400 leading-relaxed italic">
                     "Biometric templates never leave your local hardware. We generate a one-way mathematical hash combined with your Root Password salt. Not even the Creator can see your actual face data."
                  </div>
               </IntelligenceCard>
               <div className="p-8 rounded-[2rem] bg-[#1C202A] border border-white/5 space-y-4 shadow-xl">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Enrollment Status</h3>
                  <div className="space-y-3">
                     {[
                        { label: 'Fingerprint (FIDO2)', status: 'Active', color: 'text-green-400' },
                        { label: 'Face ID (Passkey)', status: 'Active', color: 'text-green-400' },
                        { label: 'Voice DNA', status: 'Pending', color: 'text-amber-400' },
                     ].map(item => (
                        <div key={item.label} className="flex justify-between items-center p-3 bg-black/20 rounded-xl">
                           <span className="text-xs text-gray-300">{item.label}</span>
                           <span className={`text-[10px] font-black uppercase ${item.color}`}>{item.status}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

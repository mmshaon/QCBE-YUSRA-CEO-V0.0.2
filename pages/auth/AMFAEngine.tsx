
import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { IntelligenceCard } from '../../components/dashboard/IntelligenceCard';
import { CircularGauge } from '../../components/charts/CircularGauge';
import { useGodMode } from '../../context/GodModeContext';
import { YusraIcon } from '../../components/ui/YusraIcon';
// FIX: Import the Button component to resolve reference errors.
import { Button } from '../../components/ui/Button';

export const AMFAEngine: React.FC<{ isSidebarVisible: boolean; onMenuClick: () => void }> = ({ isSidebarVisible, onMenuClick }) => {
  const { isGodMode } = useGodMode();
  const [riskScore, setRiskScore] = useState(12);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="AMFA Engine" isSidebarVisible={isSidebarVisible} onMenuClick={onMenuClick} />
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <IntelligenceCard title="Live Risk Score" statusColor={riskScore > 50 ? 'red' : 'green'}>
           <div className="flex flex-col items-center justify-center h-full space-y-4">
              <CircularGauge value={riskScore} color={riskScore > 50 ? '#f95c5c' : '#24c38b'} />
              <p className={`text-sm font-black uppercase ${riskScore > 50 ? 'text-red-400' : 'text-green-400'}`}>
                 {riskScore > 50 ? 'Intervention Required' : 'Secure Session'}
              </p>
              <div className="grid grid-cols-3 gap-2 w-full text-center">
                 <div className="text-[8px] p-2 bg-black/20 rounded">IP: Trust</div>
                 <div className="text-[8px] p-2 bg-black/20 rounded">GEO: Safe</div>
                 <div className="text-[8px] p-2 bg-black/20 rounded">HW: Verified</div>
              </div>
           </div>
        </IntelligenceCard>

        <div className="lg:col-span-2 space-y-6">
           <h2 className="text-xl font-black uppercase tracking-widest text-white/80">Anomaly Sentinel Feed</h2>
           <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {[
                { time: '2m ago', event: 'Impossible Travel Detected', user: 'Alex Rivera', risk: 85 },
                { time: '14m ago', event: 'Tor Exit Node Login Attempt', user: 'Unknown', risk: 92 },
                { time: '1h ago', event: 'New Device Registration', user: 'M. Maynul Hasan', risk: 15 },
              ].map((log, i) => (
                <div key={i} className="p-4 bg-[#1C202A] border border-white/5 rounded-2xl flex items-center justify-between group hover:border-red-500/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${log.risk > 50 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                       {log.risk}
                    </div>
                    <div>
                       <h4 className="text-sm font-bold text-white">{log.event}</h4>
                       <p className="text-xs text-gray-500">{log.user} • {log.time}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white/5 text-[10px] font-black uppercase rounded-lg hover:bg-white/10 text-gray-400">Details</button>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="mt-8">
         <IntelligenceCard title="Yusra Interrogation Challenge" statusColor="purple">
            <div className="p-6 flex flex-col lg:flex-row items-center gap-10">
               <div className="flex-1 space-y-4">
                  <h3 className="text-lg font-bold text-white">Dynamic AI Challenge</h3>
                  <p className="text-xs text-gray-400 leading-relaxed italic">
                     "When risk exceeds threshold 70, I will step in to challenge the user with a real-time behavioral questionnaire. If they fail to provide the correct personal context, I will sever the Quantum Tether immediately."
                  </p>
                  <div className="flex gap-4">
                     <Button className="text-[10px] font-black px-8">Enable AI Guard</Button>
                     <Button variant="secondary" className="text-[10px] font-black px-8">Configure Logic</Button>
                  </div>
               </div>
               <div className="w-48 h-48 bg-gradient-to-br from-[#7a5cff] to-[#00f6ff] rounded-[3rem] flex items-center justify-center p-8 shadow-[0_0_50px_rgba(122,92,255,0.3)]">
                  <YusraIcon className="w-full h-full text-white" />
               </div>
            </div>
         </IntelligenceCard>
      </div>
    </div>
  );
};

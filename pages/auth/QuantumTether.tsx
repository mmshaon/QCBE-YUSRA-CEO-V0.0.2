
import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { IntelligenceCard } from '../../components/dashboard/IntelligenceCard';
import { Button } from '../../components/ui/Button';

export const QuantumTether: React.FC<{ isSidebarVisible: boolean; onMenuClick: () => void }> = ({ isSidebarVisible, onMenuClick }) => {
  const [activeSessions, setActiveSessions] = useState([
    { id: '1', device: 'Desktop - Windows 11', ip: '192.168.1.1', location: 'Riyadh, SA', status: 'Connected', since: '2h ago' },
    { id: '2', device: 'iPhone 15 Pro', ip: '172.20.10.1', location: 'Dammam, SA', status: 'Live', since: '45m ago' },
  ]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="Quantum Tether" isSidebarVisible, onMenuClick={onMenuClick} />
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
           <section>
              <h2 className="text-xl font-black uppercase tracking-widest text-white/80 mb-6">Live Socket Sessions</h2>
              <div className="space-y-4">
                 {activeSessions.map(session => (
                    <div key={session.id} className="p-6 bg-[#1C202A] border border-white/5 rounded-[2.5rem] flex items-center justify-between group hover:border-cyan-400/30 transition-all shadow-xl">
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-gray-400">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                             </svg>
                          </div>
                          <div>
                             <h4 className="text-lg font-bold text-white mb-1">{session.device}</h4>
                             <p className="text-xs text-gray-500">{session.ip} • {session.location} • {session.since}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-4">
                          <span className="text-[10px] font-black uppercase text-green-400 animate-pulse">{session.status}</span>
                          <Button variant="danger" size="sm" className="text-[10px] uppercase font-black">Sever Tether</Button>
                       </div>
                    </div>
                 ))}
              </div>
           </section>

           <section className="p-10 rounded-[3rem] bg-black/40 border border-white/5 backdrop-blur-xl relative overflow-hidden h-[400px]">
              <div className="absolute top-0 left-0 p-8 z-10">
                 <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-widest">Active Geo-Fencing</h3>
                 <p className="text-xs text-gray-500">Only allowing logins within authorized zones.</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-64 h-64 border border-cyan-400/50 rounded-full animate-ping opacity-10" />
                 <div className="w-48 h-48 border border-cyan-400/30 rounded-full animate-pulse opacity-20" />
                 <div className="w-32 h-32 border-2 border-cyan-400/80 rounded-full bg-cyan-400/5 shadow-[0_0_50px_rgba(0,246,255,0.2)]" />
                 <div className="absolute font-mono text-[9px] text-cyan-400/50 uppercase tracking-[0.5em] bottom-10 animate-pulse">Scanning HQ Coordinates</div>
              </div>
           </section>
        </div>

        <div className="space-y-6">
           <IntelligenceCard title="Quantum Handoff" statusColor="blue">
              <div className="p-4 space-y-4">
                 <p className="text-[11px] text-gray-400 italic">"Detected desktop login attempt. Ultrasonic high-frequency token emitted. Verification required on primary Mobile App."</p>
                 <div className="h-20 bg-black/40 rounded-2xl flex items-center justify-center">
                    <div className="flex gap-1">
                       {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-8 bg-cyan-400 animate-pulse" style={{ animationDelay: `${i*0.1}s` }} />)}
                    </div>
                 </div>
              </div>
           </IntelligenceCard>
           
           <IntelligenceCard title="Session DNA" statusColor="purple">
              <div className="p-4 space-y-4 text-[11px] text-gray-400 leading-relaxed">
                 Every session is uniquely bound to hardware UUID. Cookie theft is impossible as the server requires a per-request HMAC signature from the device Secure Enclave.
              </div>
           </IntelligenceCard>
        </div>
      </div>
    </div>
  );
};

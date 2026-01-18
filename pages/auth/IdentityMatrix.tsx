
import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { IntelligenceCard } from '../../components/dashboard/IntelligenceCard';
import { useGodMode } from '../../context/GodModeContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface Persona {
  cubeId: string;
  cubeName: string;
  role: string;
  clearance: 'None' | 'Restricted' | 'Confidential' | 'Top Secret';
}

export const IdentityMatrix: React.FC<{ isSidebarVisible: boolean; onMenuClick: () => void }> = ({ isSidebarVisible, onMenuClick }) => {
  const { isGodMode } = useGodMode();
  const [activeCube, setActiveCube] = useState('QCBE-ROOT');
  
  const personas: Persona[] = [
    { cubeId: 'QCBE-ROOT', cubeName: 'Quantum Root Hub', role: 'Creator', clearance: 'Top Secret' },
    { cubeId: 'ALPHA-9', cubeName: 'Marketing Dept.', role: 'Consultant', clearance: 'Restricted' },
    { cubeId: 'SIGMA-2', cubeName: 'R&D Lab', role: 'Archivist', clearance: 'Confidential' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="Identity Matrix" isSidebarVisible={isSidebarVisible} onMenuClick={onMenuClick} />
      
      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          <section>
             <h2 className="text-xl font-black uppercase tracking-widest text-white/80 mb-6">Polymorphic Personas</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {personas.map(persona => (
                  <div 
                    key={persona.cubeId} 
                    onClick={() => setActiveCube(persona.cubeId)}
                    className={`p-6 rounded-[2.5rem] border cursor-pointer transition-all duration-500 relative overflow-hidden group hover:scale-[1.02] ${activeCube === persona.cubeId ? 'bg-purple-600/20 border-purple-500 shadow-[0_0_40px_rgba(122,92,255,0.3)]' : 'bg-[#1C202A] border-white/5 opacity-60'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <p className="text-[10px] font-black text-purple-400 uppercase mb-1">{persona.cubeId}</p>
                          <h3 className="text-lg font-bold text-white">{persona.cubeName}</h3>
                       </div>
                       <div className={`px-2 py-1 rounded text-[8px] font-black uppercase ${persona.clearance === 'Top Secret' ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-gray-400'}`}>
                          {persona.clearance}
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-xs text-gray-400">Assumed Role:</span>
                       <span className="text-xs font-bold text-white">{persona.role}</span>
                    </div>
                    {activeCube === persona.cubeId && (
                       <div className="absolute bottom-0 right-0 p-4">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                       </div>
                    )}
                  </div>
                ))}
             </div>
          </section>

          <section>
             <IntelligenceCard title="Duress Security (Panic Mode)" statusColor="red">
                <div className="p-4 space-y-6">
                   <p className="text-[11px] text-gray-400 leading-relaxed italic">
                      "If you are forced to log in under threat, use your Duress Password. The system will appear normal but will silently lock all financial assets and notify the Sentinel Supreme."
                   </p>
                   <div className="space-y-4">
                      <Input type="password" placeholder="Set Duress Password" />
                      <div className="flex gap-4">
                         <Button variant="danger" className="flex-1 text-[10px] uppercase font-black">Test Panic Alarm</Button>
                         <Button variant="primary" className="flex-1 text-[10px] uppercase font-black">Update Core</Button>
                      </div>
                   </div>
                </div>
             </IntelligenceCard>
          </section>
        </div>

        <div className="w-full lg:w-96">
           <IntelligenceCard title="Behavioral DNA Profile" statusColor="blue">
              <div className="p-4 space-y-6">
                 <div className="text-center">
                    <div className="text-4xl font-black text-white mb-2">99.9<span className="text-cyan-400">%</span></div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Alignment Confidence</p>
                 </div>
                 <div className="space-y-4">
                    <div className="space-y-1">
                       <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase">
                          <span>Typing Cadence</span>
                          <span className="text-cyan-400">Consistent</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-400 w-[95%]" />
                       </div>
                    </div>
                    <div className="space-y-1">
                       <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase">
                          <span>Navigation Pattern</span>
                          <span className="text-cyan-400">Expected</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-400 w-[88%]" />
                       </div>
                    </div>
                 </div>
                 <button className="w-full py-3 bg-white/5 border border-white/10 text-gray-300 text-[10px] font-black uppercase rounded-xl hover:bg-white/10 transition-all">Re-Calibrate DNA</button>
              </div>
           </IntelligenceCard>
        </div>
      </div>
    </div>
  );
};

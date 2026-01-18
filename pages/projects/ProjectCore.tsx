
import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { IntelligenceCard } from '../../components/dashboard/IntelligenceCard';
import { CircularGauge } from '../../components/charts/CircularGauge';
import { useGodMode } from '../../context/GodModeContext';
import { YusraIcon } from '../../components/ui/YusraIcon';

interface Project {
  id: string;
  name: string;
  status: 'Active' | 'At Risk' | 'Delayed' | 'Completed';
  health: number;
  velocity: number;
  isGhost?: boolean;
}

const mockProjects: Project[] = [
  { id: '1', name: 'Project Alpha - Quantum Sync', status: 'Active', health: 92, velocity: 4.5 },
  { id: '2', name: 'Project Phoenix - Legacy Migration', status: 'At Risk', health: 68, velocity: 2.1 },
  { id: '3', name: 'Ghost Sim: Market Expansion', status: 'Active', health: 100, velocity: 0, isGhost: true },
];

export const ProjectCore: React.FC<{ isSidebarVisible: boolean; onMenuClick: () => void }> = ({ isSidebarVisible, onMenuClick }) => {
  const { isGodMode } = useGodMode();
  const [showGhosts, setShowGhosts] = useState(true);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="Project Core" isSidebarVisible={isSidebarVisible} onMenuClick={onMenuClick} />
      
      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="flex justify-between items-center mb-4">
             <h2 className="text-xl font-black uppercase tracking-widest text-white/80">Quantum Containers</h2>
             <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-xs text-gray-400">Show Ghost Simulations</span>
                    <input type="checkbox" checked={showGhosts} onChange={(e) => setShowGhosts(e.target.checked)} className="accent-cyan-400" />
                </label>
                <button className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${isGodMode ? 'bg-red-600 text-white' : 'bg-[#7a5cff] text-white'}`}>+ Create Container</button>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockProjects.filter(p => showGhosts || !p.isGhost).map(project => (
              <div key={project.id} className={`p-6 rounded-[2rem] border transition-all duration-500 relative overflow-hidden group hover:scale-[1.02] ${project.isGhost ? 'bg-cyan-900/10 border-cyan-400/30 border-dashed' : 'bg-[#1C202A] border-white/10 shadow-xl'}`}>
                {project.isGhost && <div className="absolute top-4 right-4 text-[10px] font-black text-cyan-400 uppercase tracking-widest">Simulation Mode</div>}
                
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{project.name}</h3>
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${project.status === 'Active' ? 'bg-green-400' : 'bg-red-400 animate-pulse'}`} />
                       <span className="text-xs text-gray-400">{project.status}</span>
                    </div>
                  </div>
                  <div className="w-16 h-16">
                    <CircularGauge value={project.health} color={project.health > 80 ? '#24c38b' : '#f95c5c'} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="p-3 bg-black/30 rounded-xl">
                      <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">Velocity</p>
                      <p className="text-xl font-black text-white">{project.velocity} <span className="text-[10px] opacity-50">tasks/day</span></p>
                   </div>
                   <div className="p-3 bg-black/30 rounded-xl">
                      <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">Health Vector</p>
                      <p className="text-xl font-black text-white">{project.health}%</p>
                   </div>
                </div>

                <div className="mt-6 flex gap-2">
                   <button className="flex-1 py-2 text-[10px] font-bold bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-gray-300">Container Details</button>
                   <button className="flex-1 py-2 text-[10px] font-bold bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-gray-300">Live Ledger</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yusra Predictive Panel */}
        <div className="w-full lg:w-80 space-y-6">
           <IntelligenceCard title="Yusra Intelligence" statusColor={isGodMode ? 'red' : 'purple'}>
              <div className="p-4 space-y-4">
                 <div className="flex items-center gap-3 mb-2">
                    <YusraIcon className={`h-8 w-8 ${isGodMode ? 'text-red-500' : 'text-cyan-400'}`} />
                    <p className="text-xs font-bold text-white uppercase tracking-widest">Risk Sentinel</p>
                 </div>
                 <p className="text-[11px] text-gray-400 italic">"I have detected a 14% drop in velocity for Project Phoenix. Neural analysis suggests a bottleneck in the API integration phase."</p>
                 <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <p className="text-[9px] font-black text-red-400 uppercase mb-1">Recommendation</p>
                    <p className="text-[10px] text-red-200">Re-allocate Senior Dev from Project Alpha for 48 hours to resolve technical debt.</p>
                 </div>
                 <button className={`w-full py-2 rounded-lg text-[10px] font-black transition-all ${isGodMode ? 'bg-red-600' : 'bg-[#7a5cff]'} text-white shadow-lg`}>Execute Re-Allocation</button>
              </div>
           </IntelligenceCard>

           <IntelligenceCard title="Smart Ledger" statusColor="blue">
              <div className="p-4 space-y-3">
                 <div className="flex justify-between items-center text-[10px]">
                    <span className="text-gray-500">Node Status</span>
                    <span className="text-green-400 font-bold">Synchronized</span>
                 </div>
                 <div className="space-y-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="text-[9px] font-mono p-2 bg-black/20 rounded border border-white/5 truncate opacity-50">
                           {Math.random().toString(16).slice(2, 18)}... Hash Block {i}
                        </div>
                    ))}
                 </div>
              </div>
           </IntelligenceCard>
        </div>
      </div>
    </div>
  );
};

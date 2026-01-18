
import React from 'react';
import { Header } from '../../components/Header';
import { IntelligenceCard } from '../../components/dashboard/IntelligenceCard';
import { useGodMode } from '../../context/GodModeContext';
import { YusraIcon } from '../../components/ui/YusraIcon';

interface Member {
  id: string;
  name: string;
  role: string;
  load: number;
  fatigue: number;
  skills: string[];
}

const mockTeam: Member[] = [
  { id: '1', name: 'M. Maynul Hasan', role: 'Creator / Architect', load: 85, fatigue: 30, skills: ['Strategy', 'AI', 'Architecture'] },
  { id: '2', name: 'Dev Sarah', role: 'Senior Frontend', load: 95, fatigue: 82, skills: ['React', 'Three.js', 'Tailwind'] },
  { id: '3', name: 'Yusra AI', role: 'Virtual CEO', load: 100, fatigue: 0, skills: ['Predictive Analytics', 'Automation', 'Voice DNA'] },
  { id: '4', name: 'Alex Rivera', role: 'Backend Engineer', load: 40, fatigue: 15, skills: ['Go', 'Postgres', 'Redis'] },
];

export const ProjectTeam: React.FC<{ isSidebarVisible: boolean; onMenuClick: () => void }> = ({ isSidebarVisible, onMenuClick }) => {
  const { isGodMode } = useGodMode();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="Project Team" isSidebarVisible={isSidebarVisible} onMenuClick={onMenuClick} />
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black uppercase tracking-widest text-white/80">Neural Network Resource Grid</h2>
            <button className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${isGodMode ? 'bg-red-600 text-white' : 'bg-cyan-500 text-white'}`}>Assign New Resource</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockTeam.map(member => (
            <div key={member.id} className={`p-6 rounded-[2.5rem] border transition-all duration-300 relative group overflow-hidden ${member.id === '3' ? 'bg-gradient-to-br from-[#24c38b]/10 to-[#7a5cff]/10 border-[#24c38b]/30' : 'bg-[#1C202A] border-white/5'}`}>
              <div className="flex items-center gap-4 mb-6">
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg ${member.id === '3' ? 'bg-cyan-400 text-white' : 'bg-white/5 text-gray-400'}`}>
                    {member.id === '3' ? <YusraIcon className="h-10 w-10" /> : member.name[0]}
                 </div>
                 <div>
                    <h3 className="text-sm font-bold text-white">{member.name}</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{member.role}</p>
                 </div>
              </div>

              <div className="space-y-4">
                 <div>
                    <div className="flex justify-between text-[9px] font-black uppercase text-gray-500 mb-1">
                       <span>Utilization Load</span>
                       <span className={member.load > 90 ? 'text-red-400' : 'text-cyan-400'}>{member.load}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full">
                       <div className={`h-full rounded-full transition-all duration-1000 ${member.load > 90 ? 'bg-red-500' : 'bg-cyan-400'}`} style={{ width: `${member.load}%` }} />
                    </div>
                 </div>

                 <div>
                    <div className="flex justify-between text-[9px] font-black uppercase text-gray-500 mb-1">
                       <span>Fatigue Index</span>
                       <span className={member.fatigue > 80 ? 'text-red-400 animate-pulse' : 'text-green-400'}>{member.fatigue}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full">
                       <div className={`h-full rounded-full transition-all duration-1000 ${member.fatigue > 80 ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-green-400'}`} style={{ width: `${member.fatigue}%` }} />
                    </div>
                 </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-1">
                 {member.skills.map(skill => (
                    <span key={skill} className="px-2 py-0.5 bg-black/40 border border-white/10 rounded-full text-[8px] text-gray-400 font-bold uppercase">{skill}</span>
                 ))}
              </div>

              {member.fatigue > 80 && (
                <div className="mt-4 p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-[9px] text-red-200 font-medium">
                   Critical fatigue detected. Yusra recommends mandatory cooling period.
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { Button } from '../../components/ui/Button';
import { YusraIcon } from '../../components/ui/YusraIcon';

interface Member {
  id: string;
  name: string;
  load: number;
  skills: string[];
}

const mockTeam: Member[] = [
  { id: '1', name: 'Dev Sarah', load: 95, skills: ['React', 'Three.js'] },
  { id: '2', name: 'Alex Rivera', load: 40, skills: ['Go', 'Postgres'] },
  { id: '3', name: 'Yusra AI', load: 100, skills: ['Automation'] },
];

export const TaskAssignment: React.FC<{ isSidebarVisible: boolean; onMenuClick: () => void }> = ({ isSidebarVisible, onMenuClick }) => {
  const [urgency, setUrgency] = useState(2);
  const [importance, setImportance] = useState(2);

  const priorityMatrixLabels = {
    urgency: ['Later', 'Soon', 'ASAP', 'Immediate'],
    importance: ['Trivial', 'Minor', 'Major', 'Critical'],
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="Task Assignment" isSidebarVisible={isSidebarVisible} onMenuClick={onMenuClick} />
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 bg-[#1C202A] border border-white/10 rounded-[2.5rem] shadow-2xl">
          <h2 className="text-xl font-black uppercase tracking-widest text-white/80 mb-6">Workload Distribution</h2>
          <div className="space-y-4">
            {mockTeam.map(member => (
              <div key={member.id} className="p-4 bg-white/5 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{member.name}</h4>
                  <div className="flex gap-1 mt-1">{member.skills.map(s => <span key={s} className="text-[8px] bg-black/30 px-2 py-0.5 rounded-full text-gray-400">{s}</span>)}</div>
                </div>
                <div className="w-1/2 flex items-center gap-3">
                  <div className="flex-1 h-2 bg-black/40 rounded-full"><div className={`h-full rounded-full ${member.load > 90 ? 'bg-red-500' : 'bg-green-400'}`} style={{width: `${member.load}%`}}/></div>
                  <span className="text-xs font-mono w-12 text-right">{member.load}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-8 bg-[#1C202A] border border-white/10 rounded-[2.5rem] shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <YusraIcon className="h-6 w-6 text-cyan-400" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/80">Yusra Smart Assign</h3>
          </div>
          <p className="text-xs text-gray-400 italic mb-6">"Based on current workload and skill matrix for 'Backend API Task', I recommend Alex Rivera. Dev Sarah's fatigue index is critical."</p>
          <Button className="w-full text-[10px] font-black">Accept Suggestion & Assign</Button>
        </div>
      </div>

      <div className="mt-8 p-8 bg-[#1C202A] border border-white/10 rounded-[2.5rem] shadow-2xl">
        <h2 className="text-xl font-black uppercase tracking-widest text-white/80 mb-6">Priority Matrix</h2>
        <div className="flex items-center gap-8">
          <div className="flex-1 grid grid-cols-4 grid-rows-4 gap-2 aspect-square relative">
            {/* Labels */}
            <div className="absolute -top-8 left-0 right-0 flex justify-around text-[9px] text-gray-500 uppercase"><span>Low</span><span>Importance</span><span>High</span></div>
            <div className="absolute -left-12 top-0 bottom-0 flex flex-col justify-around text-[9px] text-gray-500 uppercase writing-mode-vertical-rl rotate-180"><span>Low</span><span>Urgency</span><span>High</span></div>
            {/* Grid */}
            {[...Array(16)].map((_, i) => {
              const x = i % 4;
              const y = 3 - Math.floor(i / 4);
              const isActive = x === importance && y === urgency;
              return (
                <button 
                  key={i}
                  onClick={() => { setImportance(x); setUrgency(y); }}
                  className={`w-full h-full rounded-md transition-all duration-200 ${isActive ? 'bg-purple-500 scale-110 shadow-2xl shadow-purple-900/50' : 'bg-white/5 hover:bg-white/10'}`}
                />
              );
            })}
          </div>
          <div className="w-64 text-center">
             <p className="text-lg font-bold text-white">Selected Priority</p>
             <p className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 my-2">{priorityMatrixLabels.importance[importance]}</p>
             <p className="text-sm text-gray-400">&</p>
             <p className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 my-2">{priorityMatrixLabels.urgency[urgency]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

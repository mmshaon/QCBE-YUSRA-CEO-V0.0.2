
import React from 'react';
import { Header } from '../../components/Header';
import { useGodMode } from '../../context/GodModeContext';

interface Task {
  id: string;
  title: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Todo' | 'Progress' | 'Review' | 'Done';
}

const mockTasks: Task[] = [
  { id: '1', title: 'Neural Engine Optimization', priority: 'Critical', status: 'Progress' },
  { id: '2', title: 'Database Indexing Strategy', priority: 'High', status: 'Todo' },
  { id: '3', title: 'Frontend Glassmorphism Refinement', priority: 'Medium', status: 'Review' },
  { id: '4', title: 'CI/CD Pipeline Fix', priority: 'Critical', status: 'Done' },
];

export const ProjectViews: React.FC<{ isSidebarVisible: boolean; onMenuClick: () => void }> = ({ isSidebarVisible, onMenuClick }) => {
  const { isGodMode } = useGodMode();

  const columns: Task['status'][] = ['Todo', 'Progress', 'Review', 'Done'];
  const priorities: Task['priority'][] = ['Critical', 'High', 'Medium', 'Low'];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="Project Views" isSidebarVisible={isSidebarVisible} onMenuClick={onMenuClick} />
      
      <div className="mt-8 overflow-x-auto scrollbar-hide">
        <div className="flex justify-between items-center mb-6 px-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-white/80">The Quantum Board</h2>
            <div className="flex gap-2">
               <span className="text-[10px] text-gray-500 uppercase font-bold px-3 py-1 bg-white/5 rounded-full border border-white/10">Y-Axis: Priority</span>
               <span className="text-[10px] text-gray-500 uppercase font-bold px-3 py-1 bg-white/5 rounded-full border border-white/10">X-Axis: Status</span>
            </div>
        </div>

        <div className="grid grid-cols-4 gap-6 min-w-[1000px] h-[800px] p-4 bg-black/20 rounded-[3rem] border border-white/5 relative">
          {/* Vertical Priority Markers */}
          <div className="absolute left-[-40px] top-0 bottom-0 flex flex-col justify-between py-12 pointer-events-none">
             {priorities.map(p => (
                <div key={p} className="text-[8px] font-black uppercase text-gray-600 rotate-[-90deg] whitespace-nowrap">{p}</div>
             ))}
          </div>

          {columns.map(col => (
            <div key={col} className="flex flex-col gap-4 relative">
              <div className="text-center p-3 bg-white/5 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{col}</div>
              
              <div className="flex-1 relative flex flex-col justify-between py-4">
                {/* Visual grid lines for priorities */}
                {priorities.map((_, i) => (
                    <div key={i} className="absolute w-full h-px bg-white/5" style={{ top: `${(i / (priorities.length - 1)) * 100}%` }} />
                ))}

                {/* Render tasks positioned by priority */}
                {mockTasks.filter(t => t.status === col).map(task => {
                    const priorityIndex = priorities.indexOf(task.priority);
                    const topPos = `${(priorityIndex / (priorities.length - 1)) * 100}%`;
                    
                    return (
                        <div 
                            key={task.id} 
                            className={`absolute w-full p-4 rounded-2xl border transition-all duration-300 hover:scale-105 cursor-pointer shadow-xl backdrop-blur-md z-10
                                ${task.priority === 'Critical' ? 'bg-red-500/20 border-red-500/40 shadow-red-900/20' : 'bg-white/5 border-white/10'}
                            `}
                            style={{ top: topPos, transform: 'translateY(-50%)' }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${task.priority === 'Critical' ? 'bg-red-400 animate-pulse' : 'bg-cyan-400'}`} />
                                <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">{task.priority}</span>
                            </div>
                            <p className="text-xs font-bold text-white leading-relaxed">{task.title}</p>
                            <div className="mt-4 flex justify-between items-center">
                               <div className="flex -space-x-2">
                                  <div className="w-5 h-5 rounded-full bg-gray-700 border border-white/10 flex items-center justify-center text-[7px]">M</div>
                                  <div className="w-5 h-5 rounded-full bg-cyan-400 border border-white/10 flex items-center justify-center text-[7px] text-white">Y</div>
                               </div>
                               <span className="text-[8px] font-mono text-gray-600">ID: Q-{task.id}</span>
                            </div>
                        </div>
                    );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

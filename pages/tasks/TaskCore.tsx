
import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Button } from '../../components/ui/Button';
import { YusraIcon } from '../../components/ui/YusraIcon';
import { taskApi } from '../../services/api';
import { Task } from '../../shared/types';

const TaskRow: React.FC<{ task: Task; level: number }> = ({ task, level }) => {
  const [isExpanded, setIsExpanded] = useState(level < 1);
  const hasSubTasks = task.subTasks && task.subTasks.length > 0;

  const statusStyles = {
    'Queued': 'bg-gray-500/20 text-gray-400',
    'In Progress': 'bg-sky-500/20 text-sky-400 animate-pulse',
    'Blocked': 'bg-red-500/20 text-red-400',
    'Review': 'bg-amber-500/20 text-amber-400',
    'Done': 'bg-green-500/20 text-green-400 opacity-60',
  };

  return (
    <>
      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
        <td className="p-4" style={{ paddingLeft: `${level * 2 + 1}rem` }}>
          <div className="flex items-center gap-3">
            {hasSubTasks && (
              <button onClick={() => setIsExpanded(!isExpanded)} className="p-1 rounded-full hover:bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            )}
            <span className={`font-medium ${task.status === 'Done' ? 'line-through text-gray-500' : 'text-white'}`}>{task.title}</span>
          </div>
        </td>
        <td className="p-4 text-center">
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusStyles[task.status] || 'bg-gray-500'}`}>{task.status}</span>
        </td>
        <td className="p-4 text-center text-xs text-gray-400">{task.projectId}</td>
        <td className="p-4 text-right">
          <Button variant="secondary" size="sm">Details</Button>
        </td>
      </tr>
      {isExpanded && hasSubTasks && task.subTasks!.map(sub => <TaskRow key={sub.id} task={sub} level={level + 1} />)}
    </>
  );
};

export const TaskCore: React.FC<{ isSidebarVisible: boolean; onMenuClick: () => void }> = ({ isSidebarVisible, onMenuClick }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    const data = await taskApi.getTasks();
    setTasks(data);
    setLoading(false);
  };

  const handleCreateTask = async () => {
    const newTask: Task = {
      id: `T-${Date.now()}`,
      projectId: 'P1',
      title: 'New Dynamic Task Packet',
      status: 'Queued',
      priority: 'Medium'
    };
    await taskApi.createTask(newTask);
    loadTasks();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="Task Core" isSidebarVisible={isSidebarVisible} onMenuClick={onMenuClick} />
      
      <div className="mt-8 p-6 bg-[#1C202A] border border-white/10 rounded-[2.5rem] shadow-2xl relative min-h-[500px]">
        {loading && <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-20 flex items-center justify-center rounded-[2.5rem]">
           <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black uppercase tracking-widest text-white/80">Quantum Packets</h2>
          <div className="flex items-center gap-3">
             <Button variant="secondary" className="group">
                <YusraIcon className="h-4 w-4 mr-2 text-cyan-400 group-hover:animate-spin" />
                <span className="text-[10px] font-black">Yusra Auto-Decomposition</span>
             </Button>
             <Button 
               className="text-[10px] font-black"
               onClick={handleCreateTask}
             >
               + Create Task Packet
             </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">Task Title</th>
                <th className="p-3 text-sm font-semibold text-gray-400 uppercase tracking-wider text-center">Status</th>
                <th className="p-3 text-sm font-semibold text-gray-400 uppercase tracking-wider text-center">Project Link</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => <TaskRow key={task.id} task={task} level={0} />)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { ContentTabs, Tab } from '../../components/ui/ContentTabs';

const tabs: Tab[] = [
  { id: 'my_tasks', label: 'My Tasks' },
  { id: 'kanban', label: 'Kanban' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'gantt', label: 'Gantt Chart' },
];

const MyTasksView = () => (
    <div className="p-4 bg-black/20 rounded-2xl">
        <h3 className="text-lg font-bold text-white mb-4">Your Priority Queue</h3>
        {['Finalize ad creatives', 'Book media placements'].map(task => (
            <div key={task} className="p-3 bg-white/5 rounded-lg mb-2 text-sm text-gray-300">{task}</div>
        ))}
    </div>
);

const KanbanView = () => {
    const columns = ['Queued', 'In Progress', 'Review', 'Done'];
    return (
        <div className="grid grid-cols-4 gap-6">
            {columns.map(col => (
                <div key={col} className="bg-black/20 rounded-2xl p-4">
                    <h3 className="text-sm font-bold text-center text-gray-400 uppercase tracking-widest mb-4">{col}</h3>
                    <div className="space-y-3">
                        {/* Mock tasks */}
                        {col === 'In Progress' && <div className="p-3 bg-white/5 rounded-lg text-xs">Book media placements</div>}
                        {col === 'Review' && <div className="p-3 bg-white/5 rounded-lg text-xs">Finalize ad creatives</div>}
                    </div>
                </div>
            ))}
        </div>
    );
}

const GanttChartView = () => {
    const tasks = [
        { name: 'Task 1', start: 0, duration: 4, deps: [] },
        { name: 'Task 2', start: 2, duration: 5, deps: [] },
        { name: 'Task 3', start: 5, duration: 6, deps: [2] },
    ];
    return (
        <div className="p-4 bg-black/20 rounded-2xl space-y-4">
            {tasks.map((task, i) => (
                <div key={i} className="flex items-center">
                    <div className="w-32 text-xs text-gray-400 truncate">{task.name}</div>
                    <div className="flex-1 h-6 bg-white/5 rounded-full relative">
                        <div 
                            className="absolute h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                            style={{ left: `${task.start * 10}%`, width: `${task.duration * 10}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

const CalendarView = () => (
    <div className="p-4 bg-black/20 rounded-2xl h-96 text-center text-gray-500">
        Calendar View Coming Soon
    </div>
);

export const TaskViews: React.FC<{ isSidebarVisible: boolean; onMenuClick: () => void }> = ({ isSidebarVisible, onMenuClick }) => {
  const [activeTab, setActiveTab] = useState('kanban');

  const renderContent = () => {
    switch(activeTab) {
        case 'my_tasks': return <MyTasksView />;
        case 'kanban': return <KanbanView />;
        case 'calendar': return <CalendarView />;
        case 'gantt': return <GanttChartView />;
        default: return null;
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="Task Views" isSidebarVisible={isSidebarVisible} onMenuClick={onMenuClick} />
      
      <div className="mt-8">
        <ContentTabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
        <div className="mt-6">
            {renderContent()}
        </div>
      </div>
    </div>
  );
};

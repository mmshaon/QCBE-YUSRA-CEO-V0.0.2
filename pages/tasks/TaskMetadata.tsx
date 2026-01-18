
import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { YusraIcon } from '../../components/ui/YusraIcon';
import { ContentTabs, Tab } from '../../components/ui/ContentTabs';

const tabs: Tab[] = [
  { id: 'comments', label: 'Comments' },
  { id: 'attachments', label: 'Attachments' },
  { id: 'activity', label: 'Immutable Log' },
];

export const TaskMetadata: React.FC<{ isSidebarVisible: boolean; onMenuClick: () => void }> = ({ isSidebarVisible, onMenuClick }) => {
  const [activeTab, setActiveTab] = useState('comments');

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="Task Metadata" isSidebarVisible={isSidebarVisible} onMenuClick={onMenuClick} />
      
      <div className="mt-8 p-8 bg-[#1C202A] border border-white/10 rounded-[2.5rem] shadow-2xl">
        <div className="border-b border-white/10 pb-6 mb-6">
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">T1-1 / Project Alpha</p>
          <h2 className="text-2xl font-bold text-white mt-1">Finalize ad creatives</h2>
        </div>
        
        <ContentTabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />

        <div className="mt-6">
          {activeTab === 'comments' && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white">M</div>
                <div>
                  <p className="text-sm font-semibold text-white">M. Maynul Hasan</p>
                  <div className="mt-1 p-3 bg-white/5 rounded-lg text-xs text-gray-300">Hey @Sarah, can we get an update on this? The client is asking for the final proofs.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 ml-8">
                 <div className="w-10 h-10 bg-cyan-500 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white">S</div>
                 <div>
                   <p className="text-sm font-semibold text-white">Dev Sarah</p>
                   <div className="mt-1 p-3 bg-white/5 rounded-lg text-xs text-gray-300">Just uploaded the final versions to Attachments. Ready for review!</div>
                 </div>
              </div>
               <div className="flex gap-3 pt-4 border-t border-white/5">
                  <Input placeholder="Add a comment... (@mention)" />
                  <Button>Comment</Button>
               </div>
            </div>
          )}
          {activeTab === 'attachments' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <div className="p-4 bg-white/5 rounded-xl text-center flex flex-col items-center justify-center aspect-square">
                  <p className="text-3xl mb-2">📄</p><p className="text-[10px] text-gray-300 truncate">Final_Ad_v3.pdf</p>
               </div>
               <div className="p-4 bg-white/5 rounded-xl text-center flex flex-col items-center justify-center aspect-square border-2 border-dashed border-white/10 hover:border-purple-500 cursor-pointer">
                  <p className="text-3xl mb-2">+</p><p className="text-[10px] text-gray-500">Add File</p>
               </div>
            </div>
          )}
          {activeTab === 'activity' && (
            <div className="font-mono text-xs space-y-2 text-gray-500">
               <p><span className="text-green-400">[2024-07-29 10:15:03]</span> USER:Sarah STATUS: In Progress -> Review</p>
               <p><span className="text-green-400">[2024-07-28 16:45:12]</span> USER:Maynul COMMENT: Added request for update</p>
               <p><span className="text-green-400">[2024-07-28 09:01:55]</span> SYSTEM: Task created by Maynul</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

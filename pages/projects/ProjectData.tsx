
import React from 'react';
import { Header } from '../../components/Header';
import { IntelligenceCard } from '../../components/dashboard/IntelligenceCard';
import { BarChart } from '../../components/charts/BarChart';
import { CircularGauge } from '../../components/charts/CircularGauge';
import { useGodMode } from '../../context/GodModeContext';

export const ProjectData: React.FC<{ isSidebarVisible: boolean; onMenuClick: () => void }> = ({ isSidebarVisible, onMenuClick }) => {
  const { isGodMode } = useGodMode();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="Project Data" isSidebarVisible={isSidebarVisible} onMenuClick={onMenuClick} />
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <IntelligenceCard title="CPI (Cost Index)" kpiValue={1.08} statusColor="green">
           <div className="h-full flex flex-col justify-center">
              <div className="w-full bg-white/5 rounded-full h-2 mb-2">
                 <div className="bg-green-400 h-full rounded-full" style={{ width: '85%' }} />
              </div>
              <p className="text-[10px] text-gray-500 italic">"Budget efficiency is optimal. 8% under planned cost."</p>
           </div>
        </IntelligenceCard>

        <IntelligenceCard title="SPI (Schedule Index)" kpiValue={0.82} statusColor="red">
           <div className="h-full flex flex-col justify-center">
              <div className="w-full bg-white/5 rounded-full h-2 mb-2">
                 <div className="bg-red-400 h-full rounded-full" style={{ width: '60%' }} />
              </div>
              <p className="text-[10px] text-gray-500 italic">"Project is 18% behind schedule. Reviewing velocity."</p>
           </div>
        </IntelligenceCard>

        <IntelligenceCard title="Earned Value" kpiValue={85000} kpiUnit="SAR" statusColor="blue">
           <CircularGauge value={75} color="#00f6ff" />
        </IntelligenceCard>

        <IntelligenceCard title="Projected Burn" kpiValue={12500} kpiUnit="SAR/wk" statusColor="purple">
           <div className="h-full flex items-end justify-center gap-1">
              {[40, 60, 50, 80, 70, 90, 85].map((h, i) => (
                  <div key={i} className="w-2 bg-purple-500 rounded-t-sm" style={{ height: `${h}%` }} />
              ))}
           </div>
        </IntelligenceCard>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="p-8 bg-[#1C202A] border border-white/10 rounded-[2.5rem] shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest">Planned vs Actual Cost (SAR)</h3>
            <BarChart data={[
                { name: 'Jan', value: 45000 },
                { name: 'Feb', value: 52000 },
                { name: 'Mar', value: 48000 },
                { name: 'Apr', value: 61000 },
                { name: 'May', value: 55000 },
            ]} />
         </div>

         <div className="p-8 bg-[#1C202A] border border-white/10 rounded-[2.5rem] shadow-2xl space-y-6">
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest">Budget Dilation Alert</h3>
            <div className="p-6 bg-amber-500/10 border border-amber-500/30 rounded-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform" />
               <p className="text-xs text-amber-200 font-bold mb-2 uppercase tracking-widest">Caution: High Volatility</p>
               <p className="text-sm text-amber-100 leading-relaxed italic">"Projected timeline extension of 3 weeks will result in a 42,000 SAR budget dilation. Yusra suggests immediate scope culling in Module 12 to maintain runway."</p>
               <button className="mt-4 px-6 py-2 bg-amber-500 text-black font-black text-[10px] rounded-full uppercase tracking-widest hover:bg-amber-400 transition-all">Simulate Scope Cut</button>
            </div>
         </div>
      </div>
    </div>
  );
};

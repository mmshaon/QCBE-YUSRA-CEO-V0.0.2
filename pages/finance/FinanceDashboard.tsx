import React from 'react';
import { Header } from '../../components/Header';
import { IntelligenceCard } from '../../components/dashboard/IntelligenceCard';
import { BarChart } from '../../components/charts/BarChart';
import { MiniLineChart } from '../../components/charts/MiniLineChart';
import { YusraIcon } from '../../components/ui/YusraIcon';
import { AnimatedNumber } from '../../components/ui/AnimatedNumber';
// FIX: Import the Button component to resolve reference errors.
import { Button } from '../../components/ui/Button';

export const FinanceDashboard: React.FC<{ isSidebarVisible: boolean; onMenuClick: () => void }> = ({ isSidebarVisible, onMenuClick }) => {
  const agingData = [
    { name: '0-30d', value: 75000 },
    { name: '31-60d', value: 42000 },
    { name: '61-90d', value: 15000 },
    { name: '90d+', value: 8000 },
  ];
  
  const cashFlowData = [30, 25, 35, 30, 45, 40, 55, 50, 65];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="Finance Dashboard" isSidebarVisible={isSidebarVisible} onMenuClick={onMenuClick} />
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <IntelligenceCard title="Monthly Burn Rate" kpiValue={45000} kpiUnit="SAR" statusColor="red">
            <p className="text-[10px] text-gray-500 p-2 italic">"Current burn rate projects a 12-month runway."</p>
        </IntelligenceCard>
        <IntelligenceCard title="Gross Profit Margin" kpiValue={62} kpiUnit="%" statusColor="green">
            <MiniLineChart data={[55, 58, 60, 62, 61, 62]} color="#A0F85A" />
        </IntelligenceCard>
        <IntelligenceCard title="Net Profit Margin" kpiValue={28} kpiUnit="%" statusColor="green">
             <MiniLineChart data={[25, 26, 25, 28, 27, 28]} color="#A0F85A" />
        </IntelligenceCard>
        <IntelligenceCard title="Open Invoices" kpiValue={18} statusColor="purple">
            <div className="h-full flex items-center justify-center text-6xl font-black text-white">
                <AnimatedNumber value={18} />
            </div>
        </IntelligenceCard>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <IntelligenceCard title="Accounts Receivable Aging" statusColor="blue" fullWidth>
            <BarChart data={agingData} />
          </IntelligenceCard>
        </div>
        <div className="lg:col-span-2">
           <IntelligenceCard title="Yusra's Financial Sentinel" statusColor="red">
              <div className="p-4 space-y-4">
                 <div className="flex items-center gap-3">
                    <YusraIcon className="h-8 w-8 text-red-500" />
                    <p className="text-xs font-bold text-white uppercase tracking-widest">ANOMALY DETECTED</p>
                 </div>
                 <p className="text-[11px] text-gray-400 italic">
                   "A new software subscription for 'Pixelate Pro' for 8,000 SAR was processed under the Marketing budget. This expenditure was not in the Q3 forecast. Is this an authorized purchase, Creator?"
                 </p>
                 <div className="flex gap-2">
                    <Button size="sm" variant="primary" className="flex-1 text-[10px] font-bold">Authorize Purchase</Button>
                    <Button size="sm" variant="danger" className="flex-1 text-[10px] font-bold">Flag as Fraud</Button>
                 </div>
              </div>
           </IntelligenceCard>
        </div>
      </div>
    </div>
  );
};
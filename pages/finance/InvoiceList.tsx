
import React, { useState, useMemo, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { AnimatedNumber } from '../../components/ui/AnimatedNumber';
import { financeApi } from '../../services/api';
import { Invoice } from '../../shared/types';

export const InvoiceList: React.FC<{ isSidebarVisible: boolean; onMenuClick: () => void }> = ({ isSidebarVisible, onMenuClick }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filter, setFilter] = useState<'All' | Invoice['status']>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    setLoading(true);
    const data = await financeApi.getInvoices();
    setInvoices(data);
    setLoading(false);
  };

  const handleApprove = async (id: string) => {
    await financeApi.approveInvoice(id);
    loadInvoices(); // Refresh state
  };

  const filteredInvoices = useMemo(() => {
    return invoices
      .filter(inv => filter === 'All' || inv.status === filter)
      .filter(inv => 
        inv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        inv.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [invoices, filter, searchTerm]);
  
  const totals = useMemo(() => {
      const outstanding = invoices.filter(i => i.status === 'Pending' || i.status === 'Overdue').reduce((sum, i) => sum + i.amount, 0);
      const overdue = invoices.filter(i => i.status === 'Overdue').reduce((sum, i) => sum + i.amount, 0);
      return { outstanding, overdue };
  }, [invoices]);

  const statusBadgeMap = {
      Paid: 'Approved',
      Pending: 'Pending',
      Overdue: 'Rejected',
      Draft: 'Inactive'
  } as const;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="Invoice List" isSidebarVisible={isSidebarVisible} onMenuClick={onMenuClick} />
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="p-6 bg-gradient-to-br from-green-500/10 to-transparent rounded-2xl border border-green-500/20">
            <p className="text-xs font-bold text-green-400 uppercase tracking-widest">Total Outstanding</p>
            <p className="text-3xl font-black text-white mt-2">SAR <AnimatedNumber value={totals.outstanding} /></p>
         </div>
         <div className="p-6 bg-gradient-to-br from-amber-500/10 to-transparent rounded-2xl border border-amber-500/20">
            <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">Active Invoices</p>
            <p className="text-3xl font-black text-white mt-2"><AnimatedNumber value={invoices.length} /></p>
         </div>
         <div className="p-6 bg-gradient-to-br from-red-500/10 to-transparent rounded-2xl border border-red-500/20">
            <p className="text-xs font-bold text-red-400 uppercase tracking-widest">Total Overdue</p>
            <p className="text-3xl font-black text-white mt-2">SAR <AnimatedNumber value={totals.overdue} /></p>
         </div>
      </div>
      
      <div className="mt-8 p-6 bg-[#1C202A] border border-white/10 rounded-[2.5rem] shadow-2xl relative min-h-[400px]">
        {loading && <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-20 flex items-center justify-center rounded-[2.5rem]">
           <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>}

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex-1 w-full md:w-auto">
            <Input 
                placeholder="Search by client or invoice ID..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {(['All', 'Pending', 'Paid', 'Overdue', 'Draft'] as const).map(f => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-full transition-all whitespace-nowrap ${filter === f ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
              >{f}</button>
            ))}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">Invoice #</th>
                <th className="p-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">Client</th>
                <th className="p-3 text-sm font-semibold text-gray-400 uppercase tracking-wider text-right">Amount (SAR)</th>
                <th className="p-3 text-sm font-semibold text-gray-400 uppercase tracking-wider text-center">Due Date</th>
                <th className="p-3 text-sm font-semibold text-gray-400 uppercase tracking-wider text-center">Status</th>
                <th className="p-3 text-sm font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map(inv => (
                <tr key={inv.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono text-xs text-cyan-400">{inv.id}</td>
                  <td className="p-4 font-semibold text-white">{inv.clientName}</td>
                  <td className="p-4 font-mono text-right text-white">{inv.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
                  <td className="p-4 text-center text-gray-300">{inv.dueDate}</td>
                  <td className="p-4 text-center"><Badge status={statusBadgeMap[inv.status]} /></td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <Button variant="secondary" size="sm" className="text-[10px] font-bold">Details</Button>
                    {inv.status === 'Pending' && (
                       <Button 
                         size="sm" 
                         className="text-[10px] font-bold"
                         onClick={() => handleApprove(inv.id)}
                       >
                         Approve
                       </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredInvoices.length === 0 && !loading && (
            <div className="p-20 text-center text-gray-500 italic">No invoices found matching criteria.</div>
          )}
        </div>
      </div>
    </div>
  );
};

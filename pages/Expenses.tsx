
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Button } from '../components/ui/Button';
import { Badge, StatusType as ExpenseStatus } from '../components/ui/Badge';
import { ExpenseFormModal } from '../components/ExpenseFormModal';

export interface Expense {
    id: number;
    submitter: string;
    date: string;
    total: number;
    status: ExpenseStatus;
    hasReceipt?: boolean;
}

const mockExpenses: Expense[] = [
  { id: 1, submitter: 'M. Maynul Hasan', date: '2023-11-24', total: 150.75, status: 'Approved', hasReceipt: true },
  { id: 2, submitter: 'Jane Doe', date: '2023-11-23', total: 89.99, status: 'Pending', hasReceipt: false },
  { id: 3, submitter: 'John Smith', date: '2023-11-22', total: 450.00, status: 'Rejected', hasReceipt: true },
  { id: 4, submitter: 'M. Maynul Hasan', date: '2023-11-21', total: 32.50, status: 'Approved', hasReceipt: true },
  { id: 5, submitter: 'Emily White', date: '2023-11-20', total: 1200.00, status: 'Pending', hasReceipt: false },
];

interface ExpensesProps {
  isSidebarVisible: boolean;
  onMenuClick: () => void;
}

export const Expenses: React.FC<ExpensesProps> = ({ isSidebarVisible, onMenuClick }) => {
    const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNewExpense = (expenseData: Omit<Expense, 'id' | 'status'>) => {
        const newExpense: Expense = {
            id: Date.now(),
            ...expenseData,
            status: 'Pending',
        };
        setExpenses([newExpense, ...expenses]);
    };

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8">
        <Header title="Expenses" isSidebarVisible={isSidebarVisible} onMenuClick={onMenuClick} />
        <div className="mt-8 rounded-2xl bg-[#1C202A] border border-white/10 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Expense Reports</h3>
            <Button onClick={() => setIsModalOpen(true)}>Submit New Expense</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-3 text-sm font-semibold text-gray-400">Submitter</th>
                  <th className="p-3 text-sm font-semibold text-gray-400">Date</th>
                  <th className="p-3 text-sm font-semibold text-gray-400">Total (SAR)</th>
                  <th className="p-3 text-sm font-semibold text-gray-400 text-center">Receipt</th>
                  <th className="p-3 text-sm font-semibold text-gray-400 text-center">Status</th>
                  <th className="p-3 text-sm font-semibold text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="p-3 font-semibold text-white">{expense.submitter}</td>
                    <td className="p-3 text-gray-300">{expense.date}</td>
                    <td className="p-3 text-white font-mono">{expense.total.toFixed(2)}</td>
                    <td className="p-3">
                        <div className="flex items-center justify-center">
                            {expense.hasReceipt ? (
                                <div className="text-cyan-400 hover:text-cyan-300 cursor-help transition-colors" title="View Receipt">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                    </svg>
                                </div>
                            ) : (
                                <span className="text-gray-600">—</span>
                            )}
                        </div>
                    </td>
                    <td className="p-3 text-center"><Badge status={expense.status} /></td>
                    <td className="p-3 text-right"><Button variant="secondary" size="sm">View Details</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ExpenseFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewExpense}
      />
    </>
  );
};


import { ledger } from '../db/QuantumLedger';
import { Invoice, Task, Project } from '../shared/types';

export const fetchDashboardData = async () => {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 800));
  
  const invoices = await ledger.getInvoices();
  const tasks = await ledger.getTasks();
  const projects = await ledger.getProjects();

  const totalOutstanding = invoices
    .filter(i => i.status === 'Pending' || i.status === 'Overdue')
    .reduce((sum, i) => sum + i.amount, 0);

  return {
    strategic: {
      revenue: { value: totalOutstanding + 48500, history: [30, 40, 45, 50, 49, 60, 70, 91, 125] },
      profitMargin: { value: 42 },
      runway: { value: 18 },
      growth: { value: 12.5 },
    },
    sales: {
      pipeline: {
        value: 1280000,
        stages: [
          { label: 'Leads', value: 100 },
          { label: 'Qualified', value: 60 },
          { label: 'Proposal', value: 30 },
          { label: 'Won', value: 15 },
        ],
      },
      conversionRate: { value: 3.4, trendValue: 0.2 },
      marketShare: { value: 25 },
    },
    customer: {
      cac: { value: 320, trendValue: 15 },
      ltv: { value: 1950, components: [{ value: 800, label: 'Initial' }, { value: 1150, label: 'Repeat' }] },
      ltvCacRatio: { ltv: 6.1, cac: 1 },
      nps: { value: 8.2 },
    },
    operations: {
      projectDelivery: { value: Math.floor((tasks.filter(t => t.status === 'Done').length / (tasks.length || 1)) * 100) },
      productivity: {
        teams: [{ label: 'Eng', value: 90 }, { label: 'Sales', value: 75 }, { label: 'Support', value: 82 }],
      },
      spending: {
        departments: [
          { name: 'Marketing', value: 4000 }, { name: 'Sales', value: 3000 }, { name: 'Engineering', value: 5000 },
          { name: 'HR', value: 2780 }, { name: 'Support', value: 1890 }, { name: 'Ops', value: 2390 },
        ],
      },
    },
    risk: {
      alerts: [
        { id: 1, text: 'Cash Runway below 6 months threshold.' },
        { id: 2, text: 'Key Project "Phoenix" is delayed by 2 weeks.' },
        { id: 3, text: 'High server CPU usage detected.' },
      ],
      matrix: [
        { name: 'Supply Chain', prob: 4, impact: 5 }, { name: 'Competitor', prob: 3, impact: 4 },
        { name: 'Talent', prob: 2, impact: 5 }, { name: 'Cyber', prob: 5, impact: 3 },
        { name: 'Regulatory', prob: 2, impact: 2 },
      ],
    },
  };
};

export const financeApi = {
  getInvoices: () => ledger.getInvoices(),
  approveInvoice: (id: string) => ledger.updateInvoiceStatus(id, 'Paid'),
};

export const taskApi = {
  getTasks: () => ledger.getTasks(),
  createTask: (task: Task) => ledger.addTask(task),
};

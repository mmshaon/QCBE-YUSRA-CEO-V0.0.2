import { Project, Task, Invoice, User } from '../shared/types';

class QuantumLedger {
  private storageKey = 'QCBE_DATA_STORE';

  private data: {
    projects: Project[];
    tasks: Task[];
    invoices: Invoice[];
    users: User[];
  };

  constructor() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      this.data = JSON.parse(saved);
    } else {
      // FIX: Seed data assignment now correctly typed via getSeedData return signature
      this.data = this.getSeedData();
      this.save();
    }
  }

  private save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.data));
  }

  // FIX: Explicitly typed return value to prevent TypeScript from inferring string unions as generic strings
  private getSeedData(): {
    projects: Project[];
    tasks: Task[];
    invoices: Invoice[];
    users: User[];
  } {
    return {
      projects: [
        { id: 'P1', name: 'Project Alpha - Quantum Sync', status: 'Active', health: 92, velocity: 4.5 },
        { id: 'P2', name: 'Project Phoenix - Legacy Migration', status: 'At Risk', health: 68, velocity: 2.1 }
      ],
      tasks: [
        { id: 'T1', projectId: 'P1', title: 'Neural Engine Optimization', status: 'In Progress', priority: 'Critical' },
        { id: 'T2', projectId: 'P1', title: 'Database Indexing Strategy', status: 'Queued', priority: 'High' }
      ],
      invoices: [
        { id: 'INV-001', clientId: 'C1', clientName: 'Quantum Dynamics', amount: 15000, dueDate: '2024-08-15', status: 'Pending' },
        { id: 'INV-002', clientId: 'C2', clientName: 'Stellar Solutions', amount: 7500, dueDate: '2024-07-20', status: 'Paid' }
      ],
      users: [
        { id: 'U1', name: 'M. Maynul Hasan', email: 'maynul@creator.com', role: 'Creator', status: 'Active' }
      ]
    };
  }

  // API Simulation
  async getInvoices() { return this.data.invoices; }
  async getTasks() { return this.data.tasks; }
  async getProjects() { return this.data.projects; }

  async updateInvoiceStatus(id: string, status: Invoice['status']) {
    const inv = this.data.invoices.find(i => i.id === id);
    if (inv) {
      inv.status = status;
      this.save();
    }
    return inv;
  }

  async addTask(task: Task) {
    this.data.tasks.push(task);
    this.save();
    return task;
  }
}

export const ledger = new QuantumLedger();

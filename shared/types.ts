
export type Status = 'Pending' | 'Approved' | 'Rejected' | 'Active' | 'Inactive' | 'Delayed' | 'At Risk' | 'Completed' | 'Queued' | 'In Progress' | 'Blocked' | 'Review' | 'Done';

export interface Project {
  id: string;
  name: string;
  status: 'Active' | 'At Risk' | 'Delayed' | 'Completed';
  health: number;
  velocity: number;
  isGhost?: boolean;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  status: 'Queued' | 'In Progress' | 'Blocked' | 'Review' | 'Done';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  assigneeId?: string;
  subTasks?: Task[];
}

export interface Invoice {
  id: string;
  clientId: string;
  clientName: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Draft';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Pending';
}

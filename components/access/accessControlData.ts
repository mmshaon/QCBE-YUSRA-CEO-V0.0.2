
export interface Role {
    id: string;
    name: string;
    description: string;
}

export const roles: Role[] = [
    { id: 'creator', name: 'Creator', description: 'Full system access. Can manage all cubes and system settings.' },
    { id: 'manager', name: 'Manager', description: 'Can manage projects, tasks, and approve invoices within their department.' },
    { id: 'member', name: 'Member', description: 'Can view projects and manage their own assigned tasks.' },
    { id: 'guest', name: 'Guest', description: 'Read-only access to specific, non-confidential projects.' },
];

export const modulePermissions = {
    'creator': {
        'Project Management': { create: true, view: true, edit: true, delete: true },
        'Task Management': { create: true, view: true, edit: true, delete: true },
        'Invoice & Finance': { create: true, view: true, edit: true, delete: true, approve: true },
        'Client Management': { create: true, view: true, edit: true, delete: true },
        'Asset Management': { create: true, view: true, edit: true, delete: true },
        'Reporting & Analytics': { view: true, export: true },
    },
    'manager': {
        'Project Management': { create: true, view: true, edit: true, delete: false },
        'Task Management': { create: true, view: true, edit: true, delete: false },
        'Invoice & Finance': { create: true, view: true, edit: false, delete: false, approve: true },
        'Client Management': { create: true, view: true, edit: true, delete: false },
        'Asset Management': { create: true, view: true, edit: true, delete: false },
        'Reporting & Analytics': { view: true, export: true },
    },
    'member': {
        'Project Management': { create: false, view: true, edit: false, delete: false },
        'Task Management': { create: true, view: true, edit: true, delete: false },
        'Invoice & Finance': { create: true, view: true, edit: false, delete: false, approve: false },
        'Client Management': { create: false, view: true, edit: false, delete: false },
        'Asset Management': { create: false, view: true, edit: false, delete: false },
        'Reporting & Analytics': { view: true, export: false },
    },
    'guest': {
        'Project Management': { create: false, view: true, edit: false, delete: false },
        'Task Management': { create: false, view: false, edit: false, delete: false },
        'Invoice & Finance': { create: false, view: false, edit: false, delete: false, approve: false },
        'Client Management': { create: false, view: false, edit: false, delete: false },
        'Asset Management': { create: false, view: false, edit: false, delete: false },
        'Reporting & Analytics': { view: false, export: false },
    },
};

export const abacPolicies = [
    { 
        id: 1, 
        name: 'Manager Invoice Approval Limit',
        description: 'Allows managers to approve invoices up to 5000 SAR within their own department.',
        rule: {
            subject: { attribute: 'user.role', operator: 'is', value: 'Manager' },
            action: 'approve',
            resource: { attribute: 'invoice.amount', operator: '<=', value: 5000 },
            context: { attribute: 'user.department', operator: 'matches', value: 'resource.department' },
        }
    },
    { 
        id: 2, 
        name: 'Confidential Project Access',
        description: 'Only users with "Top Secret" clearance can view projects marked as "Confidential".',
        rule: {
            subject: { attribute: 'user.clearance', operator: 'is', value: 'Top Secret' },
            action: 'view',
            resource: { attribute: 'project.confidentiality', operator: 'is', value: 'Confidential' },
        }
    },
     { 
        id: 3, 
        name: 'Block Access Outside Office Hours',
        description: 'Restricts access to financial modules for non-manager roles outside of 9 AM - 5 PM.',
        rule: {
            subject: { attribute: 'user.role', operator: 'isNot', value: 'Manager' },
            action: 'access',
            resource: { attribute: 'module', operator: 'in', value: ['Finance', 'Invoices'] },
            context: { attribute: 'time', operator: 'between', value: ['09:00', '17:00'] },
        }
    },
];

export type FieldPermissionLevel = 'Editable' | 'View Only' | 'Hidden';

export const fieldPermissionsData: Record<string, { field: string; description: string; permissions: Record<string, FieldPermissionLevel> }[]> = {
    'Invoices': [
        { field: 'Invoice ID', description: 'Unique identifier for the invoice.', permissions: { creator: 'Editable', manager: 'View Only', member: 'View Only', guest: 'Hidden' } },
        { field: 'Client Name', description: 'The client associated with the invoice.', permissions: { creator: 'Editable', manager: 'View Only', member: 'View Only', guest: 'Hidden' } },
        { field: 'Total Amount', description: 'The total monetary value of the invoice.', permissions: { creator: 'Editable', manager: 'View Only', member: 'View Only', guest: 'Hidden' } },
        { field: 'Discount Amount', description: 'Any discount applied to the invoice total.', permissions: { creator: 'Editable', manager: 'Editable', member: 'Hidden', guest: 'Hidden' } },
        { field: 'Internal Notes', description: 'Confidential notes for the finance team.', permissions: { creator: 'Editable', manager: 'Editable', member: 'Hidden', guest: 'Hidden' } },
    ],
    'Clients': [
        { field: 'Client ID', description: 'Unique identifier for the client.', permissions: { creator: 'Editable', manager: 'View Only', member: 'View Only', guest: 'View Only' } },
        { field: 'Contact Email', description: 'Primary email for client communication.', permissions: { creator: 'Editable', manager: 'Editable', member: 'View Only', guest: 'View Only' } },
        { field: 'Revenue History', description: 'Total historical revenue from the client.', permissions: { creator: 'Editable', manager: 'View Only', member: 'Hidden', guest: 'Hidden' } },
        { field: 'Satisfaction Score', description: 'Internal client satisfaction rating.', permissions: { creator: 'Editable', manager: 'Editable', member: 'Hidden', guest: 'Hidden' } },
    ],
};

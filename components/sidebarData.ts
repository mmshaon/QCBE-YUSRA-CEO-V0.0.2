
export interface Module {
    id: string;
    icon: string;
    color: string;
    submodules?: { id: string }[];
    isQuickAccess?: boolean;
}

export const modules: Module[] = [
    { id: 'Dashboard', icon: 'dashboard', color: 'purple', isQuickAccess: true },
    { id: 'Yusra AI', icon: 'yusra', color: 'cyan', isQuickAccess: true },
    { 
        id: 'Project Management',
        icon: 'projects',
        color: 'orange',
        isQuickAccess: true,
        submodules: [
            { id: 'Project Core' }, { id: 'Project Team' }, { id: 'Project Data' }, { id: 'Project Views' }
        ]
    },
    { 
        id: 'Task Management',
        icon: 'tasks',
        color: 'green',
        isQuickAccess: true,
        submodules: [
            { id: 'Task Core' }, { id: 'Task Assignment' }, { id: 'Task Metadata' }, { id: 'Task Views' }
        ]
    },
    { 
        id: 'Invoice & Finance', 
        icon: 'invoice', 
        color: 'green',
        submodules: [
            { id: 'Invoice List' },
            { id: 'Finance Dashboard' },
            { id: 'Create Invoice' },
            { id: 'Expense Reports' },
        ]
    },
    { 
        id: 'Authentication & Identity', 
        icon: 'auth',
        color: 'cyan',
        submodules: [
            { id: 'Login Methods' }, { id: 'Signup Methods' }, { id: 'Multi-Factor Auth' }, { id: 'Biometric Engine' }, { id: 'Session Management' }
        ]
    },
    { id: 'Access Control', icon: 'access', color: 'red' },
    { id: 'God Mode (Creator)', icon: 'godmode', color: 'yellow' },
    { id: 'Cube (Organization)', icon: 'cube', color: 'blue' },
    { id: 'Client Management', icon: 'clients', color: 'blue' },
    { id: 'Asset Management', icon: 'assets', color: 'cyan' },
    { id: 'Document Management', icon: 'documents', color: 'orange' },
    { id: 'Communication & Messaging', icon: 'messaging', color: 'purple' },
    { id: 'Voice & Audio System', icon: 'voice', color: 'red' },
    { id: 'Video Communication', icon: 'video', color: 'red' },
    { id: 'Virtual Worlds', icon: 'worlds', color: 'purple' },
    { id: 'Yusra Participation', icon: 'yusra', color: 'cyan' },
    { id: 'Notification System', icon: 'notifications', color: 'yellow' },
    { id: 'Reporting & Analytics', icon: 'reporting', color: 'blue' },
    { id: 'Audit & Logging', icon: 'audit', color: 'orange' },
    { id: 'Workflow Automation', icon: 'workflow', color: 'green' },
    { id: 'Distribution System', icon: 'distribution', color: 'blue' },
    { id: 'User Interface Control', icon: 'ui_control', color: 'purple' },
    { id: 'Integration Hub', icon: 'integrations', color: 'cyan' },
    { id: 'Billing & Subscription', icon: 'billing', color: 'green' },
    { id: 'System Settings', icon: 'settings', color: 'gray' },
];

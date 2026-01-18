
import React, { useState } from 'react';
import { ToggleSwitch } from '../ui/ToggleSwitch';
import { YusraIcon } from '../ui/YusraIcon';

interface Permission {
    id: string;
    label: string;
    description: string;
    enabled: boolean;
}

const initialPermissions: Permission[] = [
    { id: 'autoApproveExpenses', label: 'Auto-Approve Expenses', description: 'Allow Yusra to auto-approve expenses under 100 SAR.', enabled: true },
    { id: 'suggestTasks', label: 'Suggest Task Assignments', description: 'Let Yusra suggest team members for new tasks based on workload.', enabled: true },
    { id: 'draftComms', label: 'Draft Client Communications', description: 'Enable Yusra to draft routine emails and messages to clients.', enabled: false },
    { id: 'predictRisks', label: 'Predict Project Risks', description: 'Allow Yusra to analyze project data and flag potential risks.', enabled: true },
];

export const YusraAIPermissions: React.FC = () => {
    const [permissions, setPermissions] = useState<Permission[]>(initialPermissions);

    const handleToggle = (id: string) => {
        setPermissions(
            permissions.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p)
        );
    };

    return (
        <div className="relative rounded-2xl bg-white/5 backdrop-blur-xl p-6 shadow-2xl shadow-black/40 group animated-border">
             <div 
                className="absolute inset-0 transition-all duration-300 opacity-0 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.1), transparent 50%)`
                }}
             />
            <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <YusraIcon className="h-6 w-6 mr-2" />
                    Yusra AI Permission Rules
                </h3>
                <p className="text-sm text-gray-400 mb-6">Set operational boundaries and grant autonomy to your Virtual CEO.</p>
                <ul className="space-y-4">
                    {permissions.map(permission => (
                        <li key={permission.id} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                            <div>
                                <p className="font-semibold text-white">{permission.label}</p>
                                <p className="text-xs text-gray-400">{permission.description}</p>
                            </div>
                            <ToggleSwitch isEnabled={permission.enabled} onToggle={() => handleToggle(permission.id)} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

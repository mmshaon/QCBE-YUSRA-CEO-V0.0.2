
import React, { useState } from 'react';
import { FieldPermissionLevel, Role } from './accessControlData';
import { Select } from '../ui/Select';

interface FieldPermissionsProps {
    roles: Role[];
    fieldPermissionsData: Record<string, { field: string; description: string; permissions: Record<string, FieldPermissionLevel> }[]>;
    setFieldPermissionsData: React.Dispatch<React.SetStateAction<any>>;
}

const PermissionSelector: React.FC<{ level: FieldPermissionLevel; onChange: (level: FieldPermissionLevel) => void }> = ({ level, onChange }) => {
    const levelStyles: Record<FieldPermissionLevel, string> = {
        'Editable': 'bg-green-500/20 text-green-400 border-green-500/30',
        'View Only': 'bg-sky-500/20 text-sky-400 border-sky-500/30',
        'Hidden': 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    
    return (
        <div className="inline-block">
             <select 
                value={level || 'Hidden'} // Fallback for newly created roles
                onChange={(e) => onChange(e.target.value as FieldPermissionLevel)}
                className={`text-xs font-semibold rounded-full border appearance-none text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${levelStyles[level || 'Hidden']}`}
                style={{ padding: '4px 10px' }}
            >
                <option value="Editable">Editable</option>
                <option value="View Only">View Only</option>
                <option value="Hidden">Hidden</option>
            </select>
        </div>
    );
}

export const FieldPermissions: React.FC<FieldPermissionsProps> = ({ roles, fieldPermissionsData, setFieldPermissionsData }) => {
    const [selectedModule, setSelectedModule] = useState('Invoices');

    const handlePermissionChange = (field: string, roleId: string, level: FieldPermissionLevel) => {
        setFieldPermissionsData(prev => ({
            ...prev,
            [selectedModule]: prev[selectedModule].map(item => 
                item.field === field
                ? { ...item, permissions: { ...item.permissions, [roleId]: level } }
                : item
            ),
        }));
    };

    const moduleOptions = Object.keys(fieldPermissionsData).map(m => ({ value: m, label: m }));
    const currentFields = fieldPermissionsData[selectedModule];
    const displayRoles = roles.filter(r => r.id !== 'creator'); // Don't show Creator column, they can see everything

    return (
        <div className="rounded-2xl bg-white/5 p-6 animated-border">
            <h3 className="text-xl font-bold text-white mb-2">Field-Level Permissions</h3>
            <p className="text-sm text-gray-400 mb-6">Define which roles can see or edit specific fields within a module.</p>
            
            <div className="mb-4 max-w-xs">
                <Select
                    value={selectedModule}
                    onChange={(e) => setSelectedModule(e.target.value)}
                    options={moduleOptions}
                />
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-[#2a314e]">
                            <th className="p-3 text-sm font-semibold text-[#b7c0d6] min-w-[200px]">Field Name</th>
                            {displayRoles.map(role => (
                                <th key={role.id} className="p-3 text-sm font-semibold text-[#b7c0d6] capitalize text-center">{role.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentFields.map((item) => (
                            <tr key={item.field} className="border-b border-[#2a314e] hover:bg-[#1f233d]/50">
                                <td className="p-3">
                                    <div className="font-semibold text-white">{item.field}</div>
                                    <div className="text-xs text-gray-400">{item.description}</div>
                                </td>
                                {displayRoles.map(role => (
                                    <td key={role.id} className="p-3 text-center">
                                        <PermissionSelector 
                                            level={item.permissions[role.id]}
                                            onChange={(level) => handlePermissionChange(item.field, role.id, level)}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

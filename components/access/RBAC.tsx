
import React, { useState, useEffect } from 'react';
import { Role } from './accessControlData';
import { ToggleSwitch } from '../ui/ToggleSwitch';
import { Button } from '../ui/Button';
import { RoleEditorModal } from './RoleEditorModal';

interface RBACProps {
    roles: Role[];
    allPermissionsData: any;
    onSaveRole: (role: Role) => void;
    onDeleteRole: (roleId: string) => void;
    onPermissionsChange: (roleId: string, newPermissions: any) => void;
}

export const RBAC: React.FC<RBACProps> = ({ roles, allPermissionsData, onSaveRole, onDeleteRole, onPermissionsChange }) => {
    const [selectedRole, setSelectedRole] = useState(roles.find(r => r.id === 'manager') || roles[0]);
    const [permissions, setPermissions] = useState(allPermissionsData[selectedRole.id]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);

    useEffect(() => {
        setPermissions(allPermissionsData[selectedRole.id]);
    }, [selectedRole, allPermissionsData]);

    const handlePermissionChange = (module: string, permission: string) => {
        setPermissions(prev => ({
            ...prev,
            [module]: {
                ...prev[module],
                [permission]: !prev[module][permission],
            },
        }));
    };
    
    const handleSaveChanges = () => {
        onPermissionsChange(selectedRole.id, permissions);
        alert(`Permissions for ${selectedRole.name} saved!`);
    };

    const handleCreateRole = () => {
        setEditingRole(null);
        setIsModalOpen(true);
    };

    const handleEditRole = (role: Role) => {
        setEditingRole(role);
        setIsModalOpen(true);
    };

    const handleDeleteRole = (role: Role) => {
        if (confirm(`Are you sure you want to delete the role "${role.name}"?`)) {
            onDeleteRole(role.id);
            setSelectedRole(roles[0]); // Fallback to the first role
        }
    }

    const permissionIcons = {
        create: 'M12 9v3m0 0v3m0-3h3m-3 0H9',
        view: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z',
        edit: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
        delete: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
        approve: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        export: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'
    };

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/4">
                    <div className="rounded-2xl bg-white/5 p-4 animated-border">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-white">Roles</h3>
                            <Button size="sm" onClick={handleCreateRole}>New Role</Button>
                        </div>
                        <ul className="space-y-2">
                            {roles.map(role => (
                                <li key={role.id}
                                    onClick={() => setSelectedRole(role)}
                                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 group flex justify-between items-center ${selectedRole.id === role.id ? 'bg-purple-600/50 text-white' : 'hover:bg-white/10'}`}
                                >
                                    <div>
                                        <p className="font-semibold">{role.name}</p>
                                        <p className="text-xs text-gray-400">{role.description}</p>
                                    </div>
                                    {role.id !== 'creator' && (
                                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={(e) => { e.stopPropagation(); handleEditRole(role); }} className="text-gray-400 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                                            <button onClick={(e) => { e.stopPropagation(); handleDeleteRole(role); }} className="text-gray-400 hover:text-red-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="lg:w-3/4">
                    <div className="rounded-2xl bg-white/5 p-6 animated-border">
                        <h3 className="text-xl font-bold text-white mb-2">Permissions for {selectedRole.name}</h3>
                        <p className="text-sm text-gray-400 mb-6">Configure module-level permissions for this role.</p>
                        <div className="space-y-4">
                            {permissions && Object.entries(permissions).map(([moduleName, modulePerms]) => (
                                <div key={moduleName} className="p-4 bg-black/30 rounded-lg">
                                    <h4 className="font-semibold text-white mb-3">{moduleName}</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                        {Object.entries(modulePerms).map(([permName, isEnabled]) => (
                                            <div key={permName} className="flex items-center justify-between p-2 bg-black/20 rounded-md">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={permissionIcons[permName] || 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-1.78-4.125'} /></svg>
                                                    <span className="text-sm capitalize">{permName}</span>
                                                </div>
                                                <ToggleSwitch isEnabled={isEnabled as boolean} onToggle={() => handlePermissionChange(moduleName, permName)} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-end">
                            <Button onClick={handleSaveChanges}>Save Changes</Button>
                        </div>
                    </div>
                </div>
            </div>
            <RoleEditorModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={onSaveRole}
                role={editingRole}
            />
        </>
    );
};


import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { useTranslation } from '../../hooks/useTranslation';

export type Permission = 'view' | 'edit' | 'submit' | 'delete';
export type UserRole = 'Creator' | 'Manager' | 'Member' | 'None';
export type UserStatus = 'Active' | 'Pending' | 'Inactive';

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    permissions: Record<Permission, boolean>;
}

interface UserPermissionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
    onSave: (updatedUser: User) => void;
}

const allRoles: UserRole[] = ['Manager', 'Member', 'None'];
const allPermissions: Permission[] = ['view', 'edit', 'submit', 'delete'];

export const UserPermissionsModal: React.FC<UserPermissionsModalProps> = ({ isOpen, onClose, user, onSave }) => {
    const { t } = useTranslation();
    const [currentUser, setCurrentUser] = useState<User>(user);

    useEffect(() => {
        setCurrentUser(user);
    }, [user]);

    const handlePermissionChange = (permission: Permission) => {
        setCurrentUser(prev => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [permission]: !prev.permissions[permission]
            }
        }));
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentUser(prev => ({ ...prev, role: e.target.value as UserRole }));
    };
    
    const handleApprove = () => {
        const approvedUser: User = { ...currentUser, status: 'Active', role: currentUser.role === 'None' ? 'Member' : currentUser.role };
        onSave(approvedUser);
    }
    
    const handleSave = () => {
        onSave(currentUser);
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`${t('admin.manageUser')}: ${user.name}`}>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{t('admin.role')}</label>
                    <Select
                        value={currentUser.role}
                        onChange={handleRoleChange}
                        options={allRoles.map(r => ({ value: r, label: r }))}
                    />
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-white mb-3">{t('admin.permissions')}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {allPermissions.map(p => (
                            <label key={p} className="flex items-center space-x-3 p-3 bg-[#0f1220] rounded-lg">
                                <input
                                    type="checkbox"
                                    checked={currentUser.permissions[p]}
                                    onChange={() => handlePermissionChange(p)}
                                    className="h-5 w-5 rounded bg-gray-700 border-gray-600 text-purple-600 focus:ring-purple-500"
                                />
                                <span className="text-white capitalize">{t(`admin.${p}`)}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-between items-center">
                 <div>
                    {currentUser.status === 'Pending' && (
                        <Button variant="primary" onClick={handleApprove}>{t('admin.approveUser')}</Button>
                    )}
                 </div>
                 <div className="flex gap-3">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>{t('admin.saveChanges')}</Button>
                </div>
            </div>
        </Modal>
    );
};

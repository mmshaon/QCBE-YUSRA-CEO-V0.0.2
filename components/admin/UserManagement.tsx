
import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useTranslation } from '../../hooks/useTranslation';
import { UserPermissionsModal, User, Permission } from './UserPermissionsModal';

const initialUsers: User[] = [
    { id: 1, name: 'M. Maynul Hasan', email: 'maynul@creator.com', role: 'Creator', status: 'Active', permissions: { view: true, edit: true, submit: true, delete: true } },
    { id: 2, name: 'New User Request', email: 'new.user@example.com', role: 'None', status: 'Pending', permissions: { view: false, edit: false, submit: false, delete: false } },
    { id: 3, name: 'Jane Doe', email: 'jane.doe@example.com', role: 'Manager', status: 'Active', permissions: { view: true, edit: true, submit: true, delete: false } },
    { id: 4, name: 'John Smith', email: 'john.smith@example.com', role: 'Member', status: 'Active', permissions: { view: true, edit: false, submit: true, delete: false } },
];

export const UserManagement: React.FC = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleManageUser = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleSaveChanges = (updatedUser: User) => {
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <>
            <div className="relative rounded-2xl bg-white/5 backdrop-blur-xl p-6 shadow-2xl shadow-black/40 group h-full animated-border">
                <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-4">{t('admin.userManagement')}</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-[#2a314e]">
                                    <th className="p-3 text-sm font-semibold text-[#b7c0d6]">{t('admin.user')}</th>
                                    <th className="p-3 text-sm font-semibold text-[#b7c0d6]">{t('admin.role')}</th>
                                    <th className="p-3 text-sm font-semibold text-[#b7c0d6]">{t('admin.status')}</th>
                                    <th className="p-3 text-sm font-semibold text-[#b7c0d6] text-right">{t('admin.actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-b border-[#2a314e] hover:bg-[#1f233d]">
                                        <td className="p-3">
                                            <div className="font-semibold text-white">{user.name}</div>
                                            <div className="text-xs text-gray-400">{user.email}</div>
                                        </td>
                                        <td className="p-3 text-[#b7c0d6]">{user.role}</td>
                                        <td className="p-3"><Badge status={user.status} /></td>
                                        <td className="p-3 text-right">
                                            <Button variant="secondary" size="sm" onClick={() => handleManageUser(user)}>{t('admin.manage')}</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {selectedUser && (
                <UserPermissionsModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)}
                    user={selectedUser}
                    onSave={handleSaveChanges}
                />
            )}
        </>
    );
};

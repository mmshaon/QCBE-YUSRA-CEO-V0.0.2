
import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Role } from './accessControlData';

interface RoleEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (role: Role) => void;
    role: Role | null; // null for creating a new role
}

export const RoleEditorModal: React.FC<RoleEditorModalProps> = ({ isOpen, onClose, onSave, role }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (role) {
            setName(role.name);
            setDescription(role.description);
        } else {
            setName('');
            setDescription('');
        }
    }, [role, isOpen]);

    const handleSubmit = () => {
        if (!name) {
            alert('Role name is required.');
            return;
        }
        const roleId = role ? role.id : name.toLowerCase().replace(/\s+/g, '-');
        onSave({ id: roleId, name, description });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={role ? 'Edit Role' : 'Create New Role'}>
            <div className="space-y-4">
                <Input 
                    placeholder="Role Name (e.g., Auditor)" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    disabled={!!role} // Can't edit name/id for simplicity
                />
                 {!role && <p className="text-xs text-gray-500">The role ID will be generated from the name and cannot be changed later.</p>}
                <Input 
                    placeholder="Description" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                />
            </div>
            <div className="mt-6 flex justify-end gap-3">
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Save Role</Button>
            </div>
        </Modal>
    );
};


import React, { useState } from 'react';
import { Header } from '../components/Header';
import { ContentTabs, Tab } from '../components/ui/ContentTabs';
import { RBAC } from '../components/access/RBAC';
import { ABAC } from '../components/access/ABAC';
import { FieldPermissions } from '../components/access/FieldPermissions';
import { 
    roles as initialRoles, 
    modulePermissions as initialModulePermissions,
    fieldPermissionsData as initialFieldPermissions,
    Role
} from '../components/access/accessControlData';

interface AccessControlProps {
  isSidebarVisible: boolean;
  onMenuClick: () => void;
}

const tabs: Tab[] = [
    { id: 'rbac', label: 'Role-Based (RBAC)', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
    { id: 'abac', label: 'Attribute-Based (ABAC)', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 19c-3.866 0-7-3.134-7-7s3.134-7 7-7 7 3.134 7 7-3.134 7-7 7zM12 9v4l2 2" /></svg> },
    { id: 'field', label: 'Field-Level Permissions', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg> },
];

export const AccessControl: React.FC<AccessControlProps> = ({ isSidebarVisible, onMenuClick }) => {
    const [activeTab, setActiveTab] = useState<string>('rbac');
    const [roles, setRoles] = useState<Role[]>(initialRoles);
    const [modulePermissions, setModulePermissions] = useState(initialModulePermissions);
    const [fieldPermissions, setFieldPermissions] = useState(initialFieldPermissions);

    const handleSaveRole = (roleToSave: Role) => {
        const isNew = !roles.some(r => r.id === roleToSave.id);
        if (isNew) {
            setRoles([...roles, roleToSave]);
            // Add default (empty) permissions for the new role
            setModulePermissions(prev => {
                const newRolePerms = {};
                Object.keys(prev.creator).forEach(moduleName => {
                    newRolePerms[moduleName] = {};
                    Object.keys(prev.creator[moduleName]).forEach(perm => {
                        newRolePerms[moduleName][perm] = false;
                    });
                });
                return { ...prev, [roleToSave.id]: newRolePerms };
            });
            // Add default field permissions for the new role
            setFieldPermissions(prev => {
                const updated = { ...prev };
                Object.keys(updated).forEach(moduleKey => {
                    updated[moduleKey] = updated[moduleKey].map(field => ({
                        ...field,
                        permissions: { ...field.permissions, [roleToSave.id]: 'Hidden' }
                    }));
                });
                return updated;
            });
        } else {
            setRoles(roles.map(r => r.id === roleToSave.id ? roleToSave : r));
        }
    };

    const handleDeleteRole = (roleId: string) => {
        setRoles(roles.filter(r => r.id !== roleId));
        // Remove permissions
        const newModulePerms = { ...modulePermissions };
        delete newModulePerms[roleId];
        setModulePermissions(newModulePerms);

        const newFieldPerms = { ...fieldPermissions };
        Object.keys(newFieldPerms).forEach(moduleKey => {
            newFieldPerms[moduleKey] = newFieldPerms[moduleKey].map(field => {
                const newPerms = { ...field.permissions };
                delete newPerms[roleId];
                return { ...field, permissions: newPerms };
            });
        });
        setFieldPermissions(newFieldPerms);
    };

    const handleModulePermissionsChange = (roleId: string, newPermissions: any) => {
        setModulePermissions(prev => ({
            ...prev,
            [roleId]: newPermissions
        }));
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'rbac':
                return <RBAC 
                    roles={roles}
                    allPermissionsData={modulePermissions}
                    onSaveRole={handleSaveRole}
                    onDeleteRole={handleDeleteRole}
                    onPermissionsChange={handleModulePermissionsChange}
                />;
            case 'abac':
                return <ABAC />;
            case 'field':
                return <FieldPermissions roles={roles} fieldPermissionsData={fieldPermissions} setFieldPermissionsData={setFieldPermissions}/>;
            default:
                return null;
        }
    };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="Access Control" isSidebarVisible={isSidebarVisible} onMenuClick={onMenuClick} />
      <div className="mt-8">
        <ContentTabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
        <div className="mt-6">
            {renderContent()}
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { Header } from '../components/Header';

interface ClientsProps {
  isSidebarVisible: boolean;
  onMenuClick: () => void;
}

export const Clients: React.FC<ClientsProps> = ({ isSidebarVisible, onMenuClick }) => {
  return (
    <div className="p-8">
      <Header title="Client Management" isSidebarVisible={isSidebarVisible} onMenuClick={onMenuClick} />
      <div className="mt-8 text-center text-[#b7c0d6]">
        Client Management Module - Content Coming Soon
      </div>
    </div>
  );
};

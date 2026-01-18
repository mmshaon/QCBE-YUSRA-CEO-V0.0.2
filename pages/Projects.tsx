
import React from 'react';
import { Header } from '../components/Header';

interface ProjectsProps {
  isSidebarVisible: boolean;
  onMenuClick: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ isSidebarVisible, onMenuClick }) => {
  return (
    <div className="p-8">
      <Header title="Projects" isSidebarVisible={isSidebarVisible} onMenuClick={onMenuClick} />
      <div className="mt-8 text-center text-[#b7c0d6]">
        Project Management Module - Content Coming Soon
      </div>
    </div>
  );
};

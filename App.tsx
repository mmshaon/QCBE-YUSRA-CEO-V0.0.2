
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Clients } from './pages/Clients';
import { AIAssistant } from './pages/AIAssistant';
import { ComingSoon } from './pages/ComingSoon';
import { Expenses } from './pages/Expenses';
import { LanguageProvider } from './context/LanguageContext';
import { LoginPage } from './pages/LoginPage';
import { AccessControl } from './pages/AccessControl';
import { GodModeProvider, useGodMode } from './context/GodModeContext';
import { GodMode } from './pages/GodMode';
import { FloatingYusra } from './components/ui/FloatingYusra';

// Project Management Submodules
import { ProjectCore } from './pages/projects/ProjectCore';
import { ProjectTeam } from './pages/projects/ProjectTeam';
import { ProjectData } from './pages/projects/ProjectData';
import { ProjectViews } from './pages/projects/ProjectViews';

// Task Management Submodules
import { TaskCore } from './pages/tasks/TaskCore';
import { TaskAssignment } from './pages/tasks/TaskAssignment';
import { TaskMetadata } from './pages/tasks/TaskMetadata';
import { TaskViews } from './pages/tasks/TaskViews';

// Finance Submodules
import { InvoiceList } from './pages/finance/InvoiceList';
import { FinanceDashboard } from './pages/finance/FinanceDashboard';

// Authentication Submodules
import { IdentityMatrix } from './pages/auth/IdentityMatrix';
import { AMFAEngine } from './pages/auth/AMFAEngine';
import { BioVault } from './pages/auth/BioVault';
import { QuantumTether } from './pages/auth/QuantumTether';

const AppLayout: React.FC = () => {
  const [activePage, setActivePage] = useState('Dashboard');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const { isGodMode } = useGodMode();

  const renderPage = () => {
    const pageProps = { isSidebarVisible, onMenuClick: () => setIsSidebarVisible(true) };

    switch (activePage) {
      case 'Dashboard':
        return <Dashboard {...pageProps} />;
      // Project Management
      case 'Project Management':
      case 'Project Core':
        return <ProjectCore {...pageProps} />;
      case 'Project Team':
        return <ProjectTeam {...pageProps} />;
      case 'Project Data':
        return <ProjectData {...pageProps} />;
      case 'Project Views':
        return <ProjectViews {...pageProps} />;
      // Task Management
      case 'Task Management':
      case 'Task Core':
        return <TaskCore {...pageProps} />;
      case 'Task Assignment':
        return <TaskAssignment {...pageProps} />;
      case 'Task Metadata':
        return <TaskMetadata {...pageProps} />;
      case 'Task Views':
        return <TaskViews {...pageProps} />;
      // Finance
      case 'Invoice & Finance':
      case 'Invoice List':
        return <InvoiceList {...pageProps} />;
      case 'Finance Dashboard':
        return <FinanceDashboard {...pageProps} />;
      case 'Expense Reports':
        return <Expenses {...pageProps} />;
      // Clients
      case 'Client Management':
        return <Clients {...pageProps} />;
      // AI
      case 'Yusra AI':
        return <AIAssistant {...pageProps} />;
      // Auth & Security
      case 'Authentication & Identity':
      case 'Identity Matrix':
        return <IdentityMatrix {...pageProps} />;
      case 'AMFA Engine':
      case 'Login Methods':
        return <AMFAEngine {...pageProps} />;
      case 'BioVault':
      case 'Biometric Engine':
        return <BioVault {...pageProps} />;
      case 'Quantum Tether':
      case 'Session Management':
        return <QuantumTether {...pageProps} />;
      case 'Access Control':
        return <AccessControl {...pageProps} />;
      // God Mode
      case 'God Mode (Creator)':
        return <GodMode {...pageProps} />;
      default:
        return <ComingSoon pageName={activePage} {...pageProps} />;
    }
  };

  return (
    <div className={`text-[#e6e8f0] font-sans min-h-screen flex transition-colors duration-1000 ${isGodMode ? 'god-mode-active god-mode-bg' : 'bg-[#101418]'}`}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} isVisible={isSidebarVisible} setVisible={setIsSidebarVisible} />
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
        {isGodMode && (
          <div className="absolute inset-0 pointer-events-none z-50">
             <div className="w-full h-1 bg-red-500/30 absolute top-0 animate-[dangerous-scan_4s_linear_infinite]" />
             <div className="w-full h-full neural-bg opacity-30" />
          </div>
        )}
        {renderPage()}
        <FloatingYusra />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <GodModeProvider>
      <LanguageProvider>
        {isAuthenticated ? (
          <AppLayout />
        ) : (
          <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
        )}
      </LanguageProvider>
    </GodModeProvider>
  )
}

export default App;

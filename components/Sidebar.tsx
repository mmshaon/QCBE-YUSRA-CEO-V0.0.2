
import React, { useState, useEffect } from 'react';
import { modules as initialModules, Module } from './sidebarData';
import { YusraIcon } from './ui/YusraIcon';
import { UserQLogo } from './ui/UserQLogo';
import { ModuleIcon } from './ui/ModuleIcons';
import { useGodMode } from '../context/GodModeContext';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  isVisible: boolean;
  setVisible: (visible: boolean) => void;
}

const ChevronDown: React.FC<{ isRotated?: boolean }> = ({ isRotated }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-300 ${isRotated ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const PinIcon: React.FC<{ isPinned: boolean; onClick: (e: React.MouseEvent) => void }> = ({ isPinned, onClick }) => (
    <button 
        onClick={onClick}
        className={`ml-2 p-1 rounded hover:bg-white/10 transition-colors ${isPinned ? 'text-yellow-400 opacity-100' : 'text-gray-500 opacity-0 group-hover:opacity-100'}`}
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill={isPinned ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
    </button>
);

const NavItem: React.FC<{
    module: Module;
    isActive: boolean;
    isChildActive: boolean;
    isExpanded: boolean;
    activePage: string;
    onToggleExpand: () => void;
    onSetActivePage: (page: string) => void;
    isGodMode: boolean;
    isQuick?: boolean;
    onTogglePin: (id: string) => void;
}> = ({ module, isActive, isChildActive, isExpanded, activePage, onToggleExpand, onSetActivePage, isGodMode, isQuick, onTogglePin }) => {
    
    const hasSubmodules = !!module.submodules;
    const effectiveIsActive = isActive || isChildActive;

    const baseItemClass = `flex items-center justify-between w-full text-left p-3 rounded-lg transition-all duration-200 text-sm group ${isQuick ? 'mb-1' : ''}`;
    const activeClass = isGodMode 
        ? "bg-red-600 text-white shadow-lg shadow-red-900/50" 
        : "bg-[#7a5cff] text-white shadow-lg shadow-purple-900/50";
    const inactiveClass = isQuick ? "text-white/80 hover:bg-white/10" : "text-[#b7c0d6] hover:bg-[#2a314e] hover:text-white";
    
    const handleItemClick = () => {
        if (hasSubmodules) {
            onToggleExpand();
        }
        onSetActivePage(module.id);
    };

    return (
        <div>
            <div className="flex items-center group/item">
                <button onClick={handleItemClick} className={`flex-1 ${baseItemClass} ${effectiveIsActive ? activeClass : inactiveClass}`}>
                    <div className="flex items-center">
                        <ModuleIcon iconName={module.icon} color={isGodMode && module.id === 'God Mode (Creator)' ? 'red' : module.color} className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110" />
                        <span className={`${isGodMode && module.id === 'God Mode (Creator)' ? 'glitch-text font-bold' : ''} ${isQuick ? 'font-bold' : ''}`}>{module.id}</span>
                    </div>
                    {hasSubmodules && <ChevronDown isRotated={isExpanded} />}
                </button>
                <PinIcon 
                    isPinned={!!module.isQuickAccess} 
                    onClick={(e) => {
                        e.stopPropagation();
                        onTogglePin(module.id);
                    }} 
                />
            </div>
            {hasSubmodules && isExpanded && (
                <ul className="pl-8 mt-2 space-y-2 border-l border-white/10 ml-5">
                    {module.submodules.map(submodule => (
                        <li key={submodule.id}>
                            <button 
                                onClick={() => onSetActivePage(submodule.id)} 
                                className={`w-full text-left text-sm p-2 rounded-md transition-colors ${
                                    submodule.id === activePage ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                {submodule.id}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};


export const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isVisible, setVisible }) => {
    const { isGodMode } = useGodMode();
    const [modules, setModules] = useState<Module[]>(initialModules);
    const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(['Authentication & Identity']));

    const handleToggleExpand = (moduleId: string) => {
        setExpandedModules(prev => {
            const newSet = new Set(prev);
            if (newSet.has(moduleId)) {
                newSet.delete(moduleId);
            } else {
                newSet.add(moduleId);
            }
            return newSet;
        });
    };

    const handleTogglePin = (moduleId: string) => {
        setModules(prev => prev.map(m => m.id === moduleId ? { ...m, isQuickAccess: !m.isQuickAccess } : m));
    };
    
    const activeParentModule = modules.find(m => m.submodules?.some(s => s.id === activePage));
    const quickAccessModules = modules.filter(m => m.isQuickAccess);
    const standardModules = modules.filter(m => !m.isQuickAccess);

    return (
        <aside className={`border-r shrink-0 transition-all duration-500 ease-in-out ${isVisible ? 'w-80' : 'w-0'} ${isGodMode ? 'bg-[#0a0000] border-red-500/30 shadow-[5px_0_30px_rgba(255,0,0,0.1)]' : 'bg-[#161a2d] border-white/10'}`}>
            <div className={`w-80 h-full flex flex-col p-4 transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                         <div className={isGodMode ? 'glitch-text' : ''}>
                            <UserQLogo size="sm" vaultState={isGodMode ? 'unlocking' : 'locked'} />
                         </div>
                         <h1 className={`text-xl font-bold ${isGodMode ? 'text-red-500 tracking-tighter' : 'text-white'}`}>QCBE CORE</h1>
                    </div>
                    <button onClick={() => setVisible(false)} className="p-2 text-gray-400 hover:text-white" aria-label="Collapse sidebar">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                </div>

                <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4 px-3">Quick Access (Pinned)</p>
                    <div className="space-y-1">
                        {quickAccessModules.length > 0 ? (
                            quickAccessModules.map(module => (
                                <NavItem
                                    key={module.id}
                                    module={module}
                                    isActive={activePage === module.id}
                                    isChildActive={activeParentModule?.id === module.id}
                                    isExpanded={expandedModules.has(module.id)}
                                    onToggleExpand={() => handleToggleExpand(module.id)}
                                    onSetActivePage={setActivePage}
                                    activePage={activePage}
                                    isGodMode={isGodMode}
                                    isQuick={true}
                                    onTogglePin={handleTogglePin}
                                />
                            ))
                        ) : (
                            <p className="text-[10px] text-gray-600 px-3 italic">No modules pinned.</p>
                        )}
                    </div>
                </div>

                <div className="border-t border-white/5 pt-6 flex-1 space-y-2 overflow-y-auto pr-2 -mr-2 scrollbar-hide">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4 px-3">All Modules</p>
                    {standardModules.map(module => (
                        <NavItem
                            key={module.id}
                            module={module}
                            isActive={activePage === module.id}
                            isChildActive={activeParentModule?.id === module.id}
                            isExpanded={expandedModules.has(module.id)}
                            onToggleExpand={() => handleToggleExpand(module.id)}
                            onSetActivePage={setActivePage}
                            activePage={activePage}
                            isGodMode={isGodMode}
                            onTogglePin={handleTogglePin}
                        />
                    ))}
                </div>

                <div className="mt-auto pt-4">
                     <button
                        onClick={() => setActivePage('Yusra AI')}
                        className={`w-full flex items-center p-3 rounded-lg transition-all duration-300 border shadow-lg ${
                            isGodMode 
                                ? 'bg-red-950/30 text-red-100 border-red-500/40 hover:bg-red-900/40' 
                                : 'bg-gradient-to-r from-[#24c38b]/20 to-[#7a5cff]/20 text-white border-white/10 hover:from-[#24c38b]/40 hover:to-[#7a5cff]/40'
                        }`}
                     >
                        <YusraIcon className={`h-8 w-8 mr-3 ${isGodMode ? 'text-red-500' : 'text-[#24c38b]'}`} />
                        <div className="text-left">
                            <p className="font-bold">{isGodMode ? 'AI SENTINEL' : 'Yusra AI'}</p>
                            <p className="text-xs text-gray-400">{isGodMode ? 'Core Extension' : 'Virtual CEO Assistant'}</p>
                        </div>
                     </button>
                </div>
            </div>
        </aside>
    );
};

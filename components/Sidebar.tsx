
import React from 'react';
import { NAVIGATION_LINKS } from '../constants';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (id: string) => void;
    showDevMetrics: boolean;
    onToggleDevMetrics: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, showDevMetrics, onToggleDevMetrics }) => {
    
    // Trigger for hidden door: Shift + Click on the quote
    const handleSecretTrigger = (e: React.MouseEvent) => {
        if (e.shiftKey) {
            e.preventDefault();
            onToggleDevMetrics();
        }
    };

    return (
        <>
            {/* Layout Spacer for Desktop */}
            <div className="hidden md:block w-[240px] flex-shrink-0" aria-hidden="true" />

            <aside className="
                relative w-full h-auto
                md:fixed md:top-32 md:left-12 md:w-[240px]
                flex flex-col gap-6
                z-40
            ">
                <nav className="
                    p-4 rounded-3xl clay-card border border-white/5
                    flex flex-row md:flex-col gap-2 
                    overflow-x-auto md:overflow-visible pb-2 md:pb-4 scrollbar-hide w-full
                ">
                    {NAVIGATION_LINKS.map(link => {
                        const isActive = activeTab === link.id;
                        return (
                            <button 
                                key={link.id}
                                onClick={() => setActiveTab(link.id)}
                                className={`
                                    relative w-full text-left text-[11px] py-3 px-5 rounded-xl
                                    transition-all duration-200 ease-out
                                    whitespace-nowrap font-medium tracking-wide uppercase
                                    border border-transparent
                                    group
                                    ${isActive 
                                        ? 'clay-inset text-text-accent border-white/5 shadow-inner' 
                                        : 'text-text-dim hover:text-text-main hover:bg-white/5'
                                    }
                                `}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{link.label}</span>
                                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-text-accent shadow-[0_0_8px_rgba(255,255,255,0.8)]" />}
                                </div>
                            </button>
                        );
                    })}

                    {/* HIDDEN DEVELOPER TAB */}
                    {showDevMetrics && (
                        <button 
                            key="dev_metrics"
                            onClick={() => setActiveTab('dev_metrics')}
                            className={`
                                relative w-full text-left text-[11px] py-3 px-5 rounded-xl
                                transition-all duration-200 ease-out
                                whitespace-nowrap font-bold tracking-wide uppercase font-mono
                                border border-red-500/20
                                group
                                ${activeTab === 'dev_metrics' 
                                    ? 'bg-red-500/10 text-red-500 shadow-inner' 
                                    : 'text-red-500/60 hover:text-red-500 hover:bg-red-500/5'
                                }
                            `}
                        >
                            <div className="flex items-center justify-between">
                                <span>[:: DEV METRICS ::]</span>
                                {activeTab === 'dev_metrics' && <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" />}
                            </div>
                        </button>
                    )}
                </nav>
                
                <div className="hidden md:block">
                     <div 
                        onClick={handleSecretTrigger}
                        className="clay-inset p-5 rounded-2xl border border-white/5 opacity-80 cursor-default hover:border-white/10 transition-colors select-none"
                     >
                        <p className="text-[10px] text-text-dim leading-relaxed font-mono">
                            "Architecture is not just about structure, it's about the <span className="text-text-main">space</span> between."
                        </p>
                     </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;

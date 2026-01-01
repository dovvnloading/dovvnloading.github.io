
import React, { useState, useEffect } from 'react';
import Cursor from './components/Cursor';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Stream from './components/Stream';
import MediaLibrary from './components/MediaLibrary';
import ProjectCard from './components/ProjectCard';
import NetworkGrid from './components/NetworkGrid';
import Services from './components/Services';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';
import DevMetrics from './components/DevMetrics';
import { PROJECTS, COMMUNITY_ITEMS } from './constants';
import { Project } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent, METRIC_KEYS } from './utils/metrics';

const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="
        pt-8 pb-8 
        flex flex-col md:flex-row md:justify-between md:items-end 
        z-30 sticky top-24 
        bg-bg/95 backdrop-blur-md 
        transition-all duration-300
        -mx-2 md:-mx-4 px-4 md:px-8 border-b border-white/5 mb-8
    ">
        <div className="clay-button px-8 py-4 inline-flex flex-col items-start active:scale-100 cursor-default shadow-clay-sm border border-white/5">
            <h2 className="text-[16px] font-bold tracking-[0.2em] text-text-main uppercase">{title}</h2>
        </div>
        <span className="text-[11px] font-mono text-text-dim uppercase mt-4 md:mt-0 px-4 py-2 bg-black/20 rounded-lg border border-white/5">{subtitle}</span>
    </div>
);

interface LightboxState {
    images: string[];
    currentIndex: number;
}

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [lightboxState, setLightboxState] = useState<LightboxState | null>(null);
    const [showMediaLibrary, setShowMediaLibrary] = useState(false);
    
    // Hidden Feature State
    const [showDevMetrics, setShowDevMetrics] = useState(false);

    // Initial Load Tracking
    useEffect(() => {
        trackEvent(METRIC_KEYS.APP_LOADS);
    }, []);

    // Reset library view when changing tabs and track navigation
    const handleTabChange = (id: string) => {
        setActiveTab(id);
        setShowMediaLibrary(false);
        trackEvent(METRIC_KEYS.NAV_SWITCHES);
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleOpenLightbox = (url: string, allImages: string[]) => {
        trackEvent(METRIC_KEYS.STREAM_INTERACTIONS);
        const index = allImages.indexOf(url);
        if (index >= 0) {
            setLightboxState({
                images: allImages,
                currentIndex: index
            });
        }
    };

    const handleNextImage = () => {
        if (!lightboxState) return;
        setLightboxState(prev => {
            if (!prev) return null;
            const nextIndex = (prev.currentIndex + 1) % prev.images.length;
            return { ...prev, currentIndex: nextIndex };
        });
    };

    const handlePrevImage = () => {
        if (!lightboxState) return;
        setLightboxState(prev => {
            if (!prev) return null;
            const nextIndex = (prev.currentIndex - 1 + prev.images.length) % prev.images.length;
            return { ...prev, currentIndex: nextIndex };
        });
    };

    const toggleDevMetrics = () => {
        setShowDevMetrics(prev => !prev);
    };

    const filterProjects = (domain: Project['domain']) => PROJECTS.filter(p => p.domain === domain);

    const renderContent = () => {
        // If the special tab is selected
        if (activeTab === 'dev_metrics') {
            return <DevMetrics />;
        }

        switch (activeTab) {
            case 'overview':
                return (
                    <motion.div 
                        key="overview"
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -20 }}
                        className="flex flex-col h-full gap-6 pt-2"
                    >
                        {showMediaLibrary ? (
                            <MediaLibrary 
                                onBack={() => setShowMediaLibrary(false)} 
                                onImageClick={handleOpenLightbox} 
                            />
                        ) : (
                            <>
                                {/* GRID LAYOUT: Row 1 (Identity & Philosophy) */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                    
                                    {/* IDENTITY CARD - Span 7 */}
                                    <div className="lg:col-span-7 clay-card p-10 md:p-12 border border-white/5 rounded-[32px] relative overflow-hidden group flex flex-col justify-between min-h-[340px]">
                                        <div className="absolute top-0 right-0 p-[150px] bg-white/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-white/10 transition-colors duration-1000"></div>
                                        
                                        <div className="relative z-10">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 mb-8">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></span>
                                                <span className="text-[10px] font-mono text-text-dim uppercase tracking-widest">Available for Contract</span>
                                            </div>
                                            <h4 className="text-[36px] md:text-[52px] font-bold text-text-main leading-[0.9] tracking-tight mb-2">
                                                SYSTEMS<br/>ARCHITECT
                                            </h4>
                                            <h4 className="text-[36px] md:text-[52px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-text-dim to-text-main leading-[0.9] tracking-tight">
                                                & ENGINEER
                                            </h4>
                                        </div>

                                        <div className="relative z-10 mt-8">
                                             <p className="text-[12px] font-mono text-text-dim uppercase tracking-wider max-w-[420px] leading-relaxed">
                                                Constructing high-fidelity agentic workspaces and signal processing tools from first principles.
                                             </p>
                                        </div>
                                    </div>

                                    {/* MANIFESTO CARD - Span 5 */}
                                    <div className="lg:col-span-5 clay-card p-10 border border-white/5 rounded-[32px] flex flex-col justify-center relative overflow-hidden h-full min-h-[340px] group">
                                         <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-text-accent to-transparent opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                         <p className="text-[14px] md:text-[15px] leading-[1.8] text-[#999] font-medium font-sans">
                                            "I architect sovereign systems at the intersection of cognitive logic and signal processing. From local-first AI environments to browser-based DSP engines, my work collapses the gap between abstract intent and high-fidelity execution—without reliance on external dependencies."
                                         </p>
                                         <div className="mt-8 flex items-center gap-4 opacity-50">
                                            <div className="h-[1px] flex-grow bg-white/20"></div>
                                            <span className="text-[10px] font-mono text-text-dim uppercase tracking-widest">The Philosophy</span>
                                         </div>
                                    </div>
                                </div>

                                {/* GRID LAYOUT: Row 2 (Stream) */}
                                <div className="clay-card border border-white/5 overflow-hidden rounded-[32px]">
                                     <Stream 
                                        onImageClick={handleOpenLightbox} 
                                        onOpenLibrary={() => setShowMediaLibrary(true)}
                                     />
                                </div>

                                {/* GRID LAYOUT: Row 3 (Technical Details) */}
                                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                     {/* Stat 1 */}
                                    <div className="clay-card p-8 rounded-[28px] border border-white/5 flex flex-col justify-between h-[200px] group hover:border-white/20 transition-colors">
                                         <span className="text-[10px] font-mono text-text-dim uppercase tracking-widest group-hover:text-text-accent transition-colors">Project Volume</span>
                                         <div className="flex items-baseline gap-2">
                                            <span className="text-[48px] font-bold text-white tracking-tighter drop-shadow-lg">165+</span>
                                            <span className="text-[12px] text-text-dim font-mono">Builds</span>
                                         </div>
                                         <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full w-[85%] bg-text-accent shadow-[0_0_15px_rgba(255,255,255,0.4)]"></div>
                                         </div>
                                    </div>

                                     {/* Stat 2 */}
                                    <div className="clay-card p-8 rounded-[28px] border border-white/5 flex flex-col justify-between h-[200px] group hover:border-white/20 transition-colors">
                                         <span className="text-[10px] font-mono text-text-dim uppercase tracking-widest group-hover:text-text-accent transition-colors">Architecture</span>
                                         <div className="flex flex-col">
                                            <span className="text-[24px] font-bold text-white tracking-tight">Zero-Backend</span>
                                            <span className="text-[13px] text-text-dim mt-1 font-mono">/// Client-Side Logic</span>
                                         </div>
                                         <p className="text-[11px] text-[#777] leading-relaxed font-medium">
                                            Secure, offline-first systems that collapse the gap between intent and action.
                                         </p>
                                    </div>

                                     {/* Stat 3 */}
                                    <div className="clay-card p-8 rounded-[28px] border border-white/5 flex flex-col justify-between h-[200px] group hover:border-white/20 transition-colors">
                                         <span className="text-[10px] font-mono text-text-dim uppercase tracking-widest group-hover:text-text-accent transition-colors">Focus Domain</span>
                                         <div className="flex flex-wrap gap-2">
                                            {['AI Agents', 'DSP Audio', 'WebGL', 'Reasoning'].map(tag => (
                                                <span key={tag} className="px-3 py-1.5 rounded-lg clay-inset-sm text-[10px] font-bold text-text-dim uppercase border border-white/5 hover:text-white transition-colors">
                                                    {tag}
                                                </span>
                                            ))}
                                         </div>
                                         <div className="flex items-center gap-2 text-[10px] font-mono text-text-accent mt-4">
                                            <span className="w-2 h-2 rounded-full bg-text-accent animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.5)]"></span>
                                            Active Research
                                         </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                );

            case 'hire':
                return <Services />;

            case 'graphite':
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <SectionHeader title="Systems Architecture" subtitle="Development Environments" />
                        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-8">
                            {filterProjects('systems').map(p => <ProjectCard key={p.id} project={p} />)}
                        </div>
                    </motion.div>
                );

            case 'audio':
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <SectionHeader title="Audio & DSP" subtitle="Synthesis / Generative Signal Paths" />
                        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-8">
                            {filterProjects('audio').map(p => <ProjectCard key={p.id} project={p} />)}
                        </div>
                    </motion.div>
                );

            case 'research':
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
                        <div className="relative z-10">
                            <SectionHeader title="Research & AI" subtitle="Local Intelligence / Docs" />
                            <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-8 mb-20">
                                {filterProjects('research').map(p => <ProjectCard key={p.id} project={p} />)}
                            </div>
                        </div>

                        <div className="relative z-20 pt-10 border-t border-white/5">
                            <div className="mb-12 clay-inset p-8 rounded-2xl flex items-center justify-between">
                                 <h2 className="text-[14px] font-bold tracking-widest text-text-dim uppercase">Synthetic Datasets</h2>
                                 <span className="text-[10px] px-3 py-1 rounded-full bg-white/5 text-text-dim">HuggingFace</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-8">
                                {filterProjects('dataset').map(p => <ProjectCard key={p.id} project={p} />)}
                            </div>
                        </div>
                    </motion.div>
                );

            case 'graphics':
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <SectionHeader title="Graphics & Rendering" subtitle="Pixel / Mesh / Canvas" />
                        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-8">
                            {filterProjects('graphics').map(p => <ProjectCard key={p.id} project={p} />)}
                        </div>
                    </motion.div>
                );

            case 'community':
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <SectionHeader title="Community & Data" subtitle="Open Source / Libraries" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {COMMUNITY_ITEMS.map(p => <ProjectCard key={p.id} project={p} />)}
                        </div>
                    </motion.div>
                );

            case 'network':
                return <NetworkGrid />;
                
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-bg">
            <Cursor />
            <Header />
            <Lightbox 
                src={lightboxState ? lightboxState.images[lightboxState.currentIndex] : null} 
                onClose={() => setLightboxState(null)}
                onNext={handleNextImage}
                onPrev={handlePrevImage}
            />
            
            <div className="pt-24 md:pt-32 pb-12 px-6 md:px-12 flex flex-col md:flex-row gap-8 md:gap-16 max-w-[1920px] mx-auto">
                <Sidebar 
                    activeTab={activeTab} 
                    setActiveTab={handleTabChange} 
                    showDevMetrics={showDevMetrics}
                    onToggleDevMetrics={toggleDevMetrics}
                />

                <main className="flex-grow flex flex-col relative min-h-screen w-full">
                    <AnimatePresence mode="wait">
                        {renderContent()}
                    </AnimatePresence>

                    {!showMediaLibrary && activeTab !== 'network' && activeTab !== 'dev_metrics' && (
                        <div className="mt-32">
                           <Footer />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default App;

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GITHUB_ASSETS_API } from '../constants';
import { StreamAsset } from '../types';

interface MediaLibraryProps {
    onBack: () => void;
    onImageClick: (url: string, allImages: string[]) => void;
}

const MediaLibrary: React.FC<MediaLibraryProps> = ({ onBack, onImageClick }) => {
    const [assets, setAssets] = useState<StreamAsset[]>([]);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('INITIALIZING');

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                setLoadingText('ESTABLISHING CONNECTION');
                const response = await fetch(GITHUB_ASSETS_API);
                if (!response.ok) throw new Error("API Error");
                let files: StreamAsset[] = await response.json();
                
                const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];
                files = files.filter(item => {
                    if (item.type !== 'file') return false;
                    return imageExtensions.some(ext => item.name.toLowerCase().endsWith(ext));
                });

                if (files.length > 0) {
                    // Randomize for aesthetic variety
                    for (let i = files.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [files[i], files[j]] = [files[j], files[i]];
                    }
                    setAssets(files);

                    // Preload critical batch for immediate visual stability
                    setLoadingText('CACHING ASSETS');
                    const preloadCount = Math.min(files.length, 12); // Ensure viewport is full
                    const toPreload = files.slice(0, preloadCount);
                    let loaded = 0;

                    const promises = toPreload.map(file => {
                        return new Promise<void>((resolve) => {
                            const img = new Image();
                            img.src = file.download_url;
                            const done = () => {
                                loaded++;
                                setProgress(Math.round((loaded / preloadCount) * 100));
                                resolve();
                            };
                            img.onload = done;
                            img.onerror = done;
                        });
                    });

                    await Promise.all(promises);
                    
                    setLoadingText('RENDERING GRID');
                    setTimeout(() => {
                        setLoading(false);
                    }, 500);
                } else {
                    setProgress(100);
                    setLoading(false);
                }
            } catch (e) {
                console.warn("Library load failed");
                setLoading(false);
            }
        };
        fetchAssets();
    }, []);

    const handleImageClick = (url: string) => {
        const allUrls = assets.map(a => a.download_url);
        onImageClick(url, allUrls);
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full min-h-[80vh] relative"
        >
            {/* SOTA Loading Overlay */}
            <AnimatePresence>
                {loading && (
                    <motion.div
                        key="library-loader"
                        initial={{ opacity: 1 }}
                        exit={{ 
                            opacity: 0, 
                            scale: 1.1, 
                            filter: "blur(20px)",
                            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
                        }}
                        className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-clay-grad border border-white/5 rounded-3xl"
                    >
                         <div className="relative flex items-center justify-center mb-6">
                            <motion.div 
                                className="w-16 h-16 rounded-full border border-white/5 border-t-white/30"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div 
                                className="absolute w-10 h-10 rounded-full border border-white/5 border-b-text-accent"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                            <span className="absolute text-[10px] font-mono font-bold text-white">{progress}%</span>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <motion.span 
                                key={loadingText}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-[10px] font-mono text-text-dim uppercase tracking-[0.3em]"
                            >
                                {loadingText}
                            </motion.span>
                             <div className="h-[2px] w-24 bg-white/10 rounded-full overflow-hidden">
                                 <motion.div 
                                    className="h-full bg-text-accent shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ type: "spring", stiffness: 50 }}
                                 />
                             </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div 
                className="flex justify-between items-end mb-8 sticky top-0 bg-bg/95 backdrop-blur-md z-40 py-4 border-b border-white/5"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: loading ? 0 : 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="flex flex-col">
                    <h2 className="text-[20px] font-bold text-text-main tracking-tight">Visual Archive</h2>
                    <span className="text-[10px] text-text-dim font-mono mt-2 uppercase tracking-wider">Full Collection // {assets.length > 0 ? assets.length : '--'} Items</span>
                </div>
                <button 
                    onClick={onBack}
                    className="clay-button px-6 py-3 text-[10px] font-bold text-text-dim hover:text-text-main transition-all uppercase tracking-widest flex items-center gap-2 group"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-text-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Close Gallery
                </button>
            </motion.div>

            <div className="flex-grow">
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 pb-20">
                    {assets.map((asset, i) => (
                        <motion.div 
                            key={asset.name + i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "50px" }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="break-inside-avoid relative group"
                            onClick={() => handleImageClick(asset.download_url)}
                        >
                            <div className="clay-card p-2 rounded-2xl cursor-none overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:z-10 border border-white/5 hover:border-white/20">
                                <div className="rounded-xl overflow-hidden bg-[#151517] relative">
                                    <img 
                                        src={asset.download_url} 
                                        alt={asset.name}
                                        loading="lazy"
                                        className="w-full h-auto object-cover filter grayscale-[0.2] contrast-[1.05] group-hover:grayscale-0 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                        <div className="w-12 h-12 rounded-full clay-button flex items-center justify-center border border-white/10 shadow-lg">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default MediaLibrary;
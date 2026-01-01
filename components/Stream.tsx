import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { GITHUB_ASSETS_API } from '../constants';
import { StreamAsset } from '../types';

interface StreamProps {
    onImageClick: (url: string, allImages: string[]) => void;
    onOpenLibrary: () => void;
}

const shuffle = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const Stream: React.FC<StreamProps> = ({ onImageClick, onOpenLibrary }) => {
    const [assets, setAssets] = useState<StreamAsset[]>([]);
    
    // SOTA Loading State
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('INITIALIZING');

    const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
    const isDragging = useRef(false);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);

    // Initialization Sequence
    useEffect(() => {
        const sequence = async () => {
            try {
                setLoadingText('CONNECTING');
                const response = await fetch(GITHUB_ASSETS_API);
                if (!response.ok) throw new Error("API Error");
                let files: StreamAsset[] = await response.json();
                
                const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];
                files = files.filter(item => {
                    if (item.type !== 'file') return false;
                    return imageExtensions.some(ext => item.name.toLowerCase().endsWith(ext));
                });

                if (files.length > 0) {
                    files = shuffle(files);
                    setAssets(files);

                    // Preload "Critical Path" (First 8 items) to ensure viewport is full and stable
                    setLoadingText('BUFFERING ASSETS');
                    const preloadCount = Math.min(files.length, 8);
                    const criticalPath = files.slice(0, preloadCount);
                    
                    let loaded = 0;
                    
                    const promises = criticalPath.map(file => {
                        return new Promise<void>((resolve) => {
                            const img = new Image();
                            img.src = file.download_url;
                            img.onload = () => {
                                loaded++;
                                setProgress(Math.round((loaded / preloadCount) * 100));
                                resolve();
                            };
                            img.onerror = () => {
                                loaded++; 
                                setProgress(Math.round((loaded / preloadCount) * 100));
                                resolve();
                            };
                        });
                    });

                    await Promise.all(promises);
                    
                    setLoadingText('SYSTEM READY');
                    // Short artificial delay for the "Ready" state to be perceived
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 600);
                } else {
                    setProgress(100);
                    setIsLoading(false);
                }
            } catch (e) {
                console.warn("Stream failed to load");
                setIsLoading(false);
            }
        };
        sequence();
    }, []);

    // Constraint Calculation
    const calculateConstraints = () => {
        if (!containerRef.current || !trackRef.current) return;
        const containerWidth = containerRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;
        
        const minLeft = Math.min(0, containerWidth - trackWidth - 100);
        setDragConstraints({ left: minLeft, right: 0 });
    };

    // Observers
    useEffect(() => {
        if (isLoading) return;
        
        // Short delay to allow layout to settle after loader vanishes
        const timer = setTimeout(calculateConstraints, 100);
        
        const resizeObserver = new ResizeObserver(() => {
            calculateConstraints();
        });

        if (containerRef.current) resizeObserver.observe(containerRef.current);
        if (trackRef.current) resizeObserver.observe(trackRef.current);

        window.addEventListener('resize', calculateConstraints);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', calculateConstraints);
            resizeObserver.disconnect();
        };
    }, [assets, isLoading]);

    // Wheel Scroll Support
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        
        const onWheel = (e: WheelEvent) => {
            if (e.deltaY !== 0 || e.deltaX !== 0) {
                e.preventDefault();
                const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
                const currentX = x.get();
                const newX = currentX - delta;
                
                const { left, right } = dragConstraints;
                if (newX >= left && newX <= right) x.set(newX);
                else if (newX < left) x.set(left + (newX - left) * 0.2);
                else if (newX > right) x.set(right + (newX - right) * 0.2);
            }
        };
        container.addEventListener('wheel', onWheel, { passive: false });
        return () => container.removeEventListener('wheel', onWheel);
    }, [dragConstraints, x]);

    const handleDragStart = () => { isDragging.current = true; };
    const handleDragEnd = () => { setTimeout(() => { isDragging.current = false; }, 150); };
    
    const handleItemClick = (url: string) => { 
        if (!isDragging.current) {
            // Pass the current shuffled list order to maintain navigation context
            const allUrls = assets.map(a => a.download_url);
            onImageClick(url, allUrls); 
        }
    };

    return (
        <div className="h-[400px] md:h-[480px] relative flex flex-col interactive-target group/stream overflow-hidden rounded-[inherit]">
            {/* Header / Info - Fade in with content */}
            <motion.div 
                className="px-8 py-6 z-40 flex justify-between items-center bg-transparent pointer-events-none absolute top-0 left-0 right-0"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? -20 : 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                <span className="text-[10px] font-bold tracking-widest text-text-dim uppercase bg-bg/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/5 shadow-sm">
                    Visual Archive
                </span>
                
                <button 
                    onClick={onOpenLibrary}
                    className="pointer-events-auto clay-button px-4 py-2 text-[10px] font-bold text-text-dim uppercase hover:text-white transition-all duration-200 border border-transparent hover:border-white/10 active:scale-95 cursor-pointer"
                >
                    View Full Collection ->
                </button>
            </motion.div>

            {/* SOTA Loading Overlay */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ 
                            opacity: 0, 
                            scale: 1.1, 
                            filter: "blur(20px)",
                            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
                        }}
                        className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-clay-grad border border-white/5 rounded-[inherit]"
                    >
                        <div className="relative flex items-center justify-center">
                            {/* Outer Ring */}
                            <motion.div 
                                className="w-24 h-24 rounded-full border border-white/5 border-t-white/20"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                            {/* Inner Ring */}
                            <motion.div 
                                className="absolute w-16 h-16 rounded-full border border-white/5 border-b-text-accent"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />
                            {/* Center Progress */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-[14px] font-bold text-white font-mono">{progress}%</span>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col items-center gap-2">
                             <motion.span 
                                key={loadingText}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-[10px] font-mono text-text-accent uppercase tracking-[0.3em]"
                             >
                                 {loadingText}
                             </motion.span>
                             <div className="h-[2px] w-32 bg-white/10 rounded-full overflow-hidden">
                                 <motion.div 
                                    className="h-full bg-text-accent shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ type: "spring", stiffness: 50 }}
                                 />
                             </div>
                        </div>
                        
                        {/* Decorative Grid Lines */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
                            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white"></div>
                            <div className="absolute left-1/2 top-0 h-full w-[1px] bg-white"></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll Container Wrapper - Layouts the interaction zone */}
            <div className="flex-grow flex items-center justify-center relative w-full overflow-hidden z-20">
                {/* INTERACTION ZONE: Restricted height to ensure only hovering images triggers scroll */}
                <motion.div 
                    className="w-full h-[340px] relative flex items-center cursor-grab active:cursor-grabbing" 
                    ref={containerRef}
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ 
                        opacity: isLoading ? 0 : 1, 
                        filter: isLoading ? 'blur(10px)' : 'blur(0px)' 
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <motion.div 
                        ref={trackRef}
                        className="flex items-center h-full absolute left-0 top-0 pl-8"
                        style={{ x, touchAction: "pan-y" }} 
                        drag="x"
                        dragConstraints={dragConstraints}
                        dragElastic={0.2}
                        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                        whileTap={{ cursor: "grabbing" }}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    >
                        {/* Intro Card */}
                        <div className="h-[280px] w-[320px] flex-shrink-0 flex flex-col justify-center p-8 mr-12 relative z-20 clay-inset rounded-[32px] border border-white/5 select-none">
                            <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-text-accent animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                            <h4 className="text-[20px] font-bold mb-4 text-text-main">Selected Works</h4>
                            <div className="flex flex-col gap-4">
                                <p className="text-[12px] leading-relaxed text-[#888]">
                                    A curated collection of design artifacts, motion studies, and visual explorations.
                                </p>
                                <div className="p-3 bg-black/20 rounded-xl border border-white/5 backdrop-blur-sm">
                                    <p className="text-[10px] font-bold text-text-main uppercase tracking-wide mb-1">Independent Execution</p>
                                    <p className="text-[11px] leading-relaxed text-[#aaa]">
                                        Every project exhibited here was architected, designed, and engineered exclusively by the author. No teams. No agencies. Zero corporate involvement.
                                    </p>
                                </div>
                                <p className="text-[10px] uppercase tracking-widest text-text-dim mt-auto">
                                    Drag to explore &rarr;
                                </p>
                            </div>
                        </div>

                        {assets.map((asset, i) => (
                            <StreamItem 
                                key={asset.name + i} 
                                asset={asset} 
                                index={i} 
                                onClick={() => handleItemClick(asset.download_url)} 
                            />
                        ))}
                        
                        {/* End Spacer */}
                        <div className="w-[15vw] flex-shrink-0"></div>
                    </motion.div>
                </motion.div>
            </div>
            
            {/* Vignettes */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/80 to-transparent pointer-events-none z-30"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--bg)] via-[var(--bg)]/80 to-transparent pointer-events-none z-30"></div>
        </div>
    );
};

const StreamItem: React.FC<{ asset: StreamAsset; index: number; onClick: () => void }> = ({ asset, onClick }) => {
    // We keep the isLoaded state here as a fallback for lazy loading of images beyond the critical path
    // or if the preload promise resolved but the browser hadn't fully painted.
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div 
            className="h-[280px] flex-shrink-0 relative group mr-10"
            onClick={onClick}
        >
            {/* 
                Variable Width Container
                We allow the container to hug the image width naturally.
                No forced aspect ratio.
            */}
            <div className={`
                h-full w-auto inline-block p-2.5
                bg-gradient-to-br from-[#2a2a2e] to-[#1e1e21]
                rounded-[24px] 
                shadow-[8px_8px_20px_#141414,-8px_-8px_20px_#323236]
                border border-white/5
                group-hover:border-white/20 
                group-hover:shadow-[12px_12px_30px_#101010,-12px_-12px_30px_#3a3a40]
                group-hover:-translate-y-1
                transition-all duration-300
                cursor-none
                ${isLoaded ? 'opacity-100' : 'opacity-0'}
            `}>
                <div className="h-full w-auto overflow-hidden rounded-2xl relative bg-[#151517]">
                    <img 
                        src={asset.download_url} 
                        alt={asset.name}
                        onLoad={() => setIsLoaded(true)}
                        className="
                            h-full w-auto max-w-none 
                            object-contain 
                            filter grayscale-[0.3] contrast-[1.05] brightness-90
                            group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100
                            transition-all duration-500
                        "
                        draggable={false}
                    />
                    
                    {/* Inner Gloss */}
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none mix-blend-overlay z-10"></div>
                </div>
            </div>
        </div>
    );
};

export default Stream;
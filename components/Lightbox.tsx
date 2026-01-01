import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LightboxProps {
    src: string | null;
    onClose: () => void;
    onNext?: () => void;
    onPrev?: () => void;
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

const Lightbox: React.FC<LightboxProps> = ({ src, onClose, onNext, onPrev }) => {
    // Track direction for animation: 1 for right (next), -1 for left (prev)
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight' && onNext) {
                setDirection(1);
                onNext();
            }
            if (e.key === 'ArrowLeft' && onPrev) {
                setDirection(-1);
                onPrev();
            }
        };
        if (src) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [src, onClose, onNext, onPrev]);

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setDirection(1);
        onNext && onNext();
    };

    const handlePrev = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setDirection(-1);
        onPrev && onPrev();
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95
        })
    };

    return (
        <AnimatePresence>
            {src && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed inset-0 z-[10000] bg-[#161618]/95 backdrop-blur-xl flex justify-center items-center select-none"
                    onClick={onClose}
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ 
                            type: "spring", 
                            damping: 30, 
                            stiffness: 300,
                            mass: 0.8 
                        }}
                        className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-12"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        {/* Navigation Buttons */}
                        {onPrev && (
                            <button
                                onClick={handlePrev}
                                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full clay-button flex items-center justify-center text-text-dim hover:text-white transition-all duration-200 hover:scale-110 active:scale-95 border border-white/5 z-50 group shadow-clay"
                                aria-label="Previous Image"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>
                        )}

                        {onNext && (
                            <button
                                onClick={handleNext}
                                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full clay-button flex items-center justify-center text-text-dim hover:text-white transition-all duration-200 hover:scale-110 active:scale-95 border border-white/5 z-50 group shadow-clay"
                                aria-label="Next Image"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        )}

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full clay-button flex items-center justify-center text-text-dim hover:text-white transition-all duration-200 hover:scale-110 active:scale-95 border border-white/5 z-50 interactive-target shadow-clay-hover"
                            aria-label="Close Preview"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        <div className="relative w-full h-full flex items-center justify-center">
                            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                                <motion.div
                                    key={src}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "spring", stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.2 }
                                    }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={1}
                                    onDragEnd={(e, { offset, velocity }) => {
                                        const swipe = swipePower(offset.x, velocity.x);

                                        if (swipe < -swipeConfidenceThreshold) {
                                            handleNext();
                                        } else if (swipe > swipeConfidenceThreshold) {
                                            handlePrev();
                                        }
                                    }}
                                    className="clay-card p-2 md:p-3 rounded-3xl border border-white/5 shadow-2xl relative max-w-[95vw] max-h-[85vh] flex-shrink-0 cursor-grab active:cursor-grabbing"
                                >
                                    <img 
                                        src={src} 
                                        alt="Preview" 
                                        className="max-w-[100%] max-h-[80vh] md:max-h-[80vh] rounded-xl object-contain shadow-inner bg-[#1a1a1c] pointer-events-none"
                                        draggable={false}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        
                        <div className="mt-8 z-50">
                            <span className="px-4 py-2 rounded-full clay-inset-sm text-[10px] font-mono text-text-dim uppercase tracking-widest border border-white/5">
                                Gallery Mode /// Arrow Keys Enabled
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Lightbox;
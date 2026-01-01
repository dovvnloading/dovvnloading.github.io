import React, { useEffect, useRef } from 'react';

const Cursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Internal state to bypass React render cycle for performance and reliability
        let isScrubbing = false;
        let isVisible = false;

        const show = () => {
            if (isScrubbing) return;
            if (!isVisible) {
                cursor.style.opacity = '1';
                isVisible = true;
            }
        };

        const hide = () => {
            if (isVisible) {
                cursor.style.opacity = '0';
                isVisible = false;
            }
        };

        const moveCursor = (e: MouseEvent) => {
            // CRITICAL FIX: Middle Mouse (Button 4 bitmask) check.
            // When middle mouse is held/clicked for auto-scroll, the browser often locks 
            // the cursor or stops sending reliable coordinates. We must hide the custom cursor.
            if (isScrubbing || (e.buttons & 4) === 4) {
                hide();
                return;
            }

            // Update position directly
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
            show();
        };

        const handleMouseDown = (e: MouseEvent) => {
            // Middle click (button 1)
            if (e.button === 1) {
                isScrubbing = true;
                hide();
            } else {
                // Optional: visual feedback for other clicks could go here
                // e.g. cursor.classList.add('cursor-active');
            }
        };

        const handleMouseUp = (e: MouseEvent) => {
            if (e.button === 1) {
                isScrubbing = false;
                // We do NOT show() here. We wait for the next mousemove event.
                // This ensures the cursor only reappears when we have a valid, updated position.
            }
        };

        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Robust check for interactive elements
            const isInteractive = 
                target.tagName === 'A' || 
                target.tagName === 'BUTTON' ||
                target.closest('a') || 
                target.closest('button') || 
                target.closest('.interactive-target') ||
                target.closest('.stream-item');

            if (isInteractive) {
                cursor.classList.add('cursor-hover');
            } else {
                cursor.classList.remove('cursor-hover');
            }
        };

        const handleLeave = () => {
            hide();
        };

        // Event Listeners
        // Use passive: true for scroll/move performance where applicable
        window.addEventListener('mousemove', moveCursor, { passive: true });
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleHover, { passive: true });
        document.addEventListener('mouseleave', handleLeave);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleHover);
            document.removeEventListener('mouseleave', handleLeave);
        };
    }, []);

    return (
        <div 
            id="cursor-root"
            ref={cursorRef} 
            className="fixed top-0 left-0 w-4 h-4 bg-white/80 rounded-full pointer-events-none z-[999999] shadow-[0_0_15px_rgba(255,255,255,0.5)] mix-blend-difference opacity-0"
            style={{ 
                willChange: 'transform, opacity, width, height',
                transition: 'opacity 0.15s ease-out, width 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), height 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                backdropFilter: 'blur(2px)'
            }}
        >
            <style>{`
                .cursor-hover {
                    width: 60px !important;
                    height: 60px !important;
                    background-color: rgba(255, 255, 255, 0.1) !important;
                    box-shadow: 0 0 30px rgba(255, 255, 255, 0.2), inset 0 0 10px rgba(255,255,255,0.1) !important;
                    mix-blend-mode: normal !important;
                    border: 1px solid rgba(255,255,255,0.2);
                    backdrop-filter: blur(4px);
                }
            `}</style>
        </div>
    );
};

export default Cursor;
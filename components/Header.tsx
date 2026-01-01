import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 right-0 h-24 z-[100] px-6 md:px-12 flex items-center justify-between bg-bg/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
            <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl clay-button flex items-center justify-center text-text-accent font-bold text-xl shadow-clay-sm">
                    M
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="font-sans font-bold text-[16px] tracking-wide uppercase text-text-main text-glow leading-none mb-1">Matthew Wesney</h1>
                    <span className="text-[11px] text-text-dim font-mono tracking-tighter uppercase">/// Systems Architect</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
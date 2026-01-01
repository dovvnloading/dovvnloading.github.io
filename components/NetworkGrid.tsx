import React from 'react';
import { motion } from 'framer-motion';
import { NETWORK_PROFILES } from '../constants';
import { NetworkProfile } from '../types';

const NetworkGrid: React.FC = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-10"
        >
            <div className="
                pt-8 pb-8 
                flex flex-col md:flex-row md:justify-between md:items-end 
                z-30 sticky top-24 
                bg-bg/95 backdrop-blur-md 
                transition-all duration-300
                -mx-2 md:-mx-4 px-4 md:px-8 border-b border-white/5
            ">
                <div className="clay-button px-8 py-4 inline-flex flex-col items-start active:scale-100 cursor-default shadow-clay-sm border border-white/5">
                    <h2 className="text-[16px] font-bold tracking-[0.2em] text-text-main uppercase">Global Network</h2>
                </div>
                <span className="text-[11px] font-mono text-text-dim uppercase mt-4 md:mt-0 px-4 py-2 bg-black/20 rounded-lg border border-white/5">Communications / Protocols</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr pb-20">
                {NETWORK_PROFILES.map((profile, i) => (
                    <NetworkCard key={profile.id} profile={profile} index={i} />
                ))}
            </div>
        </motion.div>
    );
};

const NetworkCard: React.FC<{ profile: NetworkProfile; index: number }> = ({ profile, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            className="group relative flex flex-col p-8 rounded-[32px] clay-card border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 overflow-hidden min-h-[300px]"
        >
            {/* Hover Glow Effect */}
            <div 
                className="absolute top-0 right-0 p-[120px] rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: profile.color }}
            />

            <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="w-16 h-16 rounded-2xl clay-inset flex items-center justify-center text-text-dim group-hover:text-white transition-colors duration-300 border border-white/5">
                    {profile.iconUrl ? (
                        <img src={profile.iconUrl} alt={profile.platform} className="w-8 h-8 object-contain" />
                    ) : (
                        <svg 
                            viewBox="0 0 24 24" 
                            fill={profile.isShape ? "currentColor" : "none"}
                            stroke={profile.isShape ? "none" : "currentColor"}
                            strokeWidth={profile.isShape ? "0" : "1.5"}
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="w-8 h-8"
                        >
                            <path d={profile.iconPath} />
                        </svg>
                    )}
                </div>
                
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 border border-white/5 backdrop-blur-sm">
                    <div 
                        className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px] animate-pulse" 
                        style={{ backgroundColor: profile.color, boxShadow: `0 0 10px ${profile.color}` }}
                    />
                    <span className="text-[9px] font-mono text-text-dim uppercase tracking-widest">Online</span>
                </div>
            </div>

            <div className="relative z-10 mt-auto">
                <div className="flex flex-col gap-1 mb-6">
                    <span className="text-[10px] font-mono text-text-dim uppercase tracking-wider">{profile.role}</span>
                    <h3 className="text-[28px] font-bold text-text-main leading-tight group-hover:text-glow transition-all">
                        {profile.platform}
                    </h3>
                    <span className="text-[12px] text-text-accent opacity-50 font-mono group-hover:opacity-100 transition-opacity">
                        {profile.username}
                    </span>
                </div>

                <p className="text-[13px] leading-relaxed text-[#888] mb-8 font-medium border-t border-white/5 pt-6 group-hover:text-[#aaa] transition-colors">
                    {profile.description}
                </p>

                <div className="flex items-center justify-between group/btn">
                    <span className="text-[10px] font-bold text-text-dim uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                        VISIT PROFILE
                    </span>
                    <a 
                        href={profile.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full clay-button flex items-center justify-center text-text-dim group-hover:text-text-accent transition-all hover:scale-110 active:scale-95 border border-transparent group-hover:border-white/10 cursor-pointer"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default NetworkGrid;
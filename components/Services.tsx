
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import { ServiceItem } from '../types';

const Services: React.FC = () => {
    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex flex-col relative w-full"
        >
            {/* Custom Header for Services */}
            <div className="
                pt-8 pb-8 
                flex flex-col md:flex-row md:justify-between md:items-end 
                z-30 sticky top-24 
                bg-bg/95 backdrop-blur-md 
                transition-all duration-300
                -mx-2 md:-mx-4 px-4 md:px-8 border-b border-white/5 mb-8
            ">
                <div className="clay-button px-8 py-4 inline-flex flex-col items-start active:scale-100 cursor-default shadow-clay-sm border border-white/5">
                    <h2 className="text-[16px] font-bold tracking-[0.2em] text-text-main uppercase">Contracting & Services</h2>
                </div>
                
                <div className="flex items-center gap-3 mt-4 md:mt-0 px-4 py-2 bg-black/20 rounded-lg border border-white/5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[11px] font-mono text-text-dim uppercase tracking-wide">Available for Q1/Q2/Q3/+</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                {SERVICES.map((service, i) => (
                    <ServiceCard key={service.id} service={service} index={i} />
                ))}
            </div>

            {/* Engagement Models */}
            <div className="mb-20">
                <div className="flex items-center gap-4 mb-8 opacity-50">
                    <div className="h-[1px] flex-grow bg-white/20"></div>
                    <span className="text-[10px] font-mono text-text-dim uppercase tracking-widest">Engagement Models</span>
                    <div className="h-[1px] flex-grow bg-white/20"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="clay-card p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center">
                        <h4 className="text-[14px] font-bold text-white uppercase tracking-wide mb-2">Project Based</h4>
                        <p className="text-[11px] text-[#888] leading-relaxed">
                            Fixed scope execution for distinct deliverables. Ideal for MVP builds and specific modules.
                        </p>
                    </div>
                    <div className="clay-card p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 bg-text-accent/10 blur-[40px] rounded-full pointer-events-none"></div>
                        <h4 className="text-[14px] font-bold text-white uppercase tracking-wide mb-2">Retainer / Advisory</h4>
                        <p className="text-[11px] text-[#888] leading-relaxed">
                            Ongoing technical direction, architectural oversight, and team augmentation.
                        </p>
                    </div>
                    <div className="clay-card p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center">
                        <h4 className="text-[14px] font-bold text-white uppercase tracking-wide mb-2">Hourly Consult</h4>
                        <p className="text-[11px] text-[#888] leading-relaxed">
                            Targeted problem solving, code review, and implementation strategy sessions.
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="clay-inset p-10 rounded-[32px] border border-white/5 flex flex-col items-center text-center mb-12">
                <h3 className="text-[24px] font-bold text-white mb-4">Initialize Collaboration</h3>
                <p className="text-[13px] text-[#999] max-w-md mb-8 leading-relaxed">
                    Direct communication line. No agencies. No middlemen. You are speaking directly with the engineer.
                </p>
                <a 
                    href="mailto:devaux.mail@gmail.com" 
                    className="clay-button px-8 py-4 text-[12px] font-bold text-text-main uppercase tracking-widest hover:text-white hover:scale-105 transition-all border border-white/5"
                >
                    devaux.mail@gmail.com
                </a>
            </div>
        </motion.div>
    );
};

const ServiceCard: React.FC<{ service: ServiceItem; index: number }> = ({ service, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative flex flex-col p-8 rounded-[24px] clay-card border border-white/5 hover:border-white/20 transition-all duration-300 min-h-[320px]"
        >
            <div className="flex justify-between items-start mb-6">
                <div className="px-3 py-1 rounded-full clay-inset-sm text-[10px] font-mono text-text-dim uppercase tracking-wider">
                    Service_{index + 1 < 10 ? `0${index + 1}` : index + 1}
                </div>
            </div>

            <h3 className="text-[20px] font-bold text-text-main mb-4 group-hover:text-glow transition-all">
                {service.title}
            </h3>
            
            <p className="text-[13px] leading-[1.7] text-[#999] mb-8 font-medium">
                {service.description}
            </p>

            <div className="mt-auto flex flex-col gap-6">
                {/* Deliverables */}
                <div>
                    <span className="text-[9px] font-bold text-text-dim uppercase tracking-widest mb-3 block opacity-70">
                        Deliverables
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {service.deliverables.map(d => (
                            <span key={d} className="px-2 py-1 bg-white/5 rounded text-[10px] text-[#ccc] border border-white/5">
                                {d}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                        <span className="text-[9px] font-bold text-text-accent uppercase tracking-widest flex-shrink-0">
                            Toolkit ::
                        </span>
                        {service.techStack.map((tech, i) => (
                            <span key={tech} className="text-[10px] font-mono text-text-dim whitespace-nowrap">
                                {tech}{i < service.techStack.length - 1 ? ' / ' : ''}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Services;

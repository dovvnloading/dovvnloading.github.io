
import React from 'react';
import { Project } from '../types';
import { trackEvent, METRIC_KEYS } from '../utils/metrics';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const isStatCard = project.domain === 'community';

    const handleProjectClick = () => {
        trackEvent(METRIC_KEYS.PROJECT_CLICKS);
    };

    const CardContent = () => (
        <>
            <div className="flex justify-between items-center mb-6 text-[10px] text-text-dim uppercase tracking-wider font-mono pointer-events-none">
                <span className="px-3 py-1 rounded-full clay-inset-sm">{project.metaLeft}</span>
                {project.metaRight && <span className="px-3 py-1 rounded-full clay-inset-sm">{project.metaRight}</span>}
            </div>

            {isStatCard ? (
                <div className="flex-grow flex items-center justify-center my-6">
                    <h3 className="text-[48px] font-bold leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)] pointer-events-none">
                        {project.stat}
                    </h3>
                </div>
            ) : (
                <h3 className="text-[18px] font-bold text-text-main mb-4 pointer-events-none group-hover:text-glow transition-all duration-300">
                    {project.title}
                </h3>
            )}

            <p className="text-[13px] leading-relaxed text-[#999] mb-8 flex-grow pointer-events-none font-medium">
                {project.description}
            </p>

            <div className="flex flex-col gap-3 mb-6 z-20 relative font-mono text-[10px] text-text-main uppercase">
                {project.repoUrl && (
                    <a 
                        href={project.repoUrl} 
                        onClick={handleProjectClick}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center justify-center w-full py-3 rounded-xl clay-button hover:text-white transition-all duration-200 active:clay-inset"
                    >
                        VIEW SOURCE
                    </a>
                )}
                
                {project.demoUrl && (
                    <a 
                        href={project.demoUrl} 
                        onClick={handleProjectClick}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center justify-center w-full py-3 rounded-xl clay-button hover:text-white transition-all duration-200 active:clay-inset"
                    >
                        LAUNCH APP
                    </a>
                )}

                {project.link && !project.repoUrl && !project.demoUrl && (
                    <a 
                        href={project.link}
                        onClick={handleProjectClick}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full py-3 rounded-xl clay-button hover:text-white transition-all duration-200 group-hover:bg-white/5 active:clay-inset"
                    >
                        {project.linkLabel ? project.linkLabel.replace(/::|->/g, '').trim() : 'VIEW PROJECT'}
                    </a>
                )}
            </div>

            {!isStatCard && (
                <div className="flex flex-wrap gap-2 mt-auto pointer-events-none">
                    {project.tags.map((tag) => (
                        <span 
                            key={tag} 
                            className="text-[9px] px-3 py-1.5 rounded-full clay-inset-sm text-[#777] uppercase font-bold tracking-tight"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </>
    );

    // Removed any transforms from the card itself
    // Update: Increased min-h to 440px to handle richer text descriptions without cramping
    const baseClasses = "relative p-8 flex flex-col h-full min-h-[440px] group clay-card";

    if (project.isPrime) {
        return (
            <article className={`${baseClasses} col-span-1 md:col-span-full min-h-[340px] md:flex-row md:items-start md:gap-8`}>
                <div className="flex-1 flex flex-col h-full">
                    {CardContent()}
                </div>
                {/* Decorative Element for Prime Cards */}
                <div className="hidden md:block w-[1px] h-full clay-inset mx-4"></div>
                <div className="hidden md:flex flex-col justify-center items-center w-[120px] opacity-30">
                     <div className="w-16 h-16 rounded-full clay-inset flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-text-accent shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                     </div>
                </div>
            </article>
        );
    }

    return (
        <article className={baseClasses}>
            <CardContent />
        </article>
    );
};

export default ProjectCard;
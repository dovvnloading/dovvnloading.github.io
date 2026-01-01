
import React, { useState } from 'react';
import { getMetric, METRIC_KEYS } from '../utils/metrics';

const Footer: React.FC = () => {
    const [showStats, setShowStats] = useState(false);
    const [statsCount, setStatsCount] = useState<number | null>(null);
    const [emailCopied, setEmailCopied] = useState(false);

    const handleSecretClick = async (e: React.MouseEvent) => {
        if (e.shiftKey) {
            e.preventDefault();
            if (!showStats) {
                // Fetch the APP_LOADS metric to match the dashboard
                const count = await getMetric(METRIC_KEYS.APP_LOADS);
                setStatsCount(count);
            }
            setShowStats(!showStats);
        }
    };

    const handleEmailClick = (e: React.MouseEvent) => {
        // Copy email to clipboard for better UX
        navigator.clipboard.writeText('devaux.mail@gmail.com');
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
    };

    return (
        <footer className="w-full clay-card p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 mb-8 border border-white/5">
            <div 
                id="status-node" 
                className="text-text-dim text-[11px] relative z-50 cursor-pointer select-none font-mono py-2 px-4 rounded-full clay-inset-sm hover:text-text-main transition-colors"
                onClick={handleSecretClick}
                title="Shift+Click for System Reference"
            >
                © 2024 MATTHEW WESNEY
                {showStats && (
                    <span className="text-text-accent ml-3 font-semibold animate-pulse">
                        [SYS REF: {statsCount !== null ? statsCount.toLocaleString() : 'SYNC...'}]
                    </span>
                )}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
                {[
                    { label: 'GITHUB', href: 'https://github.com/dovvnloading' },
                    { label: 'TWITTER', href: 'https://x.com/D3VAUX' }
                ].map(link => (
                    <a 
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-dim no-underline text-[11px] font-bold px-4 py-2 rounded-xl clay-button hover:text-text-accent hover:border-white/10 border border-transparent transition-all duration-200 interactive-target"
                    >
                        {link.label}
                    </a>
                ))}
                
                <a 
                    href="mailto:devaux.mail@gmail.com"
                    onClick={handleEmailClick}
                    className={`
                        text-[11px] font-bold px-4 py-2 rounded-xl border border-transparent transition-all duration-200 interactive-target no-underline
                        ${emailCopied 
                            ? 'clay-inset text-text-accent border-white/10' 
                            : 'clay-button text-text-dim hover:text-text-accent hover:border-white/10'
                        }
                    `}
                >
                    {emailCopied ? 'COPIED TO CLIPBOARD' : 'DEVAUX.MAIL@GMAIL.COM'}
                </a>
            </div>
        </footer>
    );
};

export default Footer;

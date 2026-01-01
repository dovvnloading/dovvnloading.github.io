
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMetric, METRIC_KEYS } from '../utils/metrics';

interface MetricData {
    label: string;
    key: string;
    value: number | null;
    desc: string;
}

const DevMetrics: React.FC = () => {
    const [metrics, setMetrics] = useState<MetricData[]>([
        { label: 'SYSTEM_INIT', key: METRIC_KEYS.APP_LOADS, value: null, desc: 'Total application initialization sequences.' },
        { label: 'NAV_CYCLE', key: METRIC_KEYS.NAV_SWITCHES, value: null, desc: 'Internal routing events and tab switches.' },
        { label: 'OUTBOUND_SIG', key: METRIC_KEYS.PROJECT_CLICKS, value: null, desc: 'External link actuations via project cards.' },
        { label: 'STREAM_OPS', key: METRIC_KEYS.STREAM_INTERACTIONS, value: null, desc: 'Asset stream view events and lightboxes.' },
    ]);
    const [lastSync, setLastSync] = useState<string>('');
    const [logs, setLogs] = useState<string[]>([]);
    
    // Use ref to keep track of mounted state
    const isMounted = useRef(true);

    const addLog = (msg: string) => {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
        const ms = now.getMilliseconds().toString().padStart(3, '0');
        setLogs(prev => [`[${time}.${ms}] ${msg}`, ...prev].slice(0, 8));
    };

    const updateSingleMetric = (key: string, value: number) => {
        setMetrics(prev => prev.map(m => {
            if (m.key === key) {
                // Only update if the new value is greater (prevents local/remote sync jitter)
                const current = m.value || 0;
                return { ...m, value: Math.max(current, value) };
            }
            return m;
        }));
    };

    useEffect(() => {
        isMounted.current = true;

        const fetchAll = async () => {
            if (!isMounted.current) return;
            const timestamp = new Date().toISOString();
            setLastSync(timestamp);
            
            // Parallel fetch
            const updated = await Promise.all(metrics.map(async (m) => {
                const count = await getMetric(m.key);
                return { ...m, value: count };
            }));
            
            if (isMounted.current) {
                setMetrics(updated);
                // Only log sync if it's not the initial mount to avoid spam
                if (logs.length > 0) addLog(`SYNC_COMPLETE: REMOTE_ORIGIN`);
            }
        };

        // 1. Initial Load
        fetchAll();
        addLog('ESTABLISHING SECURE CONNECTION...');
        addLog('SUBSCRIPTION_ACTIVE: METRIC_STREAM_V1');

        // 2. Polling interval (every 5 seconds) to catch remote changes
        const interval = setInterval(fetchAll, 5000);

        // 3. Listen for local events for INSTANT updates
        const handleLocalUpdate = (e: any) => {
             const { key, value } = e.detail;
             updateSingleMetric(key, value);
             
             // Extract short key name for log
             const shortKey = key.replace('global_', '').toUpperCase();
             addLog(`EVENT_CAPTURED: ${shortKey} >> VAL:${value}`);
        };
        
        window.addEventListener('metric-update', handleLocalUpdate);

        return () => {
            isMounted.current = false;
            clearInterval(interval);
            window.removeEventListener('metric-update', handleLocalUpdate);
        };
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="w-full min-h-[60vh] flex flex-col gap-8"
        >
            {/* Header */}
            <div className="flex justify-between items-end border-b border-red-500/20 pb-4">
                <div className="flex flex-col">
                    <h2 className="text-[20px] font-bold text-red-500 tracking-[0.2em] font-mono">
                        // DEV_METRICS_DASHBOARD
                    </h2>
                    <span className="text-[10px] text-red-500/60 font-mono mt-2">
                        AUTH_LEVEL: ROOT_ADMIN /// PERSISTENCE_LAYER: HYBRID
                    </span>
                </div>
                <div className="text-[10px] font-mono text-red-500/40 text-right">
                    LAST_SYNC: {lastSync || 'INITIALIZING...'}<br/>
                    NODE: COUNTERAPI_V1
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {metrics.map((m) => (
                    <div 
                        key={m.key}
                        className="bg-black/40 border border-red-500/10 p-6 rounded-lg relative overflow-hidden group hover:border-red-500/30 transition-colors"
                    >
                        {/* Scanline effect */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(255,0,0,0.02),rgba(255,0,0,0.06))] z-0 pointer-events-none bg-[length:100%_4px,3px_100%]"></div>
                        
                        <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                            <div className="flex justify-between items-start">
                                <span className="text-[10px] text-red-500 font-mono border border-red-500/30 px-2 py-1 rounded bg-red-500/5">
                                    {m.label}
                                </span>
                                <div className="w-2 h-2 bg-red-500/50 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-[48px] font-mono text-white/90 font-bold tracking-tighter tabular-nums drop-shadow-[0_0_10px_rgba(239,68,68,0.4)]">
                                    {m.value !== null ? m.value.toLocaleString() : '----'}
                                </span>
                                <span className="text-[10px] font-mono text-red-400/60 uppercase tracking-widest mt-1">
                                    Total Events Logged
                                </span>
                            </div>

                            <p className="text-[11px] font-mono text-gray-500 border-t border-red-500/10 pt-4 mt-2">
                                {m.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Terminal Output */}
            <div className="w-full bg-[#0a0a0a] rounded-xl border border-white/5 p-6 font-mono text-[11px] text-gray-400 flex flex-col gap-1 shadow-inner h-[240px] overflow-hidden relative">
                 <div className="absolute top-0 left-0 right-0 h-8 bg-white/5 flex items-center justify-between px-4 border-b border-white/5 z-20">
                    <span className="text-gray-500">sys_log.txt</span>
                    <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
                        <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
                    </div>
                 </div>
                 
                 <div className="mt-8 flex flex-col gap-1 opacity-90 overflow-hidden relative h-full">
                    <AnimatePresence initial={false}>
                        {logs.map((log, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`whitespace-nowrap ${i === 0 ? 'text-red-400 font-bold' : 'text-gray-500'}`}
                            >
                                <span className="mr-2 text-red-500/50">&gt;</span>
                                {log}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                 </div>
                 
                 {/* Terminal Cursor Line */}
                 <div className="mt-auto flex items-center text-red-500/50 pt-2 border-t border-white/5">
                    <span>root@graphite:~$</span>
                    <span className="ml-2 w-2 h-4 bg-red-500/50 animate-pulse"></span>
                 </div>
            </div>
        </motion.div>
    );
};

export default DevMetrics;

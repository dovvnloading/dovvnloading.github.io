
const NAMESPACE = 'matthew_wesney_portfolio_v1';
const BASE_URL = 'https://api.counterapi.dev/v1';
const LOCAL_PREFIX = 'mw_sys_metric_';

export const METRIC_KEYS = {
    APP_LOADS: 'global_app_loads',
    PROJECT_CLICKS: 'global_project_clicks',
    STREAM_INTERACTIONS: 'global_stream_views',
    NAV_SWITCHES: 'global_nav_switches'
};

export const trackEvent = async (key: string) => {
    // 1. Local update for immediate feedback (Optimistic UI)
    let currentVal = 0;
    try {
        const localKey = LOCAL_PREFIX + key;
        const saved = localStorage.getItem(localKey);
        currentVal = saved ? parseInt(saved, 10) : 0;
        const newVal = currentVal + 1;
        localStorage.setItem(localKey, newVal.toString());
        
        // Dispatch event for active listeners (like DevMetrics) to update instantly
        // independently of the network request
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('metric-update', { 
                detail: { key, value: newVal } 
            }));
        }
    } catch (e) {
        console.warn('Local storage write failed', e);
    }

    // 2. Remote update (Fire and forget)
    // We try to sync with the global counter, but don't block the UI if it fails
    try {
        await fetch(`${BASE_URL}/${NAMESPACE}/${key}/up`);
    } catch (err) {
        console.warn('Remote metric sync failed', err);
    }
};

export const getMetric = async (key: string): Promise<number> => {
    let remoteVal = 0;
    let localVal = 0;

    // Fetch Remote
    try {
        const res = await fetch(`${BASE_URL}/${NAMESPACE}/${key}`);
        if (res.ok) {
            const data = await res.json();
            remoteVal = data.count;
        }
    } catch (e) {
        // Silent fail - likely adblocker or network issue
    }

    // Fetch Local
    try {
        localVal = parseInt(localStorage.getItem(LOCAL_PREFIX + key) || '0', 10);
    } catch (e) {}

    // Return the max value to ensure we always show the most "advanced" state known 
    // (e.g., if remote is down, show local; if remote is higher due to other users, show remote)
    return Math.max(remoteVal, localVal);
};

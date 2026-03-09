import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { pagesConfig } from '../pages.config';

export default function NavigationTracker() {
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    const { Pages, mainPage } = pagesConfig;
    const mainPageKey = mainPage ?? Object.keys(Pages)[0];

    // Post navigation changes to parent window
    useEffect(() => {
        window.parent?.postMessage(
            { type: 'app_changed_url', url: window.location.href },
            '*'
        );
    }, [location]);

    // Log user navigation events
    useEffect(() => {
        const pathname = location.pathname;
        let pageName =
            pathname === '/' || pathname === ''
                ? mainPageKey
                : pathname.replace(/^\//, '').split('/')[0];

        if (isAuthenticated && pageName) {
            // Send navigation analytics to your Worker
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/analytics/track`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ event: 'page_view', pageName, timestamp: Date.now() })
            }).catch(() => {
                // fail silently
            });
        }
    }, [location, isAuthenticated, mainPageKey, Pages]);

    return null;
}
import { appParams } from '../lib/app-params';

// Get the full base API URL
const API_BASE = appParams.serverUrl || 'http://127.0.0.1:8787';

export async function getCurrentUser() {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE}/api/user/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) return null;
        return res.json();
    } catch (err) {
        console.error('Error fetching user:', err);
        return null;
    }
}

export async function logUserActivity(page) {
    try {
        await fetch(`${API_BASE}/api/analytics/track/batch`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ page, timestamp: Date.now() })
        });
    } catch (err) {
        console.error('Error logging activity:', err);
    }
}

export async function getAppPublicSettings(appId = appParams.appId) {
    if (!appId) return null; // safety check

    try {
        // Use relative URL so Vite proxy handles CORS
        const res = await fetch(`/api/apps/public/prod/public-settings/by-id/${appId}`);

        if (!res.ok) {
            console.error('Failed to fetch public settings, status:', res.status);
            return null;
        }

        const data = await res.json();
        console.log('Fetched public settings:', data);
        return data;
    } catch (err) {
        console.error('Error fetching public settings:', err);
        return null;
    }
}
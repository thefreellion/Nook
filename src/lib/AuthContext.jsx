import React, { createContext, useState, useContext, useEffect } from 'react';
import { appParams } from './app-params';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);
    const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
    const [authError, setAuthError] = useState(null);
    const [appPublicSettings, setAppPublicSettings] = useState(null);

    useEffect(() => {
        checkAppState();
    }, []);

    const checkAppState = async () => {
        try {
            setIsLoadingPublicSettings(true);
            setAuthError(null);

            // 1️⃣ Fetch public settings
            const res = await fetch(`${appParams.backendUrl}/api/apps/public/prod/public-settings/by-id/${appParams.appId}`);
            if (!res.ok) throw new Error('Failed to load app public settings');
            const publicSettings = await res.json();
            setAppPublicSettings(publicSettings);

            // 2️⃣ Check user auth if token exists
            if (appParams.token) {
                await checkUserAuth();
            } else {
                setIsAuthenticated(false);
                setIsLoadingAuth(false);
            }

            setIsLoadingPublicSettings(false);
        } catch (error) {
            console.error('App state check failed:', error);
            setAuthError({ type: 'unknown', message: error.message });
            setIsLoadingPublicSettings(false);
            setIsLoadingAuth(false);
        }
    };

    const checkUserAuth = async () => {
        setIsLoadingAuth(true);
        try {
            const res = await fetch(`${appParams.backendUrl}/api/user/me`, {
                headers: { Authorization: `Bearer ${appParams.token}` }
            });
            if (!res.ok) throw new Error('User not authenticated');
            const currentUser = await res.json();
            setUser(currentUser);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('User auth check failed:', error);
            setUser(null);
            setIsAuthenticated(false);
            setAuthError({ type: 'auth_required', message: 'Authentication required' });
        } finally {
            setIsLoadingAuth(false);
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        // Remove token from storage or context
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoadingAuth,
                isLoadingPublicSettings,
                authError,
                appPublicSettings,
                logout,
                checkAppState
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
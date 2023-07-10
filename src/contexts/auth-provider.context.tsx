import Connection from '@api/providers/maslow/connection';
import { ClientBasic } from '@api/resources/clients/client.interface';
import { Profile } from '@api/resources/session/domain/profile/profile.interface';
import UserRole from '@api/resources/users/domain/user-role.enum';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAppProviderContext } from './app-provider.context';

export const TOKEN_KEY = 'token';
export const EXPIRED_AT_TOKEN = 'expired_at';
export const PROFILE_KEY = 'profile';
export const CURRENT_CLIENT = 'current_client';

export interface AuthContext {
    isAuthenticated: boolean;
    role: UserRole | null;
    profile: Profile | null;
    currentClient: ClientBasic | null;
    clients: ClientBasic[];
    selectCurrentClient: (clientId: number) => void;
    authenticated: (token: string, expiredAt: Date, sessionProfile: Profile) => void;
    logout: () => void;
}

const context = createContext<AuthContext>({} as AuthContext);

export default function AuthProvider() {
    const navigate = useNavigate();
    const { cache } = useAppProviderContext();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!cache.get<string>(TOKEN_KEY));
    const [profile, setProfile] = useState<Profile | null>(cache.get<Profile>(PROFILE_KEY));
    const [role, setRole] = useState<UserRole | null>(profile?.user?.role ?? null);
    const [clients, setClients] = useState<ClientBasic[]>(profile?.clients ?? []);
    const [currentClient, setCurrentClient] = useState<ClientBasic | null>(
        cache.get<ClientBasic>(CURRENT_CLIENT) ?? null,
    );

    useEffect(() => {
        const token = cache.get<string>(TOKEN_KEY);
        const expiredAt = cache.get<number>(EXPIRED_AT_TOKEN);

        if (token && expiredAt) {
            Connection.bearerToken = token;

            setRole(profile?.user?.role ?? null);
            setClients(profile?.clients ?? []);

            const expiredAtDate = new Date(expiredAt);

            if (expiredAtDate.getTime() > new Date().getTime()) {
                setIsAuthenticated(true);
            }

            if (currentClient) {
                Connection.clientId = currentClient?.id;
            }
        }
    }, []);

    const selectCurrentClient = useCallback((clientId: number) => {
        const client = clients.find((c) => c.id === clientId);

        console.log('selectCurrentClient', client);

        if (client) {
            cache.set(CURRENT_CLIENT, client);

            setCurrentClient(client);
            Connection.clientId = client.id;
        }
    }, []);

    useEffect(() => {
        const userRolesToSelectClient: UserRole[] = [UserRole.MANAGER, UserRole.COORDINATOR, UserRole.SUPER_ADMIN];

        if (!isAuthenticated) {
            navigate('/');
            return;
        }

        if (userRolesToSelectClient.includes(role as UserRole) && currentClient === null) {
            navigate('/client-selector');
        } else {
            switch (role) {
                case UserRole.ADMIN:
                    if (!window.location.pathname.match(/^\/client(.*)?$/i)) {
                        navigate('/client');
                    }
                    break;
                case UserRole.MANAGER:
                    if (!window.location.pathname.match(/^\/manager(.*)?$/i)) {
                        navigate('/manager');
                    }
                    break;
                case UserRole.COORDINATOR:
                case UserRole.SUPER_ADMIN:
                    if (!window.location.pathname.match(/^\/coordinator(.*)?$/i)) {
                        navigate('/coordinator');
                    }
                    break;
            }
        }
    }, [isAuthenticated, currentClient, selectCurrentClient]);

    const logout = useCallback(() => {
        cache.remove(TOKEN_KEY);
        cache.remove(EXPIRED_AT_TOKEN);
        cache.remove(PROFILE_KEY);
        cache.remove(CURRENT_CLIENT);

        setIsAuthenticated(false);
        setProfile(null);
        setRole(null);
        setClients([]);
        setCurrentClient(null);
    }, []);

    const authenticated = useCallback((token: string, expiredAt: Date, sessionProfile: Profile) => {
        cache.set({
            [TOKEN_KEY]: token,
            [EXPIRED_AT_TOKEN]: expiredAt.getTime(),
            [PROFILE_KEY]: sessionProfile,
        });

        Connection.bearerToken = token;

        setProfile(sessionProfile);
        setRole(sessionProfile?.user?.role ?? null);
        setClients(sessionProfile?.clients ?? []);
        setIsAuthenticated(true);
    }, []);

    const value = useMemo(
        () => ({ authenticated, logout, clients, isAuthenticated, profile, role, selectCurrentClient, currentClient }),
        [isAuthenticated, authenticated, profile, role, selectCurrentClient, currentClient],
    );

    return (
        <context.Provider value={value}>
            <Outlet />
        </context.Provider>
    );
}

export function useAuthProviderContext() {
    return useContext(context);
}

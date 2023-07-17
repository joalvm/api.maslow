import Connection from '@api/providers/maslow/connection';
import { ClientBasic } from '@api/resources/clients/client.interface';
import { Profile } from '@api/resources/session/domain/profile/profile.interface';
import UserRole from '@api/resources/users/domain/user-role.enum';
import getUserNavigationItems from '@app/utils/navigation/get-user-navigation-items';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppContext } from './app-provider.context';

export const TOKEN_KEY = 'token';
export const EXPIRED_AT_TOKEN = 'expired_at';
export const PROFILE_KEY = 'profile';
export const CURRENT_CLIENT = 'current_client';

export interface AuthContext {
    isAuthenticated: boolean;
    role: UserRole | undefined;
    profile: Profile | null;
    currentClient: ClientBasic | null;
    clients: ClientBasic[];
    userNavigationItems: ReturnType<typeof getUserNavigationItems>;
    selectCurrentClient: (clientId: number) => void;
    authenticated: (token: string, expiredAt: Date, sessionProfile: Profile) => void;
    logout: () => void;
}

const context = createContext<AuthContext>({} as AuthContext);

export default function AuthProvider() {
    const { cache } = useAppContext();

    const token = cache.get<string>(TOKEN_KEY);
    const expiredAt = cache.get<number>(EXPIRED_AT_TOKEN);

    const [profile, setProfile] = useState(cache.get<Profile>(PROFILE_KEY));
    const [currentClient, setCurrentClient] = useState(cache.get<ClientBasic>(CURRENT_CLIENT));

    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    const [role, setRole] = useState(profile?.user?.role);
    const [clients, setClients] = useState(profile?.clients ?? []);

    const logout = () => {
        cache.remove(TOKEN_KEY);
        cache.remove(EXPIRED_AT_TOKEN);
        cache.remove(PROFILE_KEY);
        cache.remove(CURRENT_CLIENT);

        setIsAuthenticated(false);
        setProfile(null);
        setRole(undefined);
        setClients([]);
        setCurrentClient(null);
    };

    useEffect(() => {
        if (token && expiredAt) {
            if (new Date().getTime() > expiredAt) {
                logout();
                return;
            }

            Connection.bearerToken = token;

            setRole(profile?.user?.role);
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

    const selectCurrentClient = (clientId: number) => {
        const client = clients.find((c) => c.id === clientId);

        if (client) {
            cache.set(CURRENT_CLIENT, client);

            setCurrentClient(client);
            Connection.clientId = client.id;
        }
    };

    const authenticated = (bearerToken: string, sessionExpireAt: Date, sessionProfile: Profile) => {
        cache.set({
            [TOKEN_KEY]: bearerToken,
            [EXPIRED_AT_TOKEN]: sessionExpireAt.getTime(),
            [PROFILE_KEY]: sessionProfile,
        });

        Connection.bearerToken = bearerToken;

        setProfile(sessionProfile);
        setRole(sessionProfile?.user?.role ?? null);
        setClients(sessionProfile?.clients ?? []);
        setIsAuthenticated(true);
    };

    const userNavigationItems = useMemo(() => getUserNavigationItems(role), [role]);

    const value = useMemo(
        () => ({
            authenticated,
            logout,
            clients,
            isAuthenticated,
            profile,
            role,
            selectCurrentClient,
            currentClient,
            userNavigationItems,
        }),
        [isAuthenticated, authenticated, profile, role, clients, setClients, selectCurrentClient, currentClient],
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

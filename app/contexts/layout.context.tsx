import AdminLayout from '@layout/admin.layout';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppContext } from './app.context';
import NotifierProvider from './notifier.context';

export const SIDEBAR_WIDTH = 240;
export const SIDEBAR_STATUS_KEY = 'sidebar_opened';

export interface LayoutContext {
    isMobile: boolean;
    sidebarOpened: boolean;
    toggleSidebarOpened: () => void;
    setSidebarOpened: Dispatch<SetStateAction<boolean>>;
}

const context = createContext<LayoutContext>({} as LayoutContext);

export default function LayoutProvider() {
    const { cache } = useAppContext();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const currentSidebarOpened = cache.get<boolean>(SIDEBAR_STATUS_KEY);

    const [sidebarOpened, setSidebarOpened] = useState<boolean>(
        currentSidebarOpened !== null ? currentSidebarOpened : !isMobile,
    );

    const toggleSidebarOpened = () => {
        setSidebarOpened((prev: boolean) => {
            const newPrev = !prev;

            cache.set(SIDEBAR_STATUS_KEY, newPrev);

            return newPrev;
        });
    };

    const value = useMemo(
        () => ({ isMobile, sidebarOpened, toggleSidebarOpened, setSidebarOpened }),
        [isMobile, sidebarOpened, toggleSidebarOpened],
    );

    return (
        <context.Provider value={value}>
            <NotifierProvider>
                <AdminLayout>
                    <Outlet />
                </AdminLayout>
            </NotifierProvider>
        </context.Provider>
    );
}

export function useLayoutContext() {
    return useContext(context);
}

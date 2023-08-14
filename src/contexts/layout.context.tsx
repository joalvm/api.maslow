import AdminLayout from '@layout/admin.layout';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

import NotifierProvider from './notifier.context';

export const SIDEBAR_WIDTH = 240;

export interface LayoutContext {
    isMobile: boolean;
    sidebarOpened: boolean;
    toggleSidebarOpened: () => void;
    setSidebarOpened: Dispatch<SetStateAction<boolean>>;
}

const context = createContext<LayoutContext>({} as LayoutContext);

export default function LayoutProvider() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [sidebarOpened, setSidebarOpened] = useState<boolean>(!isMobile);

    const toggleSidebarOpened = () => {
        setSidebarOpened((prev: boolean) => !prev);
    };

    const value = useMemo(
        () => ({ isMobile, sidebarOpened, toggleSidebarOpened, setSidebarOpened }),
        [isMobile, sidebarOpened],
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

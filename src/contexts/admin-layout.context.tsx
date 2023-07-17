import AdminLayout from '@app/layout/admin.layout';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

export const SIDEBAR_WIDTH = 240;

export interface AdminLayoutContext {
    isMobile: boolean;
    sidebarOpened: boolean;
    toggleSidebarOpened: () => void;
    setSidebarOpened: Dispatch<SetStateAction<boolean>>;
}

const context = createContext<AdminLayoutContext>({} as AdminLayoutContext);

export default function AdminLayoutProvider() {
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
            <AdminLayout>
                <Outlet />
            </AdminLayout>
        </context.Provider>
    );
}

export function useAdminLayoutContext() {
    return useContext(context);
}

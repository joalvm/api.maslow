import AdminLayoutProvider from '@app/contexts/admin-layout.context';
import AuthProvider from '@app/contexts/auth-provider.context';
import ClientSelectorPage from '@app/pages/client-selector/client-selector.page';
import RootBoundary from '@app/pages/errors/error-root-boundary';
import LoginPage from '@app/pages/login/login.page';
import RolesBoundary from '@app/pages/roles-boundary';
import { RouteObject } from 'react-router-dom';
import { v4 } from 'uuid';

import navigator from './navigation';
import coordinatorRouter from './routes/coordinator.route';

export default [
    {
        id: v4(),
        element: <AuthProvider />,
        ErrorBoundary: RootBoundary,
        children: [
            {
                id: v4(),
                element: <RolesBoundary />,
                children: [
                    {
                        id: navigator.home.id,
                        path: navigator.home.path,
                        element: <LoginPage />,
                    },
                    {
                        id: navigator.clientSelector.id,
                        path: navigator.clientSelector.path,
                        element: <ClientSelectorPage />,
                    },
                    {
                        element: <AdminLayoutProvider />,
                        children: [coordinatorRouter],
                    },
                ],
            },
        ],
    },
] as RouteObject[];

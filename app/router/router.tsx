import LayoutProvider from '@contexts/layout.context';
import AuthProvider from '@contexts/auth.context';
import ClientSelectorPage from '@pages/client-selector/client-selector.page';
import RootBoundary from '@pages/errors/error-root-boundary';
import LoginPage from '@pages/login/login.page';
import RolesBoundary from '@pages/roles-boundary';
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
                        element: <LayoutProvider />,
                        children: [coordinatorRouter],
                    },
                ],
            },
        ],
    },
] as RouteObject[];

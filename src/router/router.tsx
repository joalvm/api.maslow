import AuthProvider from '@app/contexts/auth-provider.context';
import ClientSelectorPage from '@app/pages/client-selector/client-selector.page';
// import AdminLayout from '@app/layouts/admin/admin.layout';
// import AdminLayoutContextProvider from '@app/layouts/admin/admin-layout.context';
// import ClientSelectorPage from '@app/pages/client-selector/client-selector.page';
import RootBoundary from '@app/pages/errors/error-root-boundary';
import LoginPage from '@app/pages/login/login.page';
import { RouteObject } from 'react-router-dom';
import { v4 } from 'uuid';

// import clientRouter from './client.router';
// import coordinatorRouter from './coordinator.router';
// import managerRouter from './manager.router';
import { clientSelector, root } from './navigator';

export default [
    {
        id: v4(),
        element: <AuthProvider />,
        ErrorBoundary: RootBoundary,
        children: [
            {
                id: root.id,
                path: root.path,
                element: <LoginPage />,
            },
            {
                id: clientSelector.id,
                path: clientSelector.path,
                element: <ClientSelectorPage />,
            },
            // {
            //     id: v4(),
            //     element: (
            //         <AdminLayoutContextProvider>
            //             <AdminLayout />
            //         </AdminLayoutContextProvider>
            //     ),
            //     children: [coordinatorRouter, managerRouter, clientRouter],
            // },
        ],
    },
] as RouteObject[];

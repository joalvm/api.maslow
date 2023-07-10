import ClientPage from '@app/pages/client/client.page';
import { RouteObject } from 'react-router-dom';

import clientNavigator from './client.navigator';

export default {
    id: clientNavigator.id,
    path: clientNavigator.path,
    element: <ClientPage />,
    children: [],
} as RouteObject;

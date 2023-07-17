import ClientPage from '@app/pages/client/client.page';
import { RouteObject } from 'react-router-dom';

import nav from '../navigation/client.navigate';

export default {
    id: nav.index.id,
    path: nav.index.path,
    element: <ClientPage />,
    children: [],
} as RouteObject;

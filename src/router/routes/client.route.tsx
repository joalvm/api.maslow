import ClientPage from '@app/pages/client/client.page';
import { RouteObject } from 'react-router-dom';

import { index, profile } from '../navigation/client.navigate';

export default {
    id: index.id,
    path: index.path,
    children: [
        {
            index: true,
            element: <ClientPage />,
        },
        {
            id: profile.id,
            path: profile.path,
            element: <div>Profile</div>,
        },
    ],
} as RouteObject;

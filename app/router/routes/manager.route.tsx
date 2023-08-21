import ManagerPage from '@pages/manager/manager.page';
import { RouteObject } from 'react-router-dom';

import { index, profile } from '../navigation/manager.navigate';

export default {
    id: index.id,
    path: index.path,
    children: [
        {
            index: true,
            element: <ManagerPage />,
        },
        {
            id: profile.id,
            path: profile.path,
            element: <div>Profile</div>,
        },
    ],
} as RouteObject;

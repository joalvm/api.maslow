import CoordinatorPage from '@app/pages/coordinator/coordinator.page';
import CoordinatorProfilePage from '@app/pages/coordinator/profile/profile.page';
import { RouteObject } from 'react-router-dom';

import { client, index, profile, team } from '../navigation/coordinator.navigate';

const { clients, collaborators, headquartes, workerTypes } = client.children;

export default {
    id: index.id,
    path: index.path,
    children: [
        {
            index: true,
            element: <CoordinatorPage />,
        },
        {
            id: profile.id,
            path: profile.path,
            element: <CoordinatorProfilePage />,
        },
        {
            id: team.id,
            path: team.path,
            element: <div>Team</div>,
        },
        {
            id: client.id,
            path: client.path,
            children: [
                {
                    id: clients.id,
                    index: true,
                    element: <div>Clients</div>,
                },
                {
                    id: collaborators.id,
                    path: collaborators.path,
                    element: <div>Collaborators</div>,
                },
                {
                    id: headquartes.id,
                    path: headquartes.path,
                    element: <div>Headquartes</div>,
                },
                {
                    id: workerTypes.id,
                    path: workerTypes.path,
                    element: <div>Worker Types</div>,
                },
            ],
        },
    ],
} as RouteObject;

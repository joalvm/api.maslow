import CoordinatorPage from '@app/pages/coordinator/coordinator.page';
import { RouteObject } from 'react-router-dom';

import navigator from './coordinator.navigator';

const { root, profile, client, team } = navigator;
const { clients, collaborators, headquartes, workerTypes } = client.children;

export default {
    path: root.path,
    children: [
        {
            id: root.id,
            index: true,
            element: <CoordinatorPage />,
        },
        {
            id: profile.id,
            path: profile.path,
            element: <div>Profile</div>,
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

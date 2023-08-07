import CoordinatorPage from '@pages/coordinator/coordinator.page';
import ProfilePage from '@pages/profile/profile.page';
import { RouteObject } from 'react-router-dom';

import { client, config, incidence, index, profile, team } from '../navigation/coordinator.navigate';

const { clients, collaborators, headquartes, workerTypes, tags } = client.children;
const { attentionTypes, careCenterTypes } = config.children;
const { attentions, incidences, requests } = incidence.children;

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
            element: <ProfilePage />,
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
                {
                    id: tags.id,
                    path: tags.path,
                    element: <div>Tags</div>,
                },
            ],
        },
        {
            id: config.id,
            path: config.path,
            children: [
                {
                    id: attentionTypes.id,
                    path: attentionTypes.path,
                    element: <div>Attention Types</div>,
                },
                {
                    id: careCenterTypes.id,
                    path: careCenterTypes.path,
                    element: <div>Care Center Types</div>,
                },
            ],
        },
        {
            id: incidence.id,
            path: incidence.path,
            children: [
                {
                    index: true,
                    id: incidences.id,
                    element: <div>Incidences</div>,
                },
                {
                    id: attentions.id,
                    path: attentions.path,
                    element: <div>Attentions</div>,
                },
                {
                    id: requests.id,
                    path: requests.path,
                    element: <div>Requests</div>,
                },
            ],
        },
    ],
} as RouteObject;

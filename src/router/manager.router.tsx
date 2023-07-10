import ManagerPage from '@app/pages/manager/manager.page';

import managerNavigator from './manager.navigator';

export default {
    id: managerNavigator.id,
    path: managerNavigator.path,
    element: <ManagerPage />,
    children: [],
};

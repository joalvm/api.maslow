import navItem from '@app/utils/navigation/nav-item.util';

import { NavItems } from './navigation.types';

export default {
    home: navItem('/', 'Home'),
    clientSelector: navItem('/client-selector', 'Seleccionar cliente'),
} as NavItems;

import navInnerItem from '@app/utils/navigation/nav-inner-item.util';

import { NavItems } from './navigation.types';

export default {
    home: navInnerItem('/', 'Home'),
    clientSelector: navInnerItem('/client-selector', 'Seleccionar cliente'),
} as NavItems;

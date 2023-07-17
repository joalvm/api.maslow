import { NavItem, NavItemType } from '@app/router/navigation.types';
import { v4 } from 'uuid';

export default function navInnerItem(path: string, title: string, Icon: NavItem['Icon'] = null): NavItem {
    return {
        id: v4(),
        path,
        title,
        type: NavItemType.inner,
        Icon,
        children: {} as Record<string, NavItem>,
    };
}

import { NavItem, NavItemType } from '@app/router/navigation.types';
import { v4 } from 'uuid';

export default function navItem<C extends Record<string, NavItem>>(
    path: string,
    title: string,
    Icon: NavItem['Icon'] = null,
    children: C = {} as C,
): NavItem {
    return {
        id: v4(),
        path,
        title,
        Icon,
        type: NavItemType.item,
        children,
    };
}

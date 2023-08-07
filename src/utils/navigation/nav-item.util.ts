import { NavItem, NavItemType } from '@router/navigation.types';
import { v4 } from 'uuid';

export default function navItem<C extends Record<string, NavItem>>(
    path: string,
    title: string,
    Icon?: NavItem['Icon'],
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

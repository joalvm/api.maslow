import { NavItem, NavItems, NavItemType } from '@router/navigation.types';
import { v4 } from 'uuid';

export default function navInnerItem(
    path: string,
    title: string,
    Icon?: NavItem['Icon'],
    children: NavItems = {},
): NavItem {
    return {
        id: v4(),
        path,
        title,
        type: NavItemType.inner,
        Icon,
        children,
    };
}

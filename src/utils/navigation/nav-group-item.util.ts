import { NavItem, NavItemType } from '@app/router/navigation.types';
import { v4 } from 'uuid';

export default function navGroupItem<C extends Record<string, NavItem>>(
    path: string,
    title: string,
    Icon: NavItem['Icon'],
    children: C,
): NavItem {
    return {
        id: v4(),
        path,
        title,
        Icon,
        type: NavItemType.group,
        children,
    };
}

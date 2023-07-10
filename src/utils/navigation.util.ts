import { LucideIcon } from 'lucide-react';
import { v4 } from 'uuid';

export function navInnerItem(path: string, title: string) {
    return {
        id: v4(),
        path,
        title,
        type: 'inner',
    };
}

export function navGroupItem<C extends Record<string, unknown>>(
    path: string,
    title: string,
    Icon: LucideIcon,
    children: C,
) {
    return {
        id: v4(),
        path,
        title,
        Icon,
        type: 'group',
        children,
    };
}

export function navItem(
    path: string,
    title: string,
    Icon: LucideIcon | null = null,
    children: Record<string, unknown> = {},
) {
    return {
        id: v4(),
        path,
        title,
        Icon,
        type: 'item',
        children,
    };
}

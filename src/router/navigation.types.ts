import SvgIcon from '@mui/material/SvgIcon';

export enum NavItemType {
    item = 'item',
    group = 'group',
    inner = 'inner',
}

export type NavItem = {
    id: string;
    path: string;
    title: string;
    type: NavItemType;
    Icon?: typeof SvgIcon;
    children: NavItems;
};

export type NavItems = Record<string, NavItem>;

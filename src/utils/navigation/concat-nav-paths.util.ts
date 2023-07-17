import { NavItems } from '@app/router/navigation.types';

export default function concatNavPaths(navs: NavItems, prefix: string) {
    const newNavs: NavItems = {};

    for (const [name, item] of Object.entries(navs)) {
        if (name === 'index') {
            newNavs[name] = { ...item };
            continue;
        }

        if (!item.path.includes(prefix)) {
            item.path = `${prefix}/${item.path}`.replace(/\/+/g, '/').replace(/\/$/, '');
        }

        if (Object.hasOwn(item, 'children')) {
            item.children = concatNavPaths({ ...item?.children }, item.path);
        }

        newNavs[name] = { ...item };
    }

    return newNavs;
}

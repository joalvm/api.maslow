import { esES as coreEsEs } from '@mui/material/locale';
import { createTheme as MUICreateTheme, Theme } from '@mui/material/styles';

import darkPalette from './dark-palette.theme';
import lightPalette from './light-palette.theme';

export default function createTheme(mode: 'dark' | 'light'): Theme {
    const palette = mode === 'dark' ? darkPalette() : lightPalette();

    return MUICreateTheme(
        {
            direction: 'ltr',
            palette,
            components: {},
        },
        coreEsEs,
    );
}

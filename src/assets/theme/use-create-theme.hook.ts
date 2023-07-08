import useMediaQuery from '@mui/material/useMediaQuery';
import { useMemo } from 'react';

import createTheme from './theme';

export default function useCreateTheme() {
    const systemLightMode = useMediaQuery('(prefers-color-scheme: light)');
    const systemMode = systemLightMode ? 'light' : 'dark';

    return useMemo(() => createTheme(systemMode), [systemMode]);
}

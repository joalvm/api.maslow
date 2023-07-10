import createTheme from '@app/assets/theme/theme';
import { CssBaseline, Theme, ThemeProvider, useMediaQuery } from '@mui/material';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type ColorSchema = 'light' | 'dark' | 'system';

interface ThemeContextProps {
    theme: Theme;
    colorSchema: 'light' | 'dark' | 'system';
    changeColorSchema: (mode: ColorSchema) => void;
}

const context = createContext<ThemeContextProps>({} as ThemeContextProps);

export default function ThemeContextProvider({ children }: PropsWithChildren) {
    const prefersColorSchemaLight = useMediaQuery('(prefers-color-scheme: light)');
    const storageColorSchema = (localStorage.getItem('color-schema') as 'light' | 'dark' | 'system') ?? 'system';
    const systemColorSchema = prefersColorSchemaLight ? 'light' : 'dark';

    const [colorSchema, setColorSchema] = useState<'light' | 'dark' | 'system'>(
        storageColorSchema === 'system' ? 'system' : storageColorSchema,
    );
    const [theme, setTheme] = useState<Theme>(
        createTheme(storageColorSchema === 'system' ? systemColorSchema : storageColorSchema),
    );

    useEffect(() => {
        localStorage.setItem('color-schema', colorSchema);
        setTheme(() => createTheme(colorSchema === 'system' ? systemColorSchema : colorSchema));
    }, [colorSchema, systemColorSchema]);

    const changeColorSchema = useCallback((mode: ColorSchema) => {
        setColorSchema(mode === 'system' ? 'system' : mode);
        setTheme(() => createTheme(mode === 'system' ? systemColorSchema : mode));
    }, []);

    const value = useMemo(
        () => ({
            theme,
            colorSchema,
            changeColorSchema,
        }),
        [theme, colorSchema, changeColorSchema],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <context.Provider value={value}>{children}</context.Provider>
        </ThemeProvider>
    );
}

export function useThemeContext() {
    return useContext(context);
}

import '@app/assets/styles/global.scss';

import { StyledEngineProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import AppProvider from './contexts/app-provider.context';
import ThemeContextProvider from './contexts/theme.context';

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <StyledEngineProvider injectFirst>
            <AppProvider>
                <ThemeContextProvider>
                    <HelmetProvider>
                        <App />
                    </HelmetProvider>
                </ThemeContextProvider>
            </AppProvider>
        </StyledEngineProvider>
    </StrictMode>,
);

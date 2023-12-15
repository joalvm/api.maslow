import '@assets/styles/global.scss';

import { StyledEngineProvider } from '@mui/material/styles';
import { client } from 'app/queries/query-client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import App from './app';
import AppProvider from './contexts/app.context';
import ThemeContextProvider from './contexts/theme.context';

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <StyledEngineProvider injectFirst>
            <QueryClientProvider client={client}>
                <AppProvider>
                    <ThemeContextProvider>
                        <HelmetProvider>
                            <App />
                        </HelmetProvider>
                    </ThemeContextProvider>
                </AppProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </StyledEngineProvider>
    </StrictMode>,
);

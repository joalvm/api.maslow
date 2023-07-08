import '@app/assets/styles/global.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app';
import ThemeContextProvider from './contexts/theme.context';

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <ThemeContextProvider>
            <App />
        </ThemeContextProvider>
    </StrictMode>,
);

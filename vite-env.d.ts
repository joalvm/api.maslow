/* eslint-disable spaced-comment */
/// <reference types="vite/client" />

import '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        incidence: {
            PENDING: Palette['primary'];
            OPEN: Palette['primary'];
            CLOSED: Palette['primary'];
        };
        attention: {
            status: {
                PENDING: Palette['primary'];
                IN_PROCESS: Palette['primary'];
                FINALIZED: Palette['primary'];
            };
            severity: {
                CRITICAL: Palette['primary'];
                MAJOR: Palette['primary'];
                MODERATE: Palette['primary'];
                MINOR: Palette['primary'];
            };
            priority: {
                HIGHEST: Palette['primary'];
                HIGH: Palette['primary'];
                MEDIUM: Palette['primary'];
                LOW: Palette['primary'];
                LOWEST: Palette['primary'];
            };
        };
    }

    interface PaletteOptions {
        incidence: {
            PENDING: PaletteOptions['primary'];
            OPEN: PaletteOptions['primary'];
            CLOSED: PaletteOptions['primary'];
        };
        attention: {
            status: {
                PENDING: PaletteOptions['primary'];
                IN_PROCESS: PaletteOptions['primary'];
                FINALIZED: PaletteOptions['primary'];
            };
            severity: {
                CRITICAL: PaletteOptions['primary'];
                MAJOR: PaletteOptions['primary'];
                MODERATE: PaletteOptions['primary'];
                MINOR: PaletteOptions['primary'];
            };
            priority: {
                HIGHEST: PaletteOptions['primary'];
                HIGH: PaletteOptions['primary'];
                MEDIUM: PaletteOptions['primary'];
                LOW: PaletteOptions['primary'];
                LOWEST: PaletteOptions['primary'];
            };
        };
    }
}

interface ImportMetaEnv {
    readonly VITE_APP_NAME: string;
    readonly VITE_API_URL: string;
    readonly VITE_API_STORAGE_URL: string;
    readonly VITE_API_STORAGE_BUCKET: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

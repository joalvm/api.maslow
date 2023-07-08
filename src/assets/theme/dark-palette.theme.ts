import { blue, blueGrey, grey, orange, pink, red, teal, yellow } from '@mui/material/colors';
import createPalette from '@mui/material/styles/createPalette';

import scss from '../styles/_variables.module.scss';

export default function darkPalette() {
    return createPalette({
        mode: 'dark',
        primary: {
            main: scss.primary,
        },
        secondary: {
            main: scss.secondary,
        },
        background: {
            default: scss.darkBackground,
            paper: scss.darkPaper,
        },
        success: {
            main: scss.success,
        },
        warning: {
            main: scss.warning,
        },
        error: {
            main: scss.error,
        },
        info: {
            main: scss.info,
        },
        incidence: {
            PENDING: {
                main: grey[200],
                contrastText: blueGrey[900],
                light: blueGrey[200],
                dark: blueGrey[900],
            },
            OPEN: {
                main: blue[500],
                contrastText: '#000',
                light: blue[200],
                dark: blue[900],
            },
            CLOSED: {
                main: teal.A400,
                contrastText: '#000',
                light: teal[200],
                dark: teal[900],
            },
        },
        attention: {
            status: {
                PENDING: {
                    main: grey[200],
                    contrastText: blueGrey[900],
                    light: blueGrey[200],
                    dark: blueGrey[900],
                },
                IN_PROCESS: {
                    main: blue[500],
                    contrastText: '#FFF',
                    light: blue[200],
                    dark: blue[900],
                },
                FINALIZED: {
                    main: teal.A400,
                    contrastText: '#000',
                    light: teal[200],
                    dark: teal[900],
                },
            },
            severity: {
                CRITICAL: {
                    main: red[500],
                    contrastText: '#FFF',
                    light: red[500],
                    dark: red[800],
                },
                MAJOR: {
                    main: orange[500],
                    contrastText: '#FFF',
                    light: orange[500],
                    dark: orange[800],
                },
                MODERATE: {
                    main: yellow[500],
                    contrastText: '#000',
                    light: yellow[500],
                    dark: yellow[800],
                },
                MINOR: {
                    main: blue[500],
                    contrastText: '#FFF',
                    light: blue[500],
                    dark: blue[800],
                },
            },
            priority: {
                HIGHEST: {
                    main: pink[700],
                    contrastText: '#FFF',
                    light: pink[700],
                    dark: pink[900],
                },
                HIGH: {
                    main: red[500],
                    contrastText: '#FFF',
                    light: red[500],
                    dark: red[800],
                },
                MEDIUM: {
                    main: orange[500],
                    contrastText: '#FFF',
                    light: orange[500],
                    dark: orange[800],
                },
                LOW: {
                    main: yellow[500],
                    contrastText: '#000',
                    light: yellow[500],
                    dark: yellow[800],
                },
                LOWEST: {
                    main: blue[500],
                    contrastText: '#FFF',
                    light: blue[500],
                    dark: blue[800],
                },
            },
        },
    });
}

// Crea una paleta de grises basandote en el color secundario.

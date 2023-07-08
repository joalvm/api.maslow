import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react-swc';
import { BuildOptions, defineConfig, splitVendorChunkPlugin } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

const plugins = [react(), tsconfigPaths(), legacy(), svgr()];
const rollupOptions = { output: {} } as NonNullable<BuildOptions['rollupOptions']>;

if (process.env.NODE_ENV === 'production') {
    plugins.push(splitVendorChunkPlugin());

    rollupOptions.output = {
        manualChunks: {
            'vendor/react-bundle': ['react', 'react-dom', 'react-router-dom'],
            // 'vendor/mui/system': ['@mui/system'],
            'vendor/mui/styles': ['@mui/material/styles'],
            'vendor/mui/material': ['@mui/material'],
            // '@mui/icons-material': ['@mui/icons-material'],
            // '@mui/lab': ['@mui/lab'],
            // '@mui/x-date-pickers': ['@mui/x-date-pickers'],
            // axios: ['axios'],
            // '@popperjs/core': ['@popperjs/core'],
        },
    };
}

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        minify: 'terser',
        rollupOptions,
    },
    plugins,
});

import { Helmet } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import router from './router/router';
import titlePage from './utils/title-page.util';

export default function App() {
    return (
        <>
            <Helmet title={titlePage()} />
            <RouterProvider router={createBrowserRouter(router)} />
        </>
    );
}

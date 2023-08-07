import titlePage from '@utils/title-page.util';
import { Helmet } from 'react-helmet-async';

export default function NotFoundErrorPage() {
    let previousPage = document.referrer;

    if (previousPage == document.location.href || previousPage == '') {
        previousPage = '/';
    }

    return (
        <>
            <Helmet title={titlePage('404')} />
            <div>No se encontro la pagina</div>
        </>
    );
}

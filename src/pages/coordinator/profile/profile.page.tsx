import { useAuthProviderContext } from '@app/contexts/auth-provider.context';
import { Link } from 'react-router-dom';

export default function CoordinatorProfilePage() {
    const {
        userNavigationItems: { index },
    } = useAuthProviderContext();

    return (
        <div>
            <h1>CoordinatorProfilePage</h1>
            <Link to={index.path}>Coordinator</Link>
        </div>
    );
}

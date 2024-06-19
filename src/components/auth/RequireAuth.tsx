import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

type Props = {
	children: React.ReactNode,
}

export default function RequireAuth({ children }: Props) {
	const location = useLocation();
	const { isLogged } = useAuth();

	if (isLogged) {
		return <>{children}</>;
	}

	return <Navigate to="/login" state={{ from: location.pathname }} replace />;
}

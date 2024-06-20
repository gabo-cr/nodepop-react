import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLogged } from '../../store/selectors';

type Props = {
	children: React.ReactNode,
}

export default function RequireAuth({ children }: Props) {
	const location = useLocation();
	const isLogged = useSelector(getIsLogged);

	if (isLogged) {
		return <>{children}</>;
	}

	return <Navigate to="/login" state={{ from: location.pathname }} replace />;
}

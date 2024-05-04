import { useAuth } from '../../context/AuthContextProvider';
import { logout } from '../../api/auth';
import Button from '../shared/button/Button';

export default function AuthButton() {
	const { isLogged, onLogout } = useAuth();

	const handleLogoutClick = async () => {
		await logout();
		onLogout();
	};

	return isLogged ? (
		<Button onClick={handleLogoutClick} variant='secondary'>Cerrar sesión</Button>
	) : (
		<Button variant='link' to='/login'>Iniciar sesión</Button>
	);
}

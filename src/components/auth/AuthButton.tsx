import { useAuth } from '../../context/AuthContextProvider';
import { logout } from '../../api/auth';
import Button from '../shared/button/Button';
import Modal from '../shared/modal/Modal';
import { useState } from 'react';

export default function AuthButton() {
	const { isLogged, onLogout } = useAuth();

	const [openModal, setOpenModal] = useState<boolean>(false);

	const handleLogoutClick = async () => {
		await logout();
		onLogout();
	};

	const handleModalCancel = () => {
		setOpenModal(false);
	};

	const handleModalContinue = () => {
		handleLogoutClick();
		setOpenModal(false);
	};

	return isLogged ? (
		<>
			<Button onClick={() => setOpenModal(true)} variant='secondary'>Cerrar sesión</Button>
			<Modal 
				open={openModal}
				message="¿Estás seguro de querer cerrar sesión?"
				onCancel={handleModalCancel}
				onContinue={handleModalContinue}
			/>
		</>
	) : (
		<Button variant='link' to='/login'>Iniciar sesión</Button>
	);
}

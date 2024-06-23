import { useDispatch, useSelector } from 'react-redux';
import Button from '../shared/button/Button';
import Modal from '../shared/modal/Modal';
import { useState } from 'react';
import { getIsLogged } from '../../store/selectors';
import { authService } from '../../api/auth';
import { authLogout } from '../../store/actions';

export default function AuthButton() {
	const dispatch = useDispatch();
	const isLogged = useSelector(getIsLogged);
	
	const [openModal, setOpenModal] = useState(false);

	const handleLogoutClick = async () => {
		const { logout } = authService;
		await logout();
		dispatch(authLogout());
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

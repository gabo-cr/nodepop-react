import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TAdvert } from '../../types/adverts';

import { deleteAdvert } from '../../store/actions';
import { getUi } from '../../store/selectors';

import Button from '../shared/button/Button';
import Alert from '../shared/alert/Alert';
import Modal from '../shared/modal/Modal';

import './AdvertDetail.css';

export default function AdvertDetail({ id, name, photo, sale, price, tags }: TAdvert) {
	const dispatch = useDispatch<any>();
	const { pending: isDeleting, error } = useSelector(getUi);
	
	const [openModal, setOpenModal] = useState<boolean>(false);

	const handleDelete = async () => {
		dispatch(deleteAdvert(id));
	};

	const handleModalCancel = () => {
		setOpenModal(false);
	};

	const handleModalContinue = () => {
		handleDelete();
		setOpenModal(false);
	};

	return (
		<>
			<div className="advert-detail">
				<div className="header">
					{
						photo ? (
							<div className="image" style={{ backgroundImage: `url(${photo})` }}></div>
						) : (
							<div className="image default">
								<span>Imagen por defecto</span>
							</div>
						)
					}
				</div>
				<div className="content">
					<div className="title">
						<h2>{name}</h2>
					</div>
					<div className="description">
						<div className="block">
							<span className={`label${sale ? ' sale' : ' search'}`}>{sale ? 'Se vende' : 'Se busca'}</span>
						</div>
						<div className="block">
							<span className="label">{sale ? 'Precio: ' : 'Dispuesto a pagar: '}</span>
							<span className="value">{price} euros</span>
						</div>
					</div>
				</div>
				<div className="footer">
					<div className="tags">
						{
							tags.length && tags.map(tag => (
								<span className="tag" key={tag}>{tag}</span>
							))
						}
					</div>
					<div className="actions">
						<Button variant='delete' onClick={() => setOpenModal(true)} disabled={isDeleting}>Eliminar anuncio</Button>
					</div>
				</div>
				{error && (
					<Alert variant="error">
						{error.message}
					</Alert>
				)}
			</div>
			<Modal 
				open={openModal}
				message="¿Estás seguro de querer eliminar el anuncio?"
				onCancel={handleModalCancel}
				onContinue={handleModalContinue}
			/>
		</>
	);
}

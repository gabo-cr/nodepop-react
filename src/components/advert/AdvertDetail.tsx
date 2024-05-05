import { useState } from 'react';
import { deleteAdvert } from '../../api/adverts';
import { TAdvert } from '../../types/adverts';
import Button from '../shared/button/Button';
import './AdvertDetail.css';
import { TResponseError } from '../../types/error';
import Alert from '../shared/alert/Alert';
import Modal from '../shared/modal/Modal';
import { useNavigate } from 'react-router-dom';

export default function AdvertDetail({ id, name, photo, sale, price, tags }: TAdvert) {
	const navigate = useNavigate();
	
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const [error, setError] = useState<TResponseError | null>(null);
	const [openModal, setOpenModal] = useState<boolean>(false);

	const handleDelete = async () => {
		try {
			setIsDeleting(true);
			await deleteAdvert(id);
			setIsDeleting(false);
			navigate('/adverts');
		} catch (error: any) {
			setError(error);
			setIsDeleting(false);
		}
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

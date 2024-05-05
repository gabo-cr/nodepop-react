import { createPortal } from "react-dom";
import Loader from "../loader/Loader";
import Button from "../button/Button";
import './Modal.css';

type Props = {
	open: boolean,
	message: string,
	onCancel: () => void,
	onContinue: () => void,
};

function ModalContent({ open, message, onCancel, onContinue }: Props) {
	return (
		<div className={`modal${open ? ' show' : ''}`}>
			<div className="modal-background">
				<div className="modal-content">
					<div className="content">
						{message}
					</div>
					<div className="footer">
						<Button variant="secondary" onClick={onCancel}>Cancelar</Button>
						<Button variant="primary" onClick={onContinue}>Continuar</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function Modal(props: Props) {
	const portalContainer = document.querySelector('#modal');

	return portalContainer ? createPortal(<ModalContent {...props} />, portalContainer) : <Loader />;
}
  
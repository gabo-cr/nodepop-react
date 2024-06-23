import clsx from "clsx";
import './Alert.css';

export default function Alert({ variant, children }) {
	return (
		<div className={clsx('alert', variant)}>
			{children}
		</div>
	);
}

import clsx from "clsx";
import './Alert.css';

type Variant = 'success' | 'error' | 'info';

type Props = {
	variant?: Variant
	children: React.ReactNode
};

export default function Alert({ variant, children }: Props) {
	return (
		<div className={clsx('alert', variant)}>
			{children}
		</div>
	);
}

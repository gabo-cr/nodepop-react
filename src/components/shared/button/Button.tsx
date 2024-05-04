import clsx from 'clsx';
import './Button.css';
import { Link } from 'react-router-dom';

export type TButtonVariant = 'primary' | 'secondary' | 'link';

type Props = {
	variant?: TButtonVariant,
	onClick?: () => void,
	to?: string,
	children: React.ReactNode,
};

export default function Button({ variant='primary', onClick, to, children }: Props) {
	if (variant === 'link' && to) {
		return (
			<Link to={to}>
				<button type="button" className='btn primary'>{children}</button>
			</Link>
		);
	}
	return (
		<button type="button" onClick={onClick} className={clsx('btn', variant)}>{children}</button>
	);
}

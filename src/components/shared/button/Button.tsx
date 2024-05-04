import clsx from 'clsx';
import './Button.css';
import { Link } from 'react-router-dom';

export type TButtonVariant = 'primary' | 'secondary' | 'link';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	fullwidth?: boolean,
	variant?: TButtonVariant,
	onClick?: () => void,
	to?: string,
	children: React.ReactNode,
};

export default function Button({ fullwidth, variant='primary', onClick, to, children, ...props }: Props) {
	if (variant === 'link' && to) {
		return (
			<Link to={to}>
				<button type="button" className='btn primary' style={fullwidth ? { width: '100%' } : {}}>{children}</button>
			</Link>
		);
	}
	return (
		<button onClick={onClick} className={clsx('btn', variant)} style={fullwidth ? { width: '100%' } : {}} {...props}>
			{children}
		</button>
	);
}

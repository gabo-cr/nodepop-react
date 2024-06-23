import clsx from 'clsx';
import { Link } from 'react-router-dom';
import './Button.css';

export default function Button({ fullwidth, variant='primary', onClick, to, children, ...props }) {
	if (variant === 'link' && to) {
		return (
			<Link to={to}>
				<button type="button" className='btn primary' style={fullwidth ? { width: '100%' } : {}} {...props}>{children}</button>
			</Link>
		);
	}
	return (
		<button onClick={onClick} className={clsx('btn', variant)} style={fullwidth ? { width: '100%' } : {}} {...props}>
			{children}
		</button>
	);
}

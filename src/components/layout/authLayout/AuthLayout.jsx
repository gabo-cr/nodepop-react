
import './AuthLayout.css';

export default function AuthLayout({ title, children }) {
	return (
		<div className="authLayout">
			<main>
				<h1>{title}</h1>
				{children}
			</main>
		</div>
	);
}

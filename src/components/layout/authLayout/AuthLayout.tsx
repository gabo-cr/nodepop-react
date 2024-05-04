
import NavBar from '../navbar/NavBar';
import './AuthLayout.css';

type Props = {
	title: string,
	children: React.ReactNode,
};

export default function AuthLayout({ title, children }: Props) {
	return (
		<div className="authLayout">
			<header>
				<NavBar />
			</header>
			<main>
				<h1>{title}</h1>
				{children}
			</main>
		</div>
	);
}

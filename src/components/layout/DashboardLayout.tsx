import NavBar from "./navbar/NavBar";
import './DashboardLayout.css';

type Props = {
	title: string,
	children: React.ReactNode,
};

export default function DashboardLayout({ title, children }: Props) {
	return (
		<div className="dashboard">
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

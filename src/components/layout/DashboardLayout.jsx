import NavBar from "./navbar/NavBar";
import './DashboardLayout.css';

export default function DashboardLayout({ title, children }) {
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

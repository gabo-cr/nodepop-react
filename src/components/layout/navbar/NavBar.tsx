import { Link, NavLink } from "react-router-dom";
import AuthButton from "../../auth/AuthButton";
import { useAuth } from "../../../context/AuthContextProvider";
import './NavBar.css';

export default function NavBar() {
	const { isLogged } = useAuth();
	
	return (
		<div className="navbar">
			<div className="navbar-container">
				<Link to="/">
					<div className="logo">
						Nodepop in React
					</div>
				</Link>
				<nav className="navbar-links">
					{
						isLogged &&
						<>
							<NavLink to="/adverts/new" className='link'>Crear anuncio</NavLink>
							<NavLink to="/adverts" end className='link'>Anuncios</NavLink>
						</>
					}
					<AuthButton />
				</nav>
			</div>
		</div>
	);
}

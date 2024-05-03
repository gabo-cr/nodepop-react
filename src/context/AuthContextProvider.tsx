import { createContext, useContext, useState } from "react";

const defaultProvider = {
	isLogged: false,
	onLogin: () => {},
	onLogout: () => {}
};

const AuthContext = createContext(defaultProvider);

type Props = {
	isDefaultLogged: boolean,
	children: React.ReactNode,
};

export const AuthContextProvider = ({ isDefaultLogged, children }: Props) => {
	const [isLogged, setIsLogged] = useState<boolean>(isDefaultLogged);

	const handleLogin = () => setIsLogged(true);
	const handleLogout =() => setIsLogged(false);

	const authValue = {
		isLogged,
		onLogin: handleLogin,
		onLogout: handleLogout
	};

	return (
		<AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const auth = useContext(AuthContext);
	return auth;
};

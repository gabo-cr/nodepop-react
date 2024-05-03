import { createContext, useEffect, useState } from "react";
import storage from "../utils/storage";
import { setAuthorizationHeader } from "../api/client";

const defaultProvider = {
	isLogged: false,
	login: () => {},
	logout: () => {}
};

const AuthContext = createContext(defaultProvider);

type Props = {
	children: React.ReactNode
};

export const AuthContextProvider = ({ children }: Props) => {
	const [isLogged, setIsLogged] = useState<boolean>(false);

	useEffect(() => {
		const initAuth = async () => {
			const accessToken = storage.get('accessToken');
			if (accessToken) {
				setAuthorizationHeader(accessToken);
			}
		};

		initAuth();
	}, []);

	const handleLogin = () => setIsLogged(true);
	const handleLogout =() => setIsLogged(false);

	const authValue = {
		isLogged,
		login: handleLogin,
		logout: handleLogout
	};

	return (
		<AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
	);
};

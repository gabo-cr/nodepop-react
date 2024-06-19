import { useDispatch, useSelector } from "react-redux";
import { getIsLogged } from "../store/selectors";
import { authLoginFulfilled, authLoginPending, authLoginRejected, authLogout } from "../store/actions";

export const useAuth = () => {
	const isLogged = useSelector(getIsLogged);
	const dispatch = useDispatch();

	const handleLoginPending = () => {
		dispatch(authLoginPending());
	}
	const handleLoginFulfilled = () => {
		dispatch(authLoginFulfilled());
	}
	const handleLoginRejected = (error: any) => {
		dispatch(authLoginRejected(error));
	}

	const handleLogout = () => {
		dispatch(authLogout());
	}

	return {
		isLogged,
		onLoginPending: handleLoginPending,
		onLoginFulfilled: handleLoginFulfilled,
		onLoginRejected: handleLoginRejected,
		onLogout: handleLogout
	};
};

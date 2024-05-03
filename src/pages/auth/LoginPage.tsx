import { ChangeEvent, SyntheticEvent, useState } from "react";
import { FormInput } from "../../components/shared/FormInput";
import { login } from "../../api/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { TLoginParameters } from "../../types/auth";
import { TResponseError } from "../../types/error";
import { useAuth } from "../../context/AuthContextProvider";
import Alert from "../../components/shared/alert/Alert";

export default function LoginPage() {
	//** Hooks */
	const location = useLocation();
  	const navigate = useNavigate();
	const { onLogin } = useAuth();

	//** States */
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [formValues, setFormValues] = useState<TLoginParameters>({
		email: '',
		password: '',
	});
	const [rememberme, setRememberme] = useState<boolean>(false);
	const [error, setError] = useState<TResponseError | null>(null);

	//** Handlers */
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFormValues(currentFormValues => ({
			...currentFormValues,
			[event.target.name]: event.target.value,
		}));
	};

	const handleChangeRememberme = (event: ChangeEvent<HTMLInputElement>) => {
		setRememberme(event.target.checked);
	};

	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();

		try {
			setIsFetching(true);
			await login(formValues, rememberme);
			setIsFetching(false);
			onLogin();
			const to = location.state?.from || '/';
			navigate(to, { replace: true });
		} catch (error: any) {
			setIsFetching(false);
			setError(error);
		}
	};

	const { email, password } = formValues;
	const buttonDisabled = !email || !password || isFetching;

	return (
		<div className="loginPage">
			<h1>Iniciar sesión</h1>
			<form onSubmit={handleSubmit}>
				<FormInput label="Email" name="email" id="email" type="text" value={email} onChange={handleChange} />
				<FormInput label="Password" name="password" id="password" type="password" value={password} onChange={handleChange} />
				<input type="checkbox" name="rememberme" id="rememberme" checked={rememberme} onChange={handleChangeRememberme} />
				<button type="submit" disabled={buttonDisabled}>Log in</button> 
			</form>
			{error && (
				<Alert variant="error">
					{error.message}
				</Alert>
			)}
		</div>
	);
}
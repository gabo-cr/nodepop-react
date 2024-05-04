import { ChangeEvent, SyntheticEvent, useState } from "react";
import { FormInput } from "../../components/shared/form/input/FormInput";
import { login } from "../../api/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { TLoginParameters } from "../../types/auth";
import { TResponseError } from "../../types/error";
import { useAuth } from "../../context/AuthContextProvider";
import Alert from "../../components/shared/alert/Alert";
import AuthLayout from "../../components/layout/authLayout/AuthLayout";
import Button from "../../components/shared/button/Button";

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
		<AuthLayout title="Iniciar sesión">
			<div className="loginPage">
				<form onSubmit={handleSubmit}>
					<FormInput label="Email" name="email" id="email" type="text" value={email} onChange={handleChange} />
					<FormInput label="Password" name="password" id="password" type="password" value={password} onChange={handleChange} />
					<FormInput label="Recuérdame" name="rememberme" id="rememberme" type="checkbox" checked={rememberme} onChange={handleChangeRememberme} />
					<Button type="submit" disabled={buttonDisabled} fullwidth>Log in</Button> 
				</form>
				{error && (
					<Alert variant="error">
						{error.message}
					</Alert>
				)}
			</div>
		</AuthLayout>
	);
}
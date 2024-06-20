import { ChangeEvent, SyntheticEvent, useState } from "react";
import { FormInput } from "../../components/shared/form/input/FormInput";
import { TLoginParameters } from "../../types/auth";
import Alert from "../../components/shared/alert/Alert";
import AuthLayout from "../../components/layout/authLayout/AuthLayout";
import Button from "../../components/shared/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { getUi } from "../../store/selectors";
import { authLogin, uiResetError } from "../../store/actions";

export default function LoginPage() {
	//** Hooks */
	const dispatch = useDispatch<any>();
	const { pending: isFetching, error } = useSelector(getUi);
	
	//** States */
	const [formValues, setFormValues] = useState<TLoginParameters>({
		email: '',
		password: '',
	});
	const [rememberme, setRememberme] = useState<boolean>(false);

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
		dispatch(authLogin(formValues));
	};

	const resetError = () => dispatch(uiResetError());

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
						<div onClick={resetError}>
							{error.message}
						</div>
					</Alert>
				)}
			</div>
		</AuthLayout>
	);
}
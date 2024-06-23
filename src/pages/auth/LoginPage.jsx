import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUi } from "../../store/selectors";
import { authLogin, uiResetError } from "../../store/actions";

import { FormInput } from "../../components/shared/form/input/FormInput";
import Alert from "../../components/shared/alert/Alert";
import AuthLayout from "../../components/layout/authLayout/AuthLayout";
import Button from "../../components/shared/button/Button";

export default function LoginPage() {
	//** Hooks */
	const dispatch = useDispatch();
	const { pending: isFetching, error } = useSelector(getUi);
	
	//** States */
	const [formValues, setFormValues] = useState({
		email: '',
		password: '',
	});
	const [rememberme, setRememberme] = useState(false);

	//** Handlers */
	const handleChange = (event) => {
		setFormValues(currentFormValues => ({
			...currentFormValues,
			[event.target.name]: event.target.value,
		}));
	};

	const handleChangeRememberme = (event) => {
		setRememberme(event.target.checked);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		dispatch(authLogin(formValues, rememberme));
	};

	const resetError = () => dispatch(uiResetError());

	const { email, password } = formValues;
	const buttonDisabled = !email || !password || isFetching;

	return (
		<AuthLayout title="Iniciar sesión">
			<div className="loginPage">
				<form onSubmit={handleSubmit}>
					<FormInput label="Email" name="email" aria-label="email" id="email" type="text" value={email} onChange={handleChange} />
					<FormInput label="Password" name="password" aria-label="password" id="password" type="password" value={password} onChange={handleChange} />
					<FormInput label="Recuérdame" name="rememberme" aria-label="rememberme" id="rememberme" type="checkbox" checked={rememberme} onChange={handleChangeRememberme} />
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
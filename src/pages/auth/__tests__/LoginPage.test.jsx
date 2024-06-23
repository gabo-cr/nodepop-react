import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '../LoginPage';
import { Provider } from 'react-redux';
import { authLogin } from '../../../store/actions';


jest.mock('../../../store/actions');

const userType = (input, text) => userEvent.type(input, text);

describe('LoginPage', () => {
	const state = { ui: { pending: false, error: null } };
  const store = {
    dispatch: () => {},
    getState: () => state,
    subscribe: () => {},
  };
	
	const renderComponent = () => render(
		<Provider store={store}>
			<LoginPage />
		</Provider>,
	);

	test('snapshot', () => {
		const { container } = renderComponent();
		expect(container).toMatchSnapshot();
	});

	test('should dispatch authLogin action', () => {
    const email = 'email';
    const password = 'password';
    renderComponent();

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /log in/i });

    expect(submitButton).toBeDisabled();
		
    act(() => userType(emailInput, email));
    act(() => userType(passwordInput, password));
    
    expect(submitButton).toBeEnabled();

		userEvent.click(submitButton);
    
    expect(authLogin).toHaveBeenCalledWith({ email, password }, false);
  });
});

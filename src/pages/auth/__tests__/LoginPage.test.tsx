import React from 'react';
import { render } from '@testing-library/react';
import LoginPage from '../LoginPage';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import configureStore from '../../../store';

describe('LoginPage', () => {
	const router = createBrowserRouter([{ path: '*', element: <LoginPage /> }]);
	const store = configureStore({
		auth: false,
		adverts: {
			data: [],
			loaded: false
		},
		tags: {
			data: [],
			loaded: false
		},
		ui: {
			pending: false,
			error: undefined
		}
	}, { router });
	
	const renderComponent = () => render(
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	);

	test('snapshot', () => {
		const { container } = renderComponent();
		expect(container).toMatchSnapshot();
	});
});

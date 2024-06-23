import { advertsLoadFulfilled, advertsLoadRejected, authLogin, authLoginFulfilled, authLoginPending, authLoginRejected } from "../actions";
import { ADVERTS_LOAD_FULFILLED, ADVERTS_LOAD_REJECTED, AUTH_LOGIN_PENDING } from "../types";

// Tests de Acciones Síncronas
describe('authLoginPending', () => {
	test('Should return an "AUTH_LOGIN_PENDING" action', () => {
		const expectedAction = {
			type: AUTH_LOGIN_PENDING
		};
		const action = authLoginPending();
		expect(action).toEqual(expectedAction);
	});
});

describe('advertsLoadFulfilled', () => {
	test('Should return an "ADVERTS_LOAD_FULFILLED" action', () => {
		const adverts = [];
		const expectedAction = {
			type: ADVERTS_LOAD_FULFILLED,
			payload: adverts,
		};
		const action = advertsLoadFulfilled(adverts);
		expect(action).toStrictEqual(expectedAction);
	});
});

describe('advertsLoadRejected', () => {
	test('Should return an "ADVERTS_LOAD_REJECTED" action', () => {
		const error = 'error';
		const expectedAction = {
			type: ADVERTS_LOAD_REJECTED,
			payload: error,
			error: true,
		};
		const action = advertsLoadRejected(error);
		expect(action).toEqual(expectedAction);
	});
});

// Tests de Acciones Asíncronas
describe('authLogin', () => {
	const credentials = {
		email: 'email',
		password: 'password'
	};
	const persist = false;
	const action = authLogin(credentials, persist);

	const redirectURL = 'redirectURL';
	const dispatch = jest.fn();
	const services = {
		authService: { login: jest.fn(), logout: jest.fn() },
		advertsService: { getAdverts: jest.fn(), getAdvert: jest.fn(), createAdvert: jest.fn(), deleteAdvert: jest.fn() },
		tagsService: { getTags: jest.fn() }
	};
	const router = {
		state: { location: { state: { from: redirectURL } } },
		navigate: jest.fn(),
	};

	test('Should follow the login flow when login resolves', async () => {
		services.authService.login = jest.fn().mockResolvedValue(true);

		await action(dispatch, undefined, { services, router });
		expect(dispatch).toHaveBeenCalledTimes(2);
		expect(dispatch).toHaveBeenNthCalledWith(1, authLoginPending());
		expect(services.authService.login).toHaveBeenCalledWith(credentials, persist);
		expect(dispatch).toHaveBeenNthCalledWith(2, authLoginFulfilled());
		expect(router.navigate).toHaveBeenCalledWith(redirectURL, { replace: true });
	});

	test('Should follow the error flow when login rejects', async () => {
		const error = new Error('unauthorized');
		services.authService.login = jest.fn().mockRejectedValue(error);

		await action(dispatch, undefined, { services, router });
		expect(dispatch).toHaveBeenCalledTimes(2);
		expect(dispatch).toHaveBeenNthCalledWith(1, authLoginPending());
		expect(services.authService.login).toHaveBeenCalledWith(credentials, persist);
		expect(dispatch).toHaveBeenNthCalledWith(2, authLoginRejected(error));
		expect(router.navigate).not.toHaveBeenCalled();
	});
});

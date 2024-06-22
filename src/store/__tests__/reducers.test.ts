import { authLoginFulfilled, authLogout } from "../actions";
import { auth, defaultState } from "../reducers";

// Tests de Reducers
describe('auth', () => {
	test('Should manage "AUTH_LOGIN_FULFILLED" action', () => {
		const state = defaultState.auth;
		const action = authLoginFulfilled();
		expect(auth(state, action)).toBe(true);
	});

	test('Should manage "AUTH_LOGOUT" action', () => {
		const state = defaultState.auth;
		const action = authLogout();
		expect(auth(state, action)).toBe(false);
	});

	test('Should manage "ANY" action', () => {
		const state = defaultState.auth;
		const action = { type: 'ANY' };
		expect(auth(state, action)).toBe(state);
	});

	test('Should manage "ANY" action when state is not defined', () => {
		const state = undefined;
		const action = { type: 'ANY' };
		expect(auth(state, action)).toBe(defaultState.auth);
	});
});
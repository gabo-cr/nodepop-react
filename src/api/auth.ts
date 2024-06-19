import { client, removeAuthorizationHeader, setAuthorizationHeader } from '../api/client';
import { TLoginParameters, TLoginResponseSuccess } from '../types/auth';
import { TResponseError } from '../types/error';
import storage from '../utils/storage';

const login = (credentials: TLoginParameters, persist: boolean = false) => {
	return client.post<TResponseError, TLoginResponseSuccess, TLoginParameters>('/auth/login', credentials)
		.then(({ accessToken }) => {
			setAuthorizationHeader(accessToken);
			if (persist) {
				storage.set('accessToken', accessToken);
			}
		});
};
  
const logout = () => {
	return Promise.resolve().then(() => {
		removeAuthorizationHeader();
		storage.remove('accessToken');
	});
};

export const authService = {
	login,
	logout,
};

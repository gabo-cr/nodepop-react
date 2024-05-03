import { client, removeAuthorizationHeader, setAuthorizationHeader } from '../api/client';
import { LoginParameters, LoginResponseError, LoginResponseSuccess } from '../types/auth';
import storage from '../utils/storage';

export const login = (credentials: LoginParameters, persist: boolean = false) => {
	return client.post<LoginResponseError, LoginResponseSuccess, LoginParameters>('/auth/login', credentials)
		.then(({ accessToken }) => {
			setAuthorizationHeader(accessToken);
			if (persist) {
				storage.set('accessToken', accessToken);
			}
		});
};
  
export const logout = () => {
	return Promise.resolve().then(() => {
		removeAuthorizationHeader();
		storage.remove('accessToken');
	});
};
  
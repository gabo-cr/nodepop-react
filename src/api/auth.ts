import { client, removeAuthorizationHeader, setAuthorizationHeader } from '../api/client';
import { LoginParameters, LoginResponseError, LoginResponseSuccess } from '../types/auth';
import storage from '../utils/storage';

export const login = (credentials: LoginParameters) => {
	return client.post<LoginResponseError, LoginResponseSuccess, LoginParameters>('/auth/login', credentials)
		.then(({ accessToken }) => {
			setAuthorizationHeader(accessToken);
			storage.set('accessToken', accessToken);
		});
};
  
export const logout = () => {
	return Promise.resolve().then(() => {
		removeAuthorizationHeader();
		storage.remove('accessToken');
	});
};
  
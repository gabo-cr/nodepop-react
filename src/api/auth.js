import { client, removeAuthorizationHeader, setAuthorizationHeader } from './client';
import storage from '../utils/storage';

const login = (credentials, persist = false) => {
	return client.post('/auth/login', credentials)
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

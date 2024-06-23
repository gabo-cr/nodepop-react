export const failureRedirects = (router, redirectsMap) => (store) => (next) => (action) => {
	const result = next(action);

	if (!action.error) {
		return result;
	}

	const redirect = redirectsMap[action.payload.status];
	if (redirect) {
		router.navigate(redirect);
	}

	return result;
};

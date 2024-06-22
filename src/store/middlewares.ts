import { Router } from "@remix-run/router";

export const failureRedirects = (router: Router, redirectsMap: { [key:number]: string }) => (store: any) => (next: any) => (action: any) => {
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

export type LoginParameters = {
	email: string,
	password: string,
};

export type LoginResponseSuccess = {
	accessToken: string,
};

export type LoginResponseError = {
	statusCode: number,
	message: string,
};

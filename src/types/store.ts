import { advertsService } from "../api/adverts";
import { authService } from "../api/auth";
import { tagsService } from "../api/tags";
import { TAdvert } from "./adverts";

export type TState = {
	auth: boolean;
	adverts: {
		data: TAdvert[];
		loaded: boolean;
	};
	ui: {
		pending: boolean;
		error: any;
	};
	tags: {
		data: string[];
		loaded: boolean;
	};
};

export type TAction = {
	type: string;
	payload: any;
	error?: any;
};

export type TServices = {
	authService: typeof authService;
	advertsService: typeof advertsService;
	tagsService: typeof tagsService;
};

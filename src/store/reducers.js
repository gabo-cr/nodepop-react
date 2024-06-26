import { ADVERTS_ADD_FULFILLED, ADVERTS_DELETE_FULFILLED, ADVERTS_DETAIL_FULFILLED, ADVERTS_LOAD_FULFILLED, AUTH_LOGIN_FULFILLED, AUTH_LOGOUT, TAGS_LOAD_FULFILLED, UI_RESET_ERROR } from "./types";

export const defaultState = {
	auth: false,
	adverts: {
		data: [],
		loaded: false,
	},
	tags: {
		data: [],
		loaded: false,
	},
	ui: {
		pending: false,
		error: null,
	},
};

export function auth(state = defaultState.auth, action) {
	switch (action.type) {
		case AUTH_LOGIN_FULFILLED:
			return true;
		case AUTH_LOGOUT:
			return false;
		default:
			return state;
	}
}

export function adverts(state = defaultState.adverts, action) {
	switch (action.type) {
		case ADVERTS_LOAD_FULFILLED:
			return { ...state, loaded: true, data: action.payload };
		case ADVERTS_ADD_FULFILLED:
			return { ...state, data: state && [action.payload, ...state.data] };
		case ADVERTS_DELETE_FULFILLED:
			return { ...state, data: state.data.filter(el => el.id !== action.payload) };
		case ADVERTS_DETAIL_FULFILLED:
			return { ...state, data: [action.payload] };
		default:
			return state;
	}
}

export function tags(state = defaultState.tags, action) {
	switch (action.type) {
		case TAGS_LOAD_FULFILLED:
			return { ...state, loaded: true, data: action.payload };
		default:
			return state;
	}
}

export function ui(state = defaultState.ui, action) {
	if (action.error) {
		return { ...state, pending: false, error: action.payload };
	}

	if (action.type === UI_RESET_ERROR) {
		return { ...state, error: null };
	}

	if (action.type.endsWith('/pending')) {
		return { ...state, pending: true };
	}

	if (action.type.endsWith('/fulfilled')) {
		return { ...state, pending: false, error: null };
	}
	
	return state;
}

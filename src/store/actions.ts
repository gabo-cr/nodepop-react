import { Dispatch } from "redux";
import { TAdvert, TAdvertFormValues } from "../types/adverts";
import { TLoginParameters } from "../types/auth";
import { ADVERTS_ADD_FULFILLED, ADVERTS_ADD_PENDING, ADVERTS_ADD_REJECTED, ADVERTS_DETAIL_FULFILLED, ADVERTS_DETAIL_PENDING, ADVERTS_DETAIL_REJECTED, ADVERTS_LOAD_FULFILLED, ADVERTS_LOAD_PENDING, ADVERTS_LOAD_REJECTED, AUTH_LOGIN_FULFILLED, AUTH_LOGIN_PENDING, AUTH_LOGIN_REJECTED, AUTH_LOGOUT, UI_RESET_ERROR } from "./types";
import type { Router } from "@remix-run/router";
import { areAdvertsLoaded, getAdvert } from "./selectors";
import { TServices } from "../types/store";

export const authLoginPending = () => ({
	type: AUTH_LOGIN_PENDING,
});

export const authLoginFulfilled = () => ({
	type: AUTH_LOGIN_FULFILLED,
});

export const authLoginRejected = (error: any) => ({
	type: AUTH_LOGIN_REJECTED,
	payload: error,
	error: true,
});

export const authLogin = (credentials: TLoginParameters) => {
  return async function (dispatch: Dispatch, _getState: any, { services: { authService }, router }: { services: TServices, router: Router }) {
    try {
      dispatch(authLoginPending());
      await authService.login(credentials);
      dispatch(authLoginFulfilled());
      const to = router.state.location.state?.from || '/';
      router.navigate(to, { replace: true });
    } catch (error) {
      dispatch(authLoginRejected(error));
    }
  };
};

export const authLogout = () => ({
	type: AUTH_LOGOUT,
});

export const advertsLoadPending = () => ({
	type: ADVERTS_LOAD_PENDING,
});

export const advertsLoadFulfilled = (adverts: TAdvert[]) => ({
	type: ADVERTS_LOAD_FULFILLED,
	payload: adverts,
});

export const advertsLoadRejected = (error: any) => ({
	type: ADVERTS_LOAD_REJECTED,
	payload: error,
	error: true,
});

export const loadAdverts = () => {
  return async function (dispatch: Dispatch, getState: any, { services: { advertsService } }: { services: TServices }) {
    const state = getState();
    if (areAdvertsLoaded(state)) {
      return;
    }
    try {
      dispatch(advertsLoadPending());
      const tweets = await advertsService.getAdverts();
      dispatch(advertsLoadFulfilled(tweets));
    } catch (error) {
      dispatch(advertsLoadRejected(error));
    }
  };
};

export const advertsAddPending = () => ({
	type: ADVERTS_ADD_PENDING,
});

export const advertsAddFulfilled = (advert: TAdvert | TAdvertFormValues) => ({
	type: ADVERTS_ADD_FULFILLED,
	payload: advert,
});

export const advertsAddRejected = (error: any) => ({
	type: ADVERTS_ADD_REJECTED,
	payload: error,
	error: true,
});

export const createAdvert = (advert: TAdvertFormValues) => {
  return async function (dispatch: Dispatch, _getState: any, { services: { advertsService }, router }: { services: TServices, router: Router }) {
    try {
      dispatch(advertsAddPending());
      const { id } = await advertsService.createAdvert(advert);
      const createdAdvert = await advertsService.getAdvert(id);
      dispatch(advertsAddFulfilled(createdAdvert));
      router.navigate(`/tweets/${createdAdvert.id}`);
      return createdAdvert;
    } catch (error) {
      dispatch(advertsAddRejected(error));
    }
  };
};

export const advertsDetailPending = () => ({
  type: ADVERTS_DETAIL_PENDING,
});

export const advertsDetailFulfilled = (advert: TAdvert) => ({
  type: ADVERTS_DETAIL_FULFILLED,
  payload: advert,
});

export const advertsDetailRejected = (error: any) => ({
  type: ADVERTS_DETAIL_REJECTED,
  payload: error,
  error: true,
});

export const loadAdvert = (advertId: string) => {
  return async function (dispatch: Dispatch, getState: any, { services: { advertsService } }: { services: TServices }) {
    const state = getState();
		if (getAdvert(advertId)(state)) {
      return;
    }
    try {
      dispatch(advertsDetailPending());
      const tweet = await advertsService.getAdvert(advertId);
      dispatch(advertsDetailFulfilled(tweet));
    } catch (error) {
      dispatch(advertsDetailRejected(error));
    }
  };
};

export const uiResetError = () => ({
	type: UI_RESET_ERROR,
});

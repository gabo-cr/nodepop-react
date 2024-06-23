import { ADVERTS_ADD_FULFILLED, ADVERTS_ADD_PENDING, ADVERTS_ADD_REJECTED, ADVERTS_DELETE_FULFILLED, ADVERTS_DELETE_PENDING, ADVERTS_DELETE_REJECTED, ADVERTS_DETAIL_FULFILLED, ADVERTS_DETAIL_PENDING, ADVERTS_DETAIL_REJECTED, ADVERTS_LOAD_FULFILLED, ADVERTS_LOAD_PENDING, ADVERTS_LOAD_REJECTED, AUTH_LOGIN_FULFILLED, AUTH_LOGIN_PENDING, AUTH_LOGIN_REJECTED, AUTH_LOGOUT, TAGS_LOAD_FULFILLED, TAGS_LOAD_PENDING, TAGS_LOAD_REJECTED, UI_RESET_ERROR } from "./types";
import { areAdvertsLoaded, areTagsLoaded, getAdvert } from "./selectors";

export const authLoginPending = () => ({
	type: AUTH_LOGIN_PENDING,
});

export const authLoginFulfilled = () => ({
	type: AUTH_LOGIN_FULFILLED,
});

export const authLoginRejected = (error) => ({
	type: AUTH_LOGIN_REJECTED,
	payload: error,
	error: true,
});

export const authLogin = (credentials, persist) => {
  return async function (dispatch, _getState, { services: { authService }, router }) {
    try {
      dispatch(authLoginPending());
      await authService.login(credentials, persist);
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

export const advertsLoadFulfilled = (adverts) => ({
	type: ADVERTS_LOAD_FULFILLED,
	payload: adverts,
});

export const advertsLoadRejected = (error) => ({
	type: ADVERTS_LOAD_REJECTED,
	payload: error,
	error: true,
});

export const loadAdverts = () => {
  return async function (dispatch, getState, { services: { advertsService } }) {
    const state = getState();
    if (areAdvertsLoaded(state)) {
      return;
    }
    try {
      dispatch(advertsLoadPending());
      const adverts = await advertsService.getAdverts();
      dispatch(advertsLoadFulfilled(adverts));
    } catch (error) {
      dispatch(advertsLoadRejected(error));
    }
  };
};

export const advertsAddPending = () => ({
	type: ADVERTS_ADD_PENDING,
});

export const advertsAddFulfilled = (advert) => ({
	type: ADVERTS_ADD_FULFILLED,
	payload: advert,
});

export const advertsAddRejected = (error) => ({
	type: ADVERTS_ADD_REJECTED,
	payload: error,
	error: true,
});

export const createAdvert = (advert) => {
  return async function (dispatch, _getState, { services: { advertsService }, router }) {
    try {
      dispatch(advertsAddPending());
      const { id } = await advertsService.createAdvert(advert);
      const createdAdvert = await advertsService.getAdvert(id);
      dispatch(advertsAddFulfilled(createdAdvert));
      router.navigate(`/adverts/${createdAdvert.id}`);
      return createdAdvert;
    } catch (error) {
      dispatch(advertsAddRejected(error));
    }
  };
};

export const advertsDetailPending = () => ({
  type: ADVERTS_DETAIL_PENDING,
});

export const advertsDetailFulfilled = (advert) => ({
  type: ADVERTS_DETAIL_FULFILLED,
  payload: advert,
});

export const advertsDetailRejected = (error) => ({
  type: ADVERTS_DETAIL_REJECTED,
  payload: error,
  error: true,
});

export const loadAdvert = (advertId) => {
  return async function (dispatch, getState, { services: { advertsService } }) {
    const state = getState();
		if (getAdvert(advertId)(state)) {
      return;
    }
    try {
      dispatch(advertsDetailPending());
      const advert = await advertsService.getAdvert(advertId);
      dispatch(advertsDetailFulfilled(advert));
    } catch (error) {
      dispatch(advertsDetailRejected(error));
    }
  };
};

export const advertsDeletePending = () => ({
	type: ADVERTS_DELETE_PENDING,
});

export const advertsDeleteFulfilled = (advertId) => ({
	type: ADVERTS_DELETE_FULFILLED,
	payload: advertId,
});

export const advertsDeleteRejected = (error) => ({
	type: ADVERTS_DELETE_REJECTED,
	payload: error,
	error: true,
});

export const deleteAdvert = (advertId) => {
  return async function (dispatch, _getState, { services: { advertsService }, router }) {
    try {
      dispatch(advertsDeletePending());
      await advertsService.deleteAdvert(advertId);
      dispatch(advertsDeleteFulfilled(advertId));
      router.navigate('/adverts');
    } catch (error) {
      dispatch(advertsDeleteRejected(error));
    }
  };
};

export const tagsLoadPending = () => ({
	type: TAGS_LOAD_PENDING,
});

export const tagsLoadFulfilled = (tags) => ({
	type: TAGS_LOAD_FULFILLED,
	payload: tags,
});

export const tagsLoadRejected = (error) => ({
	type: TAGS_LOAD_REJECTED,
	payload: error,
	error: true,
});

export const loadTags = () => {
  return async function (dispatch, getState, { services: { tagsService } }) {
    const state = getState();
    if (areTagsLoaded(state)) {
      return;
    }
    try {
      dispatch(tagsLoadPending());
      const tags = await tagsService.getTags();
      dispatch(tagsLoadFulfilled(tags));
    } catch (error) {
      dispatch(tagsLoadRejected(error));
    }
  };
};

export const uiResetError = () => ({
	type: UI_RESET_ERROR,
});

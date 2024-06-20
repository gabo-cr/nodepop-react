import { TState } from "../types/store";

export const getIsLogged = (state: TState) => state.auth;

export const areAdvertsLoaded = (state: TState) => state.adverts.loaded;
export const getAdverts = (state: TState) => state.adverts.data;

export const getAdvert = (advertId?: string) => (state: TState) => getAdverts(state)?.find(advert => advert.id === advertId);

export const areTagsLoaded = (state: TState) => state.tags.loaded;
export const getTags = (state: TState) => state.tags.data;

export const getUi = (state: TState) => state.ui;

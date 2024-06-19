import { TState } from "../types/store";

export const getIsLogged = (state: TState) => state.auth;

export const areAdvertsLoaded = (state: TState) => state.adverts?.loaded;
export const getAdverts = (state: TState) => state.adverts?.data;

//export const getAdvert = (state: TState, advertId: string) => getAdverts(state)?.find(advert => advert.id === advertId);

export const getAdvert = (advertId: string) => (state: TState) => getAdverts(state)?.find(advert => advert.id === advertId);

export const getUi = (state: TState) => state.ui;

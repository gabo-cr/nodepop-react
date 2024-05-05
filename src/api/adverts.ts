import { TAdvert, TAdvertFormValues } from "../types/adverts";
import { TResponseError } from "../types/error";
import { client } from "./client";

const advertsURL = '/v1/adverts';

export const getAdverts = () => {
	const url = `${advertsURL}`;
	return client.get<TResponseError, TAdvert[]>(url);
};

export const getAdvert = (advertId: string) => {
	const url = `${advertsURL}/${advertId}`;
	return client.get<TResponseError, TAdvert>(url);
};

export const createAdvert = (data: TAdvertFormValues) => {
	const url = `${advertsURL}`;
	const headers = {
		'Content-Type': 'multipart/form-data',
	};
	return client.post<TResponseError, TAdvert, TAdvertFormValues>(url, data, { headers });
};

export const deleteAdvert = (advertId: string) => {
	const url = `${advertsURL}/${advertId}`;
	return client.delete<TResponseError>(url);
};

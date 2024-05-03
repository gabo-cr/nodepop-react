import { TAdvert } from "../types/adverts";
import { TResponseError } from "../types/error";
import { client } from "./client";

const advertsURL = '/v1/adverts';

export const getAdverts = () => {
	const url = `${advertsURL}`;
	return client.get<TResponseError, TAdvert[]>(url);
};

import { TResponseError } from "../types/error";
import { client } from "./client";

const tagsURL = '/v1/adverts/tags';

const getTags = () => {
	const url = `${tagsURL}`;
	return client.get<TResponseError, string[]>(url);
};

export const tagsService = {
	getTags,
};

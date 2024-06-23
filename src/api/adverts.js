import { client } from "./client";

const advertsURL = '/v1/adverts';

const getAdverts = () => {
	const url = `${advertsURL}`;
	return client.get(url);
};

const getAdvert = (advertId) => {
	const url = `${advertsURL}/${advertId}`;
	return client.get(url);
};

const createAdvert = (data) => {
	const url = `${advertsURL}`;
	const headers = {
		'Content-Type': 'multipart/form-data',
	};
	return client.post(url, data, { headers });
};

const deleteAdvert = (advertId) => {
	const url = `${advertsURL}/${advertId}`;
	return client.delete(url);
};

export const advertsService = {
	getAdverts,
	getAdvert,
	createAdvert,
	deleteAdvert
};

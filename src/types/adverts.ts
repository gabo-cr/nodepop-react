export type TAdvert = {
	id: string,
	createdAt: string,
	name: string,
	sale: boolean,
	price: number,
	tags: string[],
	photo?: string,
};

interface Generic {
	[key: string]: string | number | string[] | File | null | boolean
}
export interface TAdvertFormValues extends Generic {
	name: string,
	sale: string | boolean,
	price: number,
	tags: string[],
	photo: File | null,
};

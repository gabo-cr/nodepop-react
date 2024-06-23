import { getAdvert } from "../selectors";

// Tests de Selectors
describe('getAdvert', () => {
	const advertId = '1';
	const tags = ['motor', 'mobile'];
	const adverts = [
		{
			id: '1',
			createdAt: '',
			name: 'Advert 1',
			sale: true,
			price: 10,
			tags: tags
		}
	];
	const state = {
		auth: true,
		adverts: {
			data: adverts,
			loaded: true,
		},
		ui: {
			pending: false,
			error: undefined,
		},
		tags: {
			data: tags,
			loaded: true
		}
	}

	test('Should return an advert by advertId', () => {
		expect(getAdvert(advertId)(state)).toBe(adverts[0]);
	});

	test('Should not return any advert', () => {
		expect(getAdvert('2')(state)).toBeUndefined();
	});
});

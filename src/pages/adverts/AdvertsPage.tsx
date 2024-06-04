import { ChangeEvent, useEffect, useState } from "react";
import { TAdvert } from "../../types/adverts";

import { Link } from "react-router-dom";
import { getAdverts } from "../../api/adverts";
import Alert from "../../components/shared/alert/Alert";
import { TResponseError } from "../../types/error";
import Advert from "../../components/adverts/Advert";
import EmptyList from "../../components/adverts/EmptyList";
import './AdvertsPage.css';
import DashboardLayout from "../../components/layout/DashboardLayout";
import Loader from "../../components/shared/loader/Loader";
import { FormInput } from "../../components/shared/form/input/FormInput";
import FormSelect, { TSelectOption } from "../../components/shared/form/select/FormSelect";
import { getTags } from "../../api/tags";
import Button from "../../components/shared/button/Button";

type FilterValue = {
	name: string,
	sale: string,
	tags: string[],
};

const defaultFilterValues = {
	name: '',
	sale: '',
	tags: []
};

export default function AdvertsPage() {
	const [allAdverts, setAllAdverts] = useState<TAdvert[]>([]);
	const [allTags, setAllTags] = useState<string[]>([]);
	const [error, setError] = useState<TResponseError | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [filterValues, setFilterValues] = useState<FilterValue>(defaultFilterValues);

	useEffect(() => {
		const loadAdverts = async () => {
			try {
				setIsLoading(true);
				const allAdverts = await getAdverts();
				setAllAdverts(allAdverts);
				setIsLoading(false);
			} catch (error: any) {
				setError(error);
				setIsLoading(false);
			}
		}

		loadAdverts();
	}, []);

	useEffect(() => {
		const getAllTags = async () => {
			const tags = await getTags();
			setAllTags(tags);
		};

		getAllTags();
	}, [])

	const filterAdverts = () => {
		let filteredAdverts = [...allAdverts];
		for (const [key, value] of Object.entries(filterValues)) {
			if (key === 'name') {
				const val = value as string;
				filteredAdverts = val ? filteredAdverts.filter(advert => advert.name.toLowerCase().includes(val.toLowerCase())) : allAdverts;
			}
			if (key === 'sale') {
				const val = value as string;
				const sale = val === '1';
				filteredAdverts = val ? filteredAdverts.filter(advert => advert.sale === sale) : filteredAdverts;
			}
			if (key === 'tags') {
				const val = value as string[];
				filteredAdverts = val.length ? filteredAdverts.filter(advert => val.every(v => advert.tags.includes(v))) : filteredAdverts;
			}
		}
		return filteredAdverts;
	};

	const handleResetFilter = () => {
		setFilterValues(defaultFilterValues);
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setFilterValues(currentFilterValues => ({
			...currentFilterValues,
			[event.target.name]: event.target.multiple ? Array.from((event as ChangeEvent<HTMLSelectElement>).target.selectedOptions, option => option.value) : event.target.value,
		}));
	};

	const saleOptions: TSelectOption[] = [
		{ value: '1', text: 'Se vende' },
		{ value: '0', text: 'Se busca' },
	];
	const tagsOptions: TSelectOption[] = allTags.map(tag => ({ value: tag, text: tag }));
	const { name, sale, tags } = filterValues;

	const filteredAdverts = filterAdverts();

	if (isLoading) {
		return (
			<DashboardLayout title="Anuncios">
				<Loader />
			</DashboardLayout>
		);
	}

	return (
		<DashboardLayout title="Anuncios">
			<section className="advertsSection">
				<aside className="advertsFilters">
					<FormInput
						type="text"
						name="name"
						id="name"
						label="Nombre"
						onChange={handleChange}
						value={name}
					/>
					<FormSelect 
						name="sale" 
						id="sale"
						label="Se vende/Se busca"
						options={saleOptions}
						onChange={handleChange}
						value={sale as string}
					/>
					<FormSelect 
						name="tags" 
						id="tags"
						label="Tags"
						options={tagsOptions}
						onChange={handleChange}
						value={tags}
						multiple
					/>
					<div className="advertsFilters-footer">
						<Button onClick={handleResetFilter} variant="secondary">Limpiar filtros</Button>
					</div>
				</aside>
				<main className="advertsList">
					{
						error && (
							<Alert variant="error">
								{error.message}
							</Alert>
						)
					}
					{
						filteredAdverts.length ? (
							<ul>
							{
								filteredAdverts.map(({ id, ...advert }) => (
									<li key={id}>
										<Link to={`/adverts/${id}`}>
											<Advert {...advert} />
										</Link>
									</li>
								))
							}
							</ul>
						)
						: (
							<EmptyList />
						)
					}
				</main>
			</section>
		</DashboardLayout>
	);
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { getAdverts, getTags, getUi } from "../../store/selectors";
import { loadAdverts, loadTags } from "../../store/actions";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Alert from "../../components/shared/alert/Alert";
import Advert from "../../components/adverts/Advert";
import EmptyList from "../../components/adverts/EmptyList";
import Loader from "../../components/shared/loader/Loader";
import { FormInput } from "../../components/shared/form/input/FormInput";
import FormSelect from "../../components/shared/form/select/FormSelect";
import Button from "../../components/shared/button/Button";

import './AdvertsPage.css';

const defaultFilterValues = {
	name: '',
	sale: '',
	tags: []
};

export default function AdvertsPage() {
	const dispatch = useDispatch();
	const allAdverts = useSelector(getAdverts);
	const allTags = useSelector(getTags);
	const { pending: isFetching, error } = useSelector(getUi);

	const [filterValues, setFilterValues] = useState(defaultFilterValues);

	useEffect(() => {
		dispatch(loadAdverts());
	}, [dispatch]);

	useEffect(() => {
		dispatch(loadTags());
	}, [dispatch])

	const filterAdverts = () => {
		let filteredAdverts = [...allAdverts];
		for (const [key, value] of Object.entries(filterValues)) {
			if (key === 'name') {
				filteredAdverts = value ? filteredAdverts.filter(advert => advert.name.toLowerCase().includes(value.toLowerCase())) : allAdverts;
			}
			if (key === 'sale') {
				const sale = value === '1';
				filteredAdverts = value ? filteredAdverts.filter(advert => advert.sale === sale) : filteredAdverts;
			}
			if (key === 'tags') {
				filteredAdverts = value.length ? filteredAdverts.filter(advert => value.every(v => advert.tags.includes(v))) : filteredAdverts;
			}
		}
		return filteredAdverts;
	};

	const handleResetFilter = () => {
		setFilterValues(defaultFilterValues);
	};

	const handleChange = (event) => {
		setFilterValues(currentFilterValues => ({
			...currentFilterValues,
			[event.target.name]: event.target.multiple ? Array.from(event.target.selectedOptions, option => option.value) : event.target.value,
		}));
	};

	const saleOptions = [
		{ value: '1', text: 'Se vende' },
		{ value: '0', text: 'Se busca' },
	];
	const tagsOptions = allTags.map(tag => ({ value: tag, text: tag }));
	const { name, sale, tags } = filterValues;

	const filteredAdverts = filterAdverts();

	if (isFetching) {
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
						value={sale}
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

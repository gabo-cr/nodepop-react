import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createAdvert, loadTags } from "../../../store/actions";
import { getTags, getUi } from "../../../store/selectors";

import DashboardLayout from "../../../components/layout/DashboardLayout";
import { FormInput } from "../../../components/shared/form/input/FormInput";
import FormSelect, { TSelectOption } from "../../../components/shared/form/select/FormSelect";
import Button from "../../../components/shared/button/Button";
import Alert from "../../../components/shared/alert/Alert";

import './NewAdvertPage.css';

export default function NewAdvertPage() {
	const dispatch = useDispatch();
	const allTags = useSelector(getTags);
	const { pending: isLoading, error } = useSelector(getUi);
	
	const [formValues, setFormValues] = useState({
		name: '',
		sale: '',
		price: 0,
		tags: [],
		photo: null
	});
	const [formErrors, setFormErrors] = useState();
	
	useEffect(() => {
		dispatch(loadTags());
	}, [dispatch])

	const handleChange = (event) => {
		setFormValues(currentFormValues => ({
			...currentFormValues,
			[event.target.name]: event.target.multiple ? Array.from(event.target.selectedOptions, option => option.value) : event.target.value,
		}));
	};

	const handleChangeFile = (event) => {
		setFormValues(currentFormValues => {
			if (event.target.files) {
				return {
					...currentFormValues,
					[event.target.name]: event.target.files[0],
				}
			}
			return currentFormValues;
		});
	};

	const validateForm = () => {
		let valid = true;
		let newFormErrors = {};
		if (!formValues.name) {
			newFormErrors = {
				...newFormErrors,
				name: 'El campo nombre es requerido.'
			};
			valid = false;
		}
		if (!formValues.price || formValues.price <= 0) {
			newFormErrors = {
				...newFormErrors,
				price: 'El campo precio es requerido y debe ser mayor a cero.'
			};
			valid = false;
		}
		if (!formValues.sale) {
			newFormErrors = {
				...newFormErrors,
				sale: 'El campo compra/venta es requerido.'
			};
			valid = false;
		}
		if (!formValues.tags || !formValues.tags.length) {
			newFormErrors = {
				...newFormErrors,
				tags: 'El campo tags es requerido. Seleccione al menos un tag.'
			};
			valid = false;
		}
		setFormErrors(newFormErrors);

		return valid;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const valid = validateForm();
		if (valid) {
			dispatch(createAdvert({ ...formValues, sale: sale === '1'}));
		}
	};

	const saleOptions = [
		{ value: '1', text: 'Se vende' },
		{ value: '0', text: 'Se busca' },
	];
	const tagsOptions = allTags.map(tag => ({ value: tag, text: tag }));

	const { name, sale, price, tags } = formValues;

	return (
		<DashboardLayout title="Crear anuncio">
			<div className="newAdvert">
				{
					error && (
						<Alert variant="error">
							{error.message}
						</Alert>
					)
				}
				{
					formErrors && (
						<Alert variant="error">
							{Object.values(formErrors).map((error, index) => <div key={index}>{error}</div>)}
						</Alert>
					)
				}
				<form onSubmit={handleSubmit}>
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
					<FormInput
						type="number"
						name="price"
						id="price"
						label="Precio"
						onChange={handleChange}
						value={price}
					/>
					<FormInput
						type="file"
						name="photo"
						id="photo"
						label="Foto"
						onChange={handleChangeFile}
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
					<Button type="submit" disabled={isLoading}>Crear</Button>
				</form>
			</div>
		</DashboardLayout>
	);
}

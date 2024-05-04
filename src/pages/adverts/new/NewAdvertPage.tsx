import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { FormInput } from "../../../components/shared/form/input/FormInput";
import { TAdvertFormValues } from "../../../types/adverts";
import FormSelect, { TSelectOption } from "../../../components/shared/form/select/FormSelect";
import Button from "../../../components/shared/button/Button";
import { getTags } from "../../../api/tags";
import { createAdvert } from "../../../api/adverts";
import { TResponseError } from "../../../types/error";
import Alert from "../../../components/shared/alert/Alert";
import { useNavigate } from "react-router-dom";
import './NewAdvertPage.css';

export default function NewAdvertPage() {
	const navigate = useNavigate();
	
	const [allTags, setAllTags] = useState<string[]>([]);
	const [formValues, setFormValues] = useState<TAdvertFormValues>({
		name: '',
		sale: '',
		price: 0,
		tags: [],
		photo: null
	});
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<TResponseError | null>(null);

	useEffect(() => {
		const getAllTags = async () => {
			const tags = await getTags();
			setAllTags(tags);
		};

		getAllTags();
	}, [])

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setFormValues(currentFormValues => ({
			...currentFormValues,
			[event.target.name]: event.target.multiple ? Array.from((event as ChangeEvent<HTMLSelectElement>).target.selectedOptions, option => option.value) : event.target.value,
		}));
	};

	const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
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

	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();
		
		try {
			setIsLoading(true);
			const newAdvert = await createAdvert({ ...formValues, sale: sale === '1'});
			setIsLoading(false);
			navigate(`/adverts/${newAdvert.id}`);
		} catch (error: any) {
			setIsLoading(false);
			setError(error);
		}
	};

	const saleOptions: TSelectOption[] = [
		{ value: '1', text: 'Se vende' },
		{ value: '0', text: 'Se busca' },
	];
	const tagsOptions: TSelectOption[] = allTags.map(tag => ({ value: tag, text: tag }));

	const { name, sale, price, tags } = formValues;
	const buttonDisabled = !name || !sale || !price || !tags.length || isLoading;

	return (
		<DashboardLayout title="Crear anuncio">
			<div className="newAdvert">
				{error && (
					<Alert variant="error">
						{error.message}
					</Alert>
				)}
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
						value={sale as string}
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
					<Button type="submit" disabled={buttonDisabled}>Crear</Button>
				</form>
			</div>
		</DashboardLayout>
	);
}

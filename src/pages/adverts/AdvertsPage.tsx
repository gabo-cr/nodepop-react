import { useEffect, useState } from "react";
import { TAdvert } from "../../types/adverts";

import { Link } from "react-router-dom";
import { getAdverts } from "../../api/adverts";
import Alert from "../../components/shared/alert/Alert";
import { TResponseError } from "../../types/error";
import Advert from "../../components/adverts/Advert";
import EmptyList from "../../components/adverts/EmptyList";
import './AdvertsPage.css';
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function AdvertsPage() {
	const [adverts, setAdverts] = useState<TAdvert[]>([]);
	const [error, setError] = useState<TResponseError | null>(null);

	useEffect(() => {
		const getAllAdverts = async () => {
			try {
				const allAdverts = await getAdverts();
				setAdverts(allAdverts);
			} catch (error: any) {
				setError(error);
			}
		}

		getAllAdverts();
	}, []);

	return (
		<DashboardLayout title="Anuncios">
		{error && (
			<Alert variant="error">
				{error.message}
			</Alert>
		)}
		{
			adverts.length ? (
				<ul className="advertsList">
					{
					adverts.map(({ id, ...advert }) => (
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
		</DashboardLayout>
	);
}

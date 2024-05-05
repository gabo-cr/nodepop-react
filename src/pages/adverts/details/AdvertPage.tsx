import { useEffect, useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { TAdvert } from "../../../types/adverts";
import { useNavigate, useParams } from "react-router-dom";
import { getAdvert } from "../../../api/adverts";
import Loader from "../../../components/shared/loader/Loader";
import AdvertDetail from "../../../components/advert/AdvertDetail";

export default function AdvertPage() {
	const navigate = useNavigate();
	const params = useParams();

	const [advert, setAdvert] = useState<TAdvert | null>(null);

	useEffect(() => {
		const loadAdvert = async () => {
			try {
				if (params.advertId) {
					const advert = await getAdvert(params.advertId);
					setAdvert(advert);
				}
			} catch (error: any) {
				if (error.status === 404) {
					navigate('/404');
				}
			}
		};

		loadAdvert();
	}, [params.advertId, navigate])

	
	return (
		<DashboardLayout title="">
			{
				advert 
				? <AdvertDetail { ...advert } />
				: <Loader />
			}
		</DashboardLayout>
	);
}

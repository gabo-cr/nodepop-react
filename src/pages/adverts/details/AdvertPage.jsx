import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAdvert } from "../../../store/selectors";
import { loadAdvert } from "../../../store/actions";

import DashboardLayout from "../../../components/layout/DashboardLayout";
import Loader from "../../../components/shared/loader/Loader";
import AdvertDetail from "../../../components/advert/AdvertDetail";

export default function AdvertPage() {
	const { advertId } = useParams();
	const dispatch = useDispatch();
	const advert = useSelector(getAdvert(advertId));

	useEffect(() => {
		if (advertId) {
			dispatch(loadAdvert(advertId));
		}
	}, [advertId, dispatch])
	
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

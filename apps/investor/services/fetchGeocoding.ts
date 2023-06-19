import axios from "axios";
import { IOpportunitieAddress } from "../components/Opportunities/OpportunitiesCard/dto";

export async function fetchGeocode(localization: IOpportunitieAddress) {
	const { address, neighborhood, state_alias, street } = localization;

	try {
		const response = await axios.get(
			`https://maps.googleapis.com/maps/api/geocode/json`,
			{
				params: {
					address: `${address}+${street},+${neighborhood},+${state_alias}`,
					key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_APY_KEY as any,
				},
			}
		);
		return response.data;
	} catch (error: any) {
		console.log(error.message);
	}
}

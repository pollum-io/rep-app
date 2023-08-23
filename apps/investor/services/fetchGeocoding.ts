import axios from "axios";
import { IAddressData } from "../dtos/AddressData";

export async function fetchGeocode(localization: IAddressData) {
	const { number, neighborhood, state_alias, street } = localization;

	try {
		const response = await axios.get(
			`https://maps.googleapis.com/maps/api/geocode/json`,
			{
				params: {
					address: `${number}+${street},+${neighborhood},+${state_alias}`,
					key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_APY_KEY as string,
				},
			}
		);
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
}

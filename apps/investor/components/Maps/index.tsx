import { Flex } from "@chakra-ui/react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { FunctionComponent, useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { InvestmentModel } from "../../dtos/IInvestment";
interface IMaps {
	localization?: { lat: number; lng: number };
	investmentData?: InvestmentModel[];
}

export const Maps: FunctionComponent<IMaps> = ({
	localization,
	investmentData,
}) => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_APY_KEY as string,
	});
	const [uniqueGeolocations, setUniqueGeolocations] = useState([]);

	useEffect(() => {
		if (investmentData?.length) {
			const geolocationsSet = investmentData?.reduce((set, item) => {
				if (item.geolocation) {
					const geolocationString = JSON.stringify(item.geolocation);
					set.add(geolocationString);
				}
				return set;
			}, new Set());

			const uniqueGeolocationsArray = Array.from(geolocationsSet).map(
				(str: string) => JSON.parse(str)
			);

			setUniqueGeolocations(
				uniqueGeolocationsArray.map((geolocation) => ({
					...geolocation,
					name: investmentData.find(
						(item) =>
							JSON.stringify(item.geolocation) === JSON.stringify(geolocation)
					).name,
				}))
			);
		}
	}, [investmentData]);

	return (
		<>
			{isLoaded ? (
				investmentData?.length ? (
					<GoogleMap
						zoom={16}
						center={uniqueGeolocations[0]}
						mapContainerClassName="map-container"
					>
						{uniqueGeolocations.map((places: any, index: any) => (
							// eslint-disable-next-line react/jsx-key
							<MarkerF
								key={index}
								icon={{
									url: "/images/icons/Home-Maps.svg",
									scaledSize: new google.maps.Size(57, 57),
									labelOrigin: new google.maps.Point(30, -32),
								}}
								label={{
									text: places?.name,
									className: "map-label",
								}}
								position={places}
							/>
						))}
					</GoogleMap>
				) : (
					<GoogleMap
						zoom={16}
						center={localization}
						mapContainerClassName="map-container"
					>
						<MarkerF
							icon={{
								url: "/images/icons/Home-Maps.svg",
								scaledSize: new google.maps.Size(57, 57),
								labelOrigin: new google.maps.Point(30, -32),
							}}
							label={{
								text: "Crypto Plaza",
								className: "map-label",
							}}
							position={localization}
						/>
					</GoogleMap>
				)
			) : (
				<Flex
					justifyContent={"center"}
					alignItems={"center"}
					margin={"8rem auto"}
				>
					<Oval
						height={45}
						width={45}
						color="#1789A3"
						wrapperStyle={{}}
						wrapperClass=""
						visible={true}
						ariaLabel="oval-loading"
						secondaryColor="#bdbdbd"
						strokeWidth={2}
						strokeWidthSecondary={2}
					/>
				</Flex>
			)}
		</>
	);
};

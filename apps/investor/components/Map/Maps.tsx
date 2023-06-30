// import { Flex } from "@chakra-ui/react";
// import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
// import { FunctionComponent, useEffect, useMemo, useState } from "react";
// import { fetchGeocode } from "../../services";
// import { IAddressData } from "../../dtos/AddressData";
// interface IMaps {
// 	localization?: IAddressData;
// 	// localizations?: string;
// }

// export const Maps: FunctionComponent<IMaps> = ({ localization }) => {
// 	const [getLocalization, setGetLocalization] = useState<string>([]);
// 	// const [getLocalizations, setGetLocalizations] = useState<string[]>([]);

// 	const [data, setData] = useState<IAddressData>([]);
// 	const { isLoaded } = useLoadScript({
// 		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_APY_KEY as string,
// 	});

// 	useEffect(() => {
// 		if (localization) {
// 			fetchGeocode(localization).then((res) => {
// 				setData(res);
// 			});
// 			// } else if (localizations) {
// 			// 	localizations?.map((data: string) => {
// 			// 		fetchGeocode(data.address as string).then((res) => {
// 			// 			setData((prevState: string) => [...prevState, res]);
// 			// 		});
// 			// 	});
// 			// }
// 		}
// 	}, [localization]);

// 	useEffect(() => {
// 		// if (localizations) {
// 		// 	const asd = data?.map((data: string) => data?.results).flat();
// 		// 	const aaa = asd?.map((data: string) => data?.geometry?.location);

// 		// 	const getPlace = aaa.reduce((acc: string, curr: string) => {
// 		// 		const alreadyExists = acc.some(
// 		// 			(marker: string) => marker.lat === curr.lat && marker.lng === curr.lng
// 		// 		);

// 		// 		if (!alreadyExists) {
// 		// 			acc.push(curr);
// 		// 		}

// 		// 		return acc;
// 		// 	}, []);

// 		// 	setGetLocalizations(getPlace);
// 		// }
// 		// const getPlace = data?.results?.map(
// 		// 	(data: string) => data?.geometry?.location
// 		// );
// 		setGetLocalization(getPlace);
// 	}, [data, localization]);

// 	const convertPlace = useMemo(() => getLocalization?.[0], [getLocalization]);
// 	// const convertPlaces = useMemo(
// 	// 	() => getLocalizations?.[0],
// 	// 	[getLocalizations]
// 	// );
// 	console.log(localization, "localization");
// 	console.log(data, "data");

// 	return (
// 		<>
// 			{isLoaded ? (
// 				<GoogleMap
// 					zoom={16}
// 					center={convertPlace}
// 					mapContainerClassName="map-container"
// 				>
// 					<MarkerF
// 						icon={{
// 							url: "/images/icons/Home-Maps.svg",
// 							scaledSize: new google.maps.Size(57, 57),
// 							labelOrigin: new google.maps.Point(30, -32),
// 						}}
// 						label={{
// 							text: "Crypto Plaza",
// 							className: "map-label",
// 						}}
// 						position={convertPlace}
// 					/>
// 				</GoogleMap>
// 			) : (
// 				<Flex>Loading...</Flex>
// 			)}
// 		</>
// 	);
// };

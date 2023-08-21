import { Flex } from "@chakra-ui/react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { FunctionComponent } from "react";
import { Oval } from "react-loader-spinner";
interface IMaps {
	localization?: { lat: number; lng: number };
	localizations?: any;
}

export const Maps: FunctionComponent<IMaps> = ({
	localization,
	localizations,
}) => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_APY_KEY as string,
	});

	return (
		<>
			{isLoaded ? (
				localizations?.length ? (
					<GoogleMap
						zoom={16}
						center={localizations?.length ? localizations : localizations}
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
							position={localizations}
						/>
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

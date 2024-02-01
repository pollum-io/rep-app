import { Flex, Text } from "@chakra-ui/react";
import moment from "moment-timezone";
import { useState } from "react";
import Countdown from "react-countdown";
import { CountdownRenderProps } from "react-countdown/dist/Countdown";
import { useTranslation } from "react-i18next";
import { IOpportunitiesCard } from "../dtos/Oportunities";

interface ITimeCard {
	imovelDetails?: IOpportunitiesCard;
}

export const TimeCard: React.FC<ITimeCard> = ({ imovelDetails }) => {
	const [dateEndend, setDateEnded] = useState<string>();
	const [ended, setEnded] = useState<boolean>();
	const { t } = useTranslation();

	const renderer = ({
		days,
		hours,
		minutes,
		completed,
		props: { date },
	}: CountdownRenderProps) => {
		const dateFormated = moment(date).format("DD/MM/YYYY");
		if (completed) {
			setEnded(true);
			setDateEnded(dateFormated);
			return;
		} else {
			setEnded(false);
			return (
				<Text fontWeight="500" fontSize="1.25rem" lineHeight="2rem" id="timer">
					{t("opportunitieDetails.timer", {
						value1: days,
						value2: hours,
						value3: minutes,
					})}
				</Text>
			);
		}
	};

	return (
		<>
			{ended ? (
				<Flex
					bgColor="#29525f"
					py="0.25rem"
					px="1rem"
					borderRadius={"4.875rem"}
					fontSize={"sm"}
					color="#f8f8f8"
					gap="0.25rem"
					justifyContent="center"
				>
					<Text fontWeight="400">{t("opportunitieDetails.closedIn")}</Text>
					<Text fontWeight="400">{dateEndend}</Text>
				</Flex>
			) : (
				<Flex
					flexDirection="column"
					padding="1.5rem"
					gap="0.25rem"
					w="23.125rem"
					bgColor="#29525f"
					borderRadius="0.75rem"
					fontFamily="Poppins"
					color="#FFFFFF"
					h="max-content"
				>
					<Countdown date={imovelDetails?.sale_end_at} renderer={renderer} />
					<Text
						fontWeight="500"
						fontSize="1.25rem"
						lineHeight="2rem"
						id="timer"
					>
						{t("opportunitieDetails.closeSales")}
					</Text>
				</Flex>
			)}
		</>
	);
};

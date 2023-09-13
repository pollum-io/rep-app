import { Flex, Img, Text, Icon } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useOpportunities } from "../../../../apps/investor/hooks/useOpportunities";
import { IOpportunitiesCard } from "../dtos/Oportunities";
import { fetchEnterpriseById } from "services";

interface IImovelInfoDefault {
	imovelDetails?: IOpportunitiesCard;
}

export const ImovelInfoDefault: React.FC<IImovelInfoDefault> = ({
	imovelDetails,
}) => {
	const [enterpriseName, setEnterpriseName] = useState();
	const { hasToken } = useOpportunities();
	const [cota] = useState<number>(0);
	const { t } = useTranslation();

	useMemo(async () => {
		const name = await fetchEnterpriseById(imovelDetails?.enterprise_id);
		setEnterpriseName(name?.data?.enterprise_name);
	}, [imovelDetails?.enterprise_id]);

	return (
		<Flex flexDir={"column"}>
			<Flex gap="0.5rem" pb="0.5rem">
				<Img w="6" h="6" src={`/api/file/${imovelDetails?.enterprise_logo}`} />
				<Text fontWeight={"400"} color="#171923">
					{imovelDetails?.enterprise_name}
				</Text>
			</Flex>
			<Flex
				gap="0.8rem"
				mb="1.5rem"
				flexDir={"column"}
				w={"max"}
				alignItems={"start"}
			>
				{imovelDetails?.name && (
					<Text fontSize="4xl" fontWeight={"600"} color="#171923">
						{imovelDetails?.name}
					</Text>
				)}
				<Flex gap={"1rem"}>
					<Text
						fontSize={"sm"}
						fontWeight="400"
						color="#171923"
						bgColor="#F0E8FF"
						py="0.25rem"
						px="1rem"
						borderRadius={"4.875rem"}
						w="max"
					>
						{imovelDetails?.enterprise_type}
					</Text>
					{imovelDetails?.sub_categories?.map((cat: string, index: number) => (
						<Text
							key={index}
							fontSize={"sm"}
							fontWeight="400"
							color="#171923"
							bgColor="#F0E8FF"
							py="0.25rem"
							px="1rem"
							borderRadius={"4.875rem"}
							w="max"
						>
							{cat}
						</Text>
					))}
					{cota > 0 && (
						<Flex
							bgColor="#F0E8FF"
							py="0.25rem"
							px="1rem"
							borderRadius={"4.875rem"}
							fontSize={"sm"}
							color="#171923"
							gap="0.25rem"
							display={!hasToken ? "flex" : "none"}
							w="max"
						>
							<Text w="max" fontWeight="400">
								{t("opportunitieDetails.youHave")}
							</Text>
							<Text w="max" fontWeight="600">
								{cota} {t("opportunitieDetails.yourShares")}
							</Text>
						</Flex>
					)}
				</Flex>
			</Flex>
			<Flex gap="0.625rem" pb="3rem">
				<Icon w="1.25rem" h="1.5rem" color={"#718096"} as={FiMapPin} />
				<Text color={"#718096"}>
					{" "}
					{`${imovelDetails?.address?.street}, ${imovelDetails?.address?.neighborhood}`}
				</Text>
			</Flex>
		</Flex>
	);
};

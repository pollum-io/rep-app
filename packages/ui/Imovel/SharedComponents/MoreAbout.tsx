import { FunctionComponent } from "react";
import { Flex, Text, Img } from "@chakra-ui/react";
import { IMoreAbout } from "../dtos/IMoreAbout";
import { useTranslation } from "react-i18next";

const MoreAboutComponent: FunctionComponent<IMoreAbout> = ({
	icon,
	title,
	description,
	onClick,
}) => {
	return (
		<Flex
			bgColor={"#003243c8"}
			p={"1rem"}
			flexDir={"column"}
			h={"max"}
			w="max"
			borderRadius={"1rem"}
			transition={"0.5s"}
			_hover={{
				boxShadow:
					"3px 2px 6px -2px rgb(0 0 0), -6px 0px 15px 0px rgb(0 0 0 / 0%)",
			}}
			cursor={"pointer"}
			onClick={onClick}
		>
			<Flex flexDir={"row"} w="20.5rem" align={"center"}>
				<Img src={icon} w={"3rem"} pb={"1rem"} mr={"1rem"} />
				<Flex flexDir={"column"}>
					<Text
						color={"#fff"}
						fontWeight={600}
						fontSize={"1.125rem"}
						pb={"0.5rem"}
						w="max"
					>
						{title}
					</Text>
					<Text
						textAlign={"left"}
						w="100%"
						h={"3.75rem"}
						color={"#fff"}
						fontSize={"0.875rem"}
					>
						{description}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};

interface IMoreAbountRender {
	page?: string;
	setPage: React.Dispatch<React.SetStateAction<string>>;
}

export const MoreAbout: FunctionComponent<IMoreAbountRender> = ({
	setPage,
}) => {
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	const { t } = useTranslation();

	return (
		<Flex gap={"1.5rem"}>
			<MoreAboutComponent
				icon="/icons/description.svg"
				title={t("opportunitieDetails.detalhamentoTecnico")}
				description={t("opportunitieDetails.veja")}
				onClick={() => {
					setPage("detalhamento");
					scrollToTop();
				}}
			/>
			<MoreAboutComponent
				icon="/icons/opt-resume.svg"
				title={t("opportunitieDetails.resumo")}
				description={t("opportunitieDetails.confira")}
				onClick={() => {
					setPage("aportes");
					scrollToTop();
				}}
			/>
			<MoreAboutComponent
				icon="/icons/geral.svg"
				title={t("opportunitieDetails.visaoGeral")}
				description={t("opportunitieDetails.previsoesFin")}
				onClick={() => {
					setPage("visao geral");
					scrollToTop();
				}}
			/>
		</Flex>
	);
};

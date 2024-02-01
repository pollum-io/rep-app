import { Flex, Link, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook, BsFillTelephoneFill, BsWhatsapp } from "react-icons/bs";
import { FaGlobe, FaTelegramPlane } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ICompanieContact } from "./dto";
export const CompanieContact: FunctionComponent<ICompanieContact> = ({
	website,
	whatsapp,
	telephone,
	email,
	instagram,
	twitter,
	telegram,
	facebook,
}) => {
	const infos = [
		{
			valid: !!website,
			content: website,
			link: "",
			icon: <FaGlobe size={24} color="#003243c8" />,
			id: 1,
		},
		{
			valid: !!whatsapp,
			content: "Whatsapp",
			link: whatsapp,
			icon: <BsWhatsapp size={24} color="#003243c8" />,
			id: 2,
		},
		{
			valid: !!telephone,
			content: "Telefone",
			link: telephone,
			icon: <BsFillTelephoneFill size={23} color="#003243c8" />,
			id: 3,
		},
		{
			valid: !!email,
			content: email,
			link: "",
			icon: <MdEmail size={26} color="#003243c8" />,
			id: 4,
		},
		{
			valid: !!instagram,
			content: `@${instagram?.split("/")?.pop()}`,
			link: instagram,
			icon: <AiFillInstagram size={26} color="#003243c8" />,
			id: 5,
		},
		{
			valid: !!twitter,
			content: `@${twitter?.split("/")?.pop()}`,
			link: twitter,
			icon: <AiOutlineTwitter size={26} color="#003243c8" />,
			id: 6,
		},
		{
			valid: !!telegram,
			content: `@${telegram?.split("/")?.pop()}`,
			link: telegram,
			icon: <FaTelegramPlane size={24} color="#003243c8" />,
			id: 7,
		},
		{
			valid: !!facebook,
			content: `@${facebook?.split("/")?.pop()}`,
			link: facebook,
			icon: <BsFacebook size={24} color="#003243c8" />,
			id: 8,
		},
	];

	const validInfos = infos.filter((item) => item.valid);

	return (
		<Flex
			flexDirection="column"
			alignItems="flex-start"
			padding="1.5rem"
			gap="1.5rem"
			w="23.125rem"
			h="max-content"
			border="0.0625rem solid #E5E7EB"
			boxShadow="0rem 1.25rem 1.5625rem rgba(31, 41, 55, 0.1), 0rem 0.625rem 0.625rem rgba(31, 41, 55, 0.04)"
			borderRadius="0.75rem"
			bgColor="white"
			position="sticky"
			top="10%"
		>
			{validInfos.map((item) => (
				<Link
					key={item.id}
					href={item.link}
					target="_blank"
					_hover={{ textDecoration: "none", bgColor: "transparent" }}
					_active={{ bgColor: "transparent" }}
				>
					<Flex gap="1rem" alignItems="center" position={"relative"}>
						<Flex>{item.icon}</Flex>
						<Text
							fontFamily="Poppins"
							fontSize="0.875rem"
							lineHeight="1.25rem"
							color="#171923"
							textOverflow={"ellipsis"}
							whiteSpace={"nowrap"}
							overflow={"hidden"}
							maxW={"18.125rem"}
						>
							{item.content}
						</Text>
					</Flex>
				</Link>
			))}
		</Flex>
	);
};

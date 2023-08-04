import { Flex, Link, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook, BsFillTelephoneFill, BsWhatsapp } from "react-icons/bs";
import { FaGlobe, FaTelegramPlane } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ICompanieContact } from "./dto";

export const CompanieContact: FunctionComponent<ICompanieContact> = ({
	website,
	whats,
	phone,
	email,
	instagram,
	twitter,
	telegram,
	facebook,
}) => {
	const infos = [
		{
			valid: website ? true : false,
			content: website,
			link: "",
			icon: <FaGlobe size={24} color="#007D99" />,
			id: 1,
		},
		{
			valid: whats ? true : false,
			content: whats,
			link: "",
			icon: <BsWhatsapp size={24} color="#007D99" />,
			id: 2,
		},
		{
			valid: phone ? true : false,
			content: phone,
			link: "",
			icon: <BsFillTelephoneFill size={23} color="#007D99" />,
			id: 3,
		},
		{
			valid: email ? true : false,
			content: email,
			link: "",
			icon: <MdEmail size={26} color="#007D99" />,
			id: 4,
		},
		{
			valid: instagram ? true : false,
			content: instagram?.username,
			link: instagram?.url,
			icon: <AiFillInstagram size={26} color="#007D99" />,
			id: 5,
		},
		{
			valid: twitter ? true : false,
			content: twitter?.username,
			link: twitter?.url,
			icon: <AiOutlineTwitter size={26} color="#007D99" />,
			id: 6,
		},
		{
			valid: telegram ? true : false,
			content: telegram?.username,
			link: telegram?.url,
			icon: <FaTelegramPlane size={24} color="#007D99" />,
			id: 7,
		},
		{
			valid: facebook ? true : false,
			content: facebook?.username,
			link: facebook?.url,
			icon: <BsFacebook size={24} color="#007D99" />,
			id: 8,
		},
	];

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
			{infos?.map(
				(item) =>
					item?.content && (
						<Link
							key={item?.id}
							href={item?.link}
							target="_blank"
							_hover={{ textDecoration: "none", bgColor: "transparent" }}
							_active={{ bgColor: "transparent" }}
						>
							<Flex
								display={item?.valid === true ? "flex" : "none"}
								gap="1rem"
								alignItems="center"
							>
								<Flex>{item?.icon}</Flex>
								<Text
									fontFamily="Poppins"
									fontSize="0.875rem"
									lineHeight="1.25rem"
									color="#171923"
								>
									{item?.content}
								</Text>
							</Flex>
						</Link>
					)
			)}
		</Flex>
	);
};

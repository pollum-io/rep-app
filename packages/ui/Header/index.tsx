import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Oval } from "react-loader-spinner";
import { useUser } from "../../../apps/investor/hooks/useUser";
import { HamburguerMenu } from "./HamburguerMenu";
import { HeaderLinks } from "./HeaderLinks";

interface IHeader {
	isDrawer?: boolean;
}

export const Header: React.FC<IHeader> = ({ isDrawer }) => {
	const { push } = useRouter();
	const { username } = useUser();

	return (
		<Flex
			w="100%"
			h={"4.75rem"}
			flexDir="row"
			alignItems={"center"}
			justifyContent={"center"}
			bgColor={"#FFFFFF"}
			borderBottom="0.0625rem solid #E2E8F0"
			boxShadow="0rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.05)"
		>
			<Flex
				px={{
					sm: "24px",
					md: "5rem",
					lg: "0rem",
					xl: "0rem",
					"2xl": "unset",
				}}
				margin={"0 auto"}
				maxWidth="70rem"
				alignItems={"center"}
				w={"100%"}
			>
				<Flex
					onClick={() => (isDrawer ? "" : push("/oportunidades"))}
					_hover={{ cursor: "pointer" }}
					justifyContent={"flex-start"}
					w={"100%"}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="23"
						height="32"
						viewBox="0 0 23 32"
						fill="none"
					>
						<path
							d="M7.63677 9.47778L0.608424 13.5322C0.424848 13.6371 0.272742 13.7892 0.162596 13.978C0.0576954 14.1616 0 14.3662 0 14.5812V25.1814C0 25.4542 0.0734305 25.7217 0.209801 25.9577C0.346172 26.1937 0.545484 26.393 0.78151 26.5294L9.96557 31.8374C10.1491 31.9423 10.3589 32 10.574 32C10.789 32 10.9936 31.9423 11.1824 31.8374L18.2475 27.7567L7.63153 21.6358L7.63677 9.47778Z"
							fill="url(#paint0_linear_6551_1022)"
						/>
						<path
							d="M14.9431 22.5222L21.9715 18.4678C22.155 18.3629 22.3071 18.2108 22.4173 18.0219C22.5222 17.8384 22.5799 17.6286 22.5799 17.4135V6.81855C22.5799 6.54581 22.5065 6.27831 22.3701 6.03704C22.2337 5.80101 22.0344 5.6017 21.7984 5.46533L12.6143 0.162596C12.4307 0.0576954 12.2209 0 12.0111 0C11.7961 0 11.5915 0.0576954 11.4027 0.162596L4.33765 4.24324L14.9484 10.3589L14.9431 22.5222Z"
							fill="url(#paint1_linear_6551_1022)"
						/>
						<defs>
							<linearGradient
								id="paint0_linear_6551_1022"
								x1="9.28"
								y1="4.31997"
								x2="9.15401"
								y2="35.904"
								gradientUnits="userSpaceOnUse"
							>
								<stop stop-color="#1789A3" stop-opacity="0" />
								<stop offset="1" stop-color="#1789A3" />
							</linearGradient>
							<linearGradient
								id="paint1_linear_6551_1022"
								x1="13.4259"
								y1="-3.86503"
								x2="13.44"
								y2="26.88"
								gradientUnits="userSpaceOnUse"
							>
								<stop stop-color="#1789A3" />
								<stop offset="1" stop-color="#1789A3" stop-opacity="0" />
							</linearGradient>
						</defs>
					</svg>
				</Flex>
				<Flex justifyContent={"center"} w={"100%"} alignItems={"center"}>
					<HeaderLinks isDrawer={isDrawer} />
				</Flex>
				{username === undefined && !isDrawer ? (
					<Flex
						gap="0.75rem"
						fontFamily="Poppins"
						fontWeight="500"
						fontSize="0.875rem"
						lineHeight="1.25rem"
						alignItems="center"
						w={"max"}
						justifyContent="center"
					>
						<Oval
							height={15}
							width={15}
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
				) : (
					<Flex
						gap="0.75rem"
						fontFamily="Poppins"
						fontWeight="500"
						justifyContent={"flex-end"}
						fontSize="0.875rem"
						lineHeight="1.25rem"
						alignItems="center"
						w={"100%"}
					>
						<HamburguerMenu isDrawer={isDrawer} />
					</Flex>
				)}
			</Flex>
		</Flex>
	);
};

// import { Flex, Img, Text } from "@chakra-ui/react";
// import moment from "moment";
// import { FunctionComponent, useEffect, useState } from "react";
// import { useUser } from "../../hooks/useUser";
// import { fetchImages } from "../../services";
// import { apiInstance } from "../../services/api";
// interface Investment {
// 	amount: number;
// 	shares: number;
// 	investment_address: string;
// 	token_address: string;
// 	token_minted: number;
// 	token_price: number;
// 	expected_delivery_date?: string;
// 	profitability?: number;
// }

// interface EnterpriseData {
// 	name: string;
// 	enterprise_type: string;
// 	pictures_enterprise: string[];
// }

// interface IImovelList {
// 	isFinished: boolean;
// 	investmentData?: Investment[];
// 	enterpriseData?: EnterpriseData[];
// }

// type InvestmentDataItem = {
// 	date?: string;
// 	amount?: number;
// 	investment_address?: string;
// 	shares?: number;
// 	pictures_enterprise?: string[];
// 	name?: string;
// 	enterprise_type?: string;
// 	token_address?: string;
// 	token_minted?: number;
// 	token_price?: number;
// 	token_supply?: string;
// 	expected_delivery_date?: string;
// 	profitability?: string;
// };

// export const ImovelList: FunctionComponent<IImovelList> = ({
// 	isFinished,
// 	investmentData,
// 	enterpriseData,
// }) => {
// 	const { isInvestor } = useUser();

// 	const [resultWithImages, setResultWithImages] = useState<string>([]);
// 	const api = apiInstance();

// 	const result = investmentData?.reduce(
// 		(acc: InvestmentDataItem[], investment: InvestmentDataItem) => {
// 			const existingInvestment = acc.find(
// 				(item) => item.investment_address === investment.investment_address
// 			);
// 			if (existingInvestment) {
// 				existingInvestment.amount += investment.amount;
// 				existingInvestment.shares += investment.shares;
// 			} else {
// 				acc.push({ ...investment });
// 			}
// 			return acc;
// 		},
// 		[]
// 	);

// 	const totalAmount = result?.reduce(
// 		(accumulator: number, investment: InvestmentDataItem) => {
// 			return accumulator + investment.amount;
// 		},
// 		0
// 	);

// 	useEffect(() => {
// 		const getImage = async () => {
// 			const newResultWithImages = await Promise.all(
// 				(result ? result : enterpriseData).map(
// 					async (item: InvestmentDataItem) => {
// 						const image = item.pictures_enterprise[0];
// 						const imageUrl = await api.get(`/file/${image}`);
// 						return {
// 							...item,
// 							pictures_enterprise: imageUrl.request.responseURL,
// 						};
// 					}
// 				)
// 			);
// 			setResultWithImages(newResultWithImages);
// 		};

// 		getImage();
// 	}, []);

// 	return (
// 		<>
// 			{resultWithImages?.map(
// 				(investment: InvestmentDataItem, index: number) => {
// 					return (
// 						// eslint-disable-next-line react/jsx-key
// 						<Flex
// 							key={index}
// 							id="body-table-container"
// 							borderRadius="0.75rem"
// 							opacity={isFinished ? "0.5" : "1"}
// 							w="100%"
// 							border="1px solid #EDF2F7"
// 							_hover={{
// 								cursor: "pointer",
// 								boxShadow:
// 									"0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
// 								border: "1px solid transparent",
// 							}}
// 							transition="0.4s"
// 							justifyContent={"space-between"}
// 						>
// 							<Flex alignItems={"center"} w="18rem" gap="1rem">
// 								{isFinished ? (
// 									<Flex
// 										w="6rem"
// 										h="4.25rem"
// 										borderRadius="0.75rem 0rem 0rem 0.75rem"
// 									>
// 										<Img
// 											src={investment?.pictures_enterprise}
// 											w="100%"
// 											h="100%"
// 										/>
// 										<Flex
// 											bgColor={"rgba(0, 0, 0, 0.36)"}
// 											color={"#FFFFFF"}
// 											px="1.5"
// 											py="0.1rem"
// 											borderRadius="15rem"
// 											fontSize={"xs"}
// 											fontWeight={"500"}
// 											position={"absolute"}
// 										>
// 											Encerrado
// 										</Flex>
// 									</Flex>
// 								) : (
// 									<Flex borderRadius="0.75rem 0rem 0rem 0.75rem">
// 										<Img
// 											src={investment?.pictures_enterprise}
// 											w="6rem"
// 											h="4.25rem"
// 											borderRadius="0.75rem 0rem 0rem 0.75rem"
// 										/>
// 									</Flex>
// 								)}

// 								<Flex flexDir={"column"} w="8.5625rem">
// 									<Text fontSize={"md"} fontWeight={"500"} color={"#171923"}>
// 										{investment?.name}
// 									</Text>
// 									<Text fontSize={"xs"} fontWeight={"400"} color={"#2D3748"}>
// 										{investment?.enterprise_type}
// 									</Text>
// 								</Flex>
// 							</Flex>
// 							<Flex w="70%" alignItems="center" justifyContent="space-between">
// 								<Flex>
// 									{isInvestor ? (
// 										<Flex flexDir={"column"} w="7rem">
// 											<Text
// 												cursor={isFinished ? "default" : "pointer"}
// 												fontSize={"md"}
// 												fontWeight="500"
// 												color={"#007D99"}
// 											>
// 												{`${investment?.investment_address?.slice(
// 													0,
// 													5
// 												)}...${investment?.investment_address?.slice(38)}`}
// 											</Text>
// 											<Text fontSize={"xs"} fontWeight="400" color={"#2D3748"}>
// 												{investment?.shares} cotas
// 											</Text>
// 										</Flex>
// 									) : (
// 										<Flex w="7rem">
// 											<Text
// 												cursor={isFinished ? "default" : "pointer"}
// 												fontSize={"md"}
// 												fontWeight="500"
// 												color={"#007D99"}
// 											>
// 												{`${investment?.token_address?.slice(
// 													0,
// 													5
// 												)}...${investment?.token_address?.slice(38)}`}
// 											</Text>
// 										</Flex>
// 									)}
// 								</Flex>
// 								<Flex>
// 									{isInvestor ? (
// 										<Flex flexDir={"column"} w="7rem">
// 											<Text fontSize={"md"} fontWeight="400" color={"#171923"}>
// 												R$ {investment?.amount}
// 											</Text>
// 											<Text fontSize={"xs"} fontWeight="400" color={"#171923"}>
// 												{(investment?.amount / totalAmount) * 100} % do
// 												portfólio
// 											</Text>
// 										</Flex>
// 									) : (
// 										<Text
// 											fontSize={"md"}
// 											fontWeight="400"
// 											color={"#171923"}
// 											w="7rem"
// 										>
// 											R$ {investment?.token_minted * investment?.token_price}
// 										</Text>
// 									)}
// 								</Flex>
// 								<Flex display={isInvestor ? "none" : "flex"} w="7rem">
// 									<Text fontSize={"md"} fontWeight="400" color={"#171923"}>
// 										{investment?.token_supply}
// 									</Text>
// 								</Flex>
// 								<Flex w={isInvestor ? "7rem" : "9rem"}>
// 									<Text fontSize={"md"} fontWeight="400" color={"#171923"}>
// 										{isInvestor
// 											? investment.expected_delivery_date &&
// 											  moment(investment.expected_delivery_date).format("YYYY")
// 											: investment?.token_supply - investment?.token_minted}
// 									</Text>
// 								</Flex>
// 								{isInvestor && (
// 									<>
// 										<Flex w="7rem">
// 											<Text fontSize={"md"} fontWeight="400" color={"#171923"}>
// 												R$ {investment?.profitability}
// 											</Text>
// 										</Flex>
// 									</>
// 								)}
// 							</Flex>
// 						</Flex>
// 					);
// 				}
// 			)}
// 		</>
// 	);
// };

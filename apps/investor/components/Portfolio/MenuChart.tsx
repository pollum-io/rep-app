import { ChevronDownIcon } from "@chakra-ui/icons";
import {
	Button,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { MdExpandMore } from "react-icons/md";

interface IMenuChart {
	title?: string;
	titleColor?: string;
	defaultSelection: string;
}

interface options {
	id: number;
	name: string;
}

const options = [{ id: 1, name: "Option 1" }];

export const MenuChart: FunctionComponent<IMenuChart> = ({
	title,
	titleColor = "#FFFFFF",
	defaultSelection,
}) => {
	return (
		<Flex alignItems="center" gap="0.75rem" ml="0.7rem" pr="2">
			<Text fontSize={"sm"} fontWeight="500" color={titleColor}>
				{title}
			</Text>
			<Menu placement={"bottom-end"}>
				<MenuButton
					w="max"
					h="max"
					py="2"
					px="3"
					color="black"
					fontWeight={"400"}
					fontSize="sm"
					bgColor="white"
					as={Button}
					border="1px solid #E2E8F0"
					borderRadius="0.375rem"
					rightIcon={<MdExpandMore style={{ marginLeft: "4rem" }} />}
					_hover={{}}
					_expanded={{ bgColor: "#ffffff" }}
					_focus={{ boxShadow: "none", bgColor: "#ffffff" }}
				>
					{defaultSelection}
				</MenuButton>
				<MenuList>
					{options.map((values: options) => (
						<MenuItem key={values.id}>{values.name}</MenuItem>
					))}
				</MenuList>
			</Menu>
		</Flex>
	);
};

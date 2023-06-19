import { Flex, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { ICompanieInfoInProgress } from "./dto";

export const CompanieInfoInProgress: FunctionComponent<
  ICompanieInfoInProgress
> = ({ livnProp, delivered, inProgress, vgv }) => {
  const { t } = useTranslation();

  return (
    <Flex h={["unset", "unset", "unset", "24rem", "10rem"]}>
      <Flex
        w={[
          "max-content",
          "max-content",
          "max-content",
          "max-content",
          "max-content",
        ]}
        h="max-content"
        py="1.5rem"
        flexDirection={["unset", "unset", "unset", "column", "row"]}
        bgColor="#FFFFFF"
        border="0.0625rem solid #E5E7EB"
        borderRadius="0rem 0.75rem 0.75rem 0rem"
        fontFamily="Poppins"
        pr={["unset", "unset", "unset", "6rem", "3.625rem"]}
        alignItems={["unset", "unset", "unset", "unset", "center"]}
        justifyContent="end"
        gap={["unset", "unset", "unset", "1.5rem", "3.5rem"]}
        mt="4.25rem"
        left="0"
        borderLeft="none"
        pl="0"
      >
        <Flex flexDirection="column" gap="0.25rem">
          <Text fontSize="0.875rem" lineHeight="1.25rem" color="#007D99">
            {t("companieDetails.livnProp")}
          </Text>
          <Text fontSize="1rem" lineHeight="1.5rem" color="#171923">
            {livnProp}
          </Text>
        </Flex>
        <Flex flexDirection="column" gap="0.25rem">
          <Text fontSize="0.875rem" lineHeight="1.25rem" color="#007D99">
            {t("companieDetails.delivered")}
          </Text>
          <Text fontSize="1rem" lineHeight="1.5rem" color="#171923">
            {delivered}
          </Text>
        </Flex>
        <Flex flexDirection="column" gap="0.25rem">
          <Text fontSize="0.875rem" lineHeight="1.25rem" color="#007D99">
            {t("companieDetails.inProgress")}
          </Text>
          <Text fontSize="1rem" lineHeight="1.5rem" color="#171923">
            {inProgress}
          </Text>
        </Flex>
        <Flex flexDirection="column" gap="0.25rem">
          <Text fontSize="0.875rem" lineHeight="1.25rem" color="#007D99">
            {t("companieDetails.vgv")}
          </Text>
          <Text fontSize="1rem" lineHeight="1.5rem" color="#171923">
            {vgv}
          </Text>
        </Flex>
      </Flex>
      <Flex
        w={["max-content", "max-content", "max-content", "max-content", "50%"]}
        h="max-content"
        py="1.5rem"
        border="0.0625rem solid #E5E7EB"
        pr={["unset", "unset", "unset", "6rem", "3.625rem"]}
        left="0"
        position="absolute"
        borderRight="none"
        mt="4.25rem"
      >
        <Flex
          h={["unset", "unset", "unset", "16.5rem", "3rem"]}
          bgColor="transparent"
        />
      </Flex>
    </Flex>
  );
};

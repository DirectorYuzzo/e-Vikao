import { Box, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import React from "react";
import {
  FiArrowDown,
  FiDollarSign,
  FiInfo,
  FiInstagram,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";

const Setting = () => {
  return (
    <Box p={5}>
      <Heading>Setting</Heading>
      <HStack p={2} mt={5} color="green.900" bg="green.100" borderRadius="lg">
        <FiInfo color="green.900" />
        <Box>Page hii inafanyiwa malekebisho! soon will be Available.</Box>
      </HStack>

      <Box position="fixed" bottom={20} right={20}>
        <Heading fontSize="Sm">Created byc</Heading>
        <Flex justify="space-between" p={1}>
          <FiInstagram color="red" />
          <FiTwitter color="dark" />
          <FiYoutube color="red" />
        </Flex>
        <Text>Director Yuzzo.</Text>
      </Box>
    </Box>
  );
};

export default Setting;

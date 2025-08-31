import { Box, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { FiInfo, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";

const Reports = () => {
  return (
    <Box p={5}>
      <Heading>Reports</Heading>
      <HStack p={2} mt={5} color="green.900" bg="green.100" borderRadius="lg">
        <FiInfo color="green.900" />
        <Text>Page hii inafanyiwa malekebisho! soon will be Available </Text>
      </HStack>

      <Box position="fixed" bottom={20} right={20}>
        <Flex justify="space-between" p={1}>
          <FiInstagram color="red" />
          <FiTwitter color="black" />
          <FiYoutube color="red" />
        </Flex>
        <Text>Director Yuzzo.</Text>
      </Box>
    </Box>
  );
};

export default Reports;

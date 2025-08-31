import {
  Box,
  Heading,
  HStack,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiInfo, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";

const Setting = () => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("green.100", "green.700");
  const cardText = useColorModeValue("green.900", "green.50");

  return (
    <Box p={5} bg={bg} minH="100vh">
      <Heading mb={5} color={useColorModeValue("gray.700", "gray.200")}>
        Settings
      </Heading>

      <HStack p={2} mt={5} bg={cardBg} borderRadius="lg" color={cardText}>
        <FiInfo />
        <Box>Page hii inafanyiwa malekebisho! Soon will be available.</Box>
      </HStack>

      <Box
        position="fixed"
        bottom={20}
        right={20}
        bg={useColorModeValue("gray.100", "gray.800")}
        p={3}
        borderRadius="md"
      >
        <Heading
          fontSize="sm"
          color={useColorModeValue("gray.700", "gray.200")}
        >
          Created by
        </Heading>
        <Flex justify="space-between" p={1}>
          <FiInstagram color="red" />
          <FiTwitter color="blue" />
          <FiYoutube color="red" />
        </Flex>
        <Text color={useColorModeValue("gray.700", "gray.200")}>
          Director Yuzzo.
        </Text>
      </Box>
    </Box>
  );
};

export default Setting;

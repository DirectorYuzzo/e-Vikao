import { Box, Text, Button, VStack, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const textColor = useColorModeValue("gray.500", "gray.300");

  return (
    <Box
      p={8}
      textAlign="center"
      minH="100vh"
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <VStack spacing={6}>
        <Text fontSize="6xl" fontWeight="bold" color={textColor}>
          404
        </Text>
        <Text fontSize="2xl" fontWeight="semibold" color={textColor}>
          Page Not Found
        </Text>
        <Text color={textColor}>
          The page you're looking for doesn't exist or has been moved.
        </Text>
        <Button as={Link} to="/" colorScheme="blue">
          Go Back Home
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFound;

import { Box, Text, Button, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box p={8} textAlign="center">
      <VStack spacing={6}>
        <Text fontSize="6xl" fontWeight="bold" color="gray.500">
          404
        </Text>
        <Text fontSize="2xl" fontWeight="semibold">
          Page Not Found
        </Text>
        <Text color="gray.600" mb={6}>
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

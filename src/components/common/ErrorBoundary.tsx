// src/components/common/ErrorBoundary.tsx
import { Box, Text, Button } from "@chakra-ui/react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <Box p={8} textAlign="center">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Oops! Something went wrong.
      </Text>

      {isRouteErrorResponse(error) ? (
        <Text color="red.500" mb={4}>
          {error.status} {error.statusText}
        </Text>
      ) : (
        <Text color="red.500" mb={4}>
          {(error as Error).message}
        </Text>
      )}

      <Button colorScheme="blue" onClick={() => (window.location.href = "/")}>
        Go Home
      </Button>
    </Box>
  );
};

export default ErrorBoundary;

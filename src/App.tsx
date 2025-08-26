import React from "react";
import DashBoard from "./components/DashBoard";
import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Layout>
      <Box bg={"gray.50"} minH="100vh" py={16}>
        <Container maxW="container.md">
          <Box p={8} bg="white" rounded="2xl" shadow="md" borderWidth="1px">
            <Heading size="lg" color="blue.700">
              e-Vikao DashBoard
            </Heading>
            <Text mt={2} color="gray.600">
              Minimal stater. We'll add sidebar, header, card, form step by step
            </Text>
            <Button mt={6} colorScheme="blue" onClick={() => alert("It work")}>
              Hellow
            </Button>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default App;

import React from "react";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import DashboardContent from "./DashboardContent";
import Sidebar from "./Sidebar";
import Header from "./Header";

function App2() {
  return (
    <ChakraProvider>
      <Flex>
        <Sidebar />
        <Box flex="1" bg="gray.50">
          <Header />
          <DashboardContent />
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App2;

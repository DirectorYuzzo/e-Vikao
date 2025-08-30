import { Flex, Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
import Header from "./Header";
import Sidebar from "./sidebar";

const DashboardLayout = () => {
  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      <Box display={{ base: "none", md: "block" }}>
        <Sidebar />
      </Box>

      {/* Main content */}
      <Box flex="1">
        <Header />
        <Box as="main" p={4}>
          <Outlet /> {/* This renders our page content */}
        </Box>
      </Box>
    </Flex>
  );
};

export default DashboardLayout;

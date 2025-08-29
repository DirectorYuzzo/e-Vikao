// src/components/layout/DashboardLayout.tsx
import { Flex, Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { User } from "../../types";

const user: User = {
  id: "2",
  name: "Morgan",
  email: "morgan@dev.com",
  role: "admin",
};

const DashboardLayout = () => {
  return (
    <Flex minH="100vh">
      {/* Sidebar - hidden on mobile */}
      <Box display={{ base: "none", md: "block" }}>
        <Sidebar />
      </Box>

      {/* Main content */}
      <Box flex="1">
        <Header title="Dashboard" user={user} />
        <Box as="main" p={4}>
          <Outlet /> {/* This is where child routes will render */}
        </Box>
      </Box>
    </Flex>
  );
};

export default DashboardLayout;

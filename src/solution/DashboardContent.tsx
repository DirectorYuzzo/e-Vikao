import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { User } from "../types";

// Mock user data
const mockUser: User = {
  id: "1",
  name: "Philip",
  email: "philip@example.com",
  role: "admin",
};

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Flex minH="100vh" bg="gray.50">
      {/* Sidebar - hidden on mobile, shown on desktop */}
      {!isMobile && (
        <Box
          w={isSidebarCollapsed ? "70px" : "250px"}
          transition="width 0.3s ease"
          bg="white"
          boxShadow="md"
        >
          <Sidebar
            user={mockUser}
            isCollapsed={isSidebarCollapsed}
            onToggle={toggleSidebar}
          />
        </Box>
      )}

      {/* Main content area */}
      <Box
        flex="1"
        ml={
          !isMobile && isSidebarCollapsed ? "70px" : !isMobile ? "250px" : "0"
        }
        transition="margin-left 0.3s ease"
      >
        <Header
          user={mockUser}
          onToggleSidebar={toggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <Box as="main" p={{ base: 4, md: 6 }}>
          {/* We'll add dashboard content here in next tasks */}
          <Box>Main content will go here</Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Dashboard;

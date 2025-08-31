import { Flex, Box, useDisclosure } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  return (
    <Flex minH="100vh">
      <Sidebar isOpen={isOpen} onClose={onClose} />

      <Box flex="1" ml={{ base: 0, md: "250px" }}>
        <Header onToggle={onToggle} isSidebarOpen={isOpen} />
        <Box as="main" p={4}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};

export default DashboardLayout;

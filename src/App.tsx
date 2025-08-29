import { useState } from "react";
import DashBoard from "./components/DashBoard";
import { Box, useBreakpointValue, Flex } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { User } from "./types";

const user: User = {
  id: "2",
  name: "Morgan",
  email: "morgan@dev.com",
  role: "admin",
};
const App = () => {
  const handleMenuClick = (item: string) => {
    console.log("clicked: " + item);
  };

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Flex>
      {!isMobile && (
        <Box
          w={isSidebarCollapsed ? "70px" : "250px"}
          transition="width 0.3s ease"
          bg="white"
          boxShadow="md"
        >
          <Sidebar
            user={user}
            isCollapsed={isSidebarCollapsed}
            onToggle={toggleSidebar}
          />
        </Box>
      )}
      <Flex direction="column" flex={1}>
        <Header title="Dashboard" user={user} />
        <DashBoard />
      </Flex>
    </Flex>
  );
};

export default App;

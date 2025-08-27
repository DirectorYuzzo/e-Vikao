import React from "react";
import DashBoard from "./components/DashBoard";
import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import Layout from "./components/Layout";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MeetingCard from "./components/MeetingCard";
import VikaoDashboard from "./solution/newDash";

const App = () => {
  const user = {
    name: "Morgan",
    email: "morgan@dev.com",
    role: "Admin",
  };

  const handleMenuClick = (item: string) => {
    console.log("clicked: " + item);
  };

  return (
    <Box>
      <Flex>
        <Sidebar user={user} onMenuClick={handleMenuClick} />
        <Flex direction="column" flex={1}>
          <Header title="Dashboard" user={user} />
          <DashBoard />
        </Flex>
      </Flex>
      <VikaoDashboard />
    </Box>
  );
};

export default App;

import { Box, VStack, Text } from "@chakra-ui/react";
import {
  FiHome,
  FiVideo,
  FiList,
  FiCalendar,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/react";

const Sidebar = () => {
  const location = useLocation();
  const bg = useColorModeValue("gray.100", "gray.800");
  const hoverBg = useColorModeValue("gray.200", "gray.700");
  const activeBg = useColorModeValue("blue.100", "blue.900");

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box w="250px" bg={bg} h="100vh" p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={6}>
        e-Vikao
      </Text>

      <VStack spacing={2} align="stretch">
        <Box
          as={NavLink}
          to="/"
          p={3}
          borderRadius="md"
          bg={isActive("/") ? activeBg : "transparent"}
          _hover={{ bg: hoverBg }}
          textDecoration="none"
          color="inherit"
          end
        >
          <FiHome style={{ display: "inline", marginRight: "12px" }} />
          Dashboard
        </Box>

        <Box
          as={NavLink}
          to="/meetings"
          p={3}
          borderRadius="md"
          bg={isActive("/meetings") ? activeBg : "transparent"}
          _hover={{ bg: hoverBg }}
          textDecoration="none"
          color="inherit"
        >
          <FiVideo style={{ display: "inline", marginRight: "12px" }} />
          Meetings
        </Box>

        <Box
          as={NavLink}
          to="/agendas"
          p={3}
          borderRadius="md"
          bg={isActive("/agendas") ? activeBg : "transparent"}
          _hover={{ bg: hoverBg }}
          textDecoration="none"
          color="inherit"
        >
          <FiList style={{ display: "inline", marginRight: "12px" }} />
          Agendas
        </Box>

        <Box
          as={NavLink}
          to="/calendar"
          p={3}
          borderRadius="md"
          bg={isActive("/calendar") ? activeBg : "transparent"}
          _hover={{ bg: hoverBg }}
          textDecoration="none"
          color="inherit"
        >
          <FiCalendar style={{ display: "inline", marginRight: "12px" }} />
          Calendar
        </Box>
        <Box
          as={NavLink}
          to="/reports"
          p={3}
          borderRadius="md"
          bg={isActive("/reports") ? activeBg : "transparent"}
          _hover={{ bg: hoverBg }}
          textDecoration="none"
          color="inherit"
        >
          <FiBarChart2 style={{ display: "inline", marginRight: "12px" }} />
          Reports
        </Box>
        <Box
          as={NavLink}
          to="/settings"
          p={3}
          borderRadius="md"
          bg={isActive("/settings") ? activeBg : "transparent"}
          _hover={{ bg: hoverBg }}
          textDecoration="none"
          color="inherit"
        >
          <FiSettings style={{ display: "inline", marginRight: "12px" }} />
          Settings
        </Box>
      </VStack>
    </Box>
  );
};

export default Sidebar;

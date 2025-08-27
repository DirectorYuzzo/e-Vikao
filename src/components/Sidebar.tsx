// src/components/Sidebar.tsx
import { Box, VStack, Text, Divider, IconButton } from "@chakra-ui/react";
import {
  FiHome,
  FiVideo,
  FiList,
  FiBarChart2,
  FiUsers,
  FiSettings,
} from "react-icons/fi";
import { User } from "../types";

interface SidebarProps {
  user: User;
  isCollapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: FiHome, text: "Dashboard" },
  { icon: FiVideo, text: "Meetings" },
  { icon: FiList, text: "Agendas" },
  { icon: FiBarChart2, text: "Reports" },
  { icon: FiUsers, text: "Users" },
  { icon: FiSettings, text: "Settings" },
];

const Sidebar: React.FC<SidebarProps> = ({ user, isCollapsed, onToggle }) => {
  return (
    <Box
      w={isCollapsed ? "70px" : "250px"}
      bg="white"
      h="100vh"
      p={4}
      boxShadow="md"
      transition="width 0.3s ease"
    >
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={6}
      >
        {!isCollapsed && (
          <Text fontSize="xl" fontWeight="bold" color="blue.600">
            e-Vikao
          </Text>
        )}
        <IconButton
          aria-label="Toggle sidebar"
          icon={isCollapsed ? <FiVideo /> : <FiVideo />}
          size="sm"
          onClick={onToggle}
        />
      </Box>

      {/* Navigation */}
      <VStack spacing={2} align="stretch">
        {menuItems.map((item, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            p={3}
            borderRadius="md"
            _hover={{ bg: "gray.100" }}
            cursor="pointer"
          >
            <Box as={item.icon} mr={isCollapsed ? 0 : 3} />
            {!isCollapsed && <Text>{item.text}</Text>}
          </Box>
        ))}
      </VStack>

      <Divider my={6} />

      {/* User Info */}
      {!isCollapsed && (
        <Box>
          <Text fontSize="sm" color="gray.500" mb={2}>
            Managed by
          </Text>
          <Box display="flex" alignItems="center">
            <Box
              w="8"
              h="8"
              borderRadius="full"
              bg="blue.500"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
              fontWeight="bold"
              mr={2}
            >
              {user.name.charAt(0)}
            </Box>
            <Text fontWeight="medium">{user.name}</Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;

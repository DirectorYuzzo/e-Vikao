import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Avatar,
  Text,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { FiSearch, FiBell, FiChevronDown } from "react-icons/fi";
import { User } from "../types";

interface HeaderProps {
  user: User;
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({
  user,
  onToggleSidebar,
  isSidebarCollapsed,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="white" px={6} py={4} boxShadow="sm" borderBottomWidth="1px">
      <Flex justify="space-between" align="center">
        {/* Left side - Toggle button and Title */}
        <Flex align="center">
          <IconButton
            aria-label="Toggle sidebar"
            icon={isSidebarCollapsed ? <FiChevronDown /> : <FiChevronDown />}
            variant="ghost"
            onClick={onToggleSidebar}
            mr={4}
          />
          <Text fontSize="2xl" fontWeight="bold" color="gray.800">
            Dashboard
          </Text>
        </Flex>

        {/* Right side - Search, Notifications, User */}
        <Flex align="center" gap={4}>
          {/* Search Input */}
          <InputGroup maxW="300px" display={{ base: "none", md: "block" }}>
            <InputLeftElement pointerEvents="none">
              <FiSearch color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search meetings, agendas..."
              borderRadius="full"
            />
          </InputGroup>

          {/* Notifications */}
          <IconButton
            aria-label="Notifications"
            icon={<FiBell />}
            variant="ghost"
            position="relative"
          >
            <Badge
              colorScheme="red"
              borderRadius="full"
              position="absolute"
              top={1}
              right={1}
              w={4}
              h={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="xs"
            >
              3
            </Badge>
          </IconButton>

          {/* User Profile */}
          <Menu isOpen={isOpen} onClose={onClose}>
            <MenuButton
              onMouseEnter={onOpen}
              borderRadius="md"
              p={2}
              _hover={{ bg: "gray.100" }}
            >
              <Flex align="center">
                <Avatar
                  size="sm"
                  name={user.name}
                  src={user.avatar}
                  mr={2}
                  bg="blue.500"
                />
                <Box display={{ base: "none", md: "block" }}>
                  <Text fontWeight="medium">{user.name}</Text>
                  <Text fontSize="sm" color="gray.600">
                    {user.role}
                  </Text>
                </Box>
                <FiChevronDown />
              </Flex>
            </MenuButton>
            <MenuList onMouseLeave={onClose}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;

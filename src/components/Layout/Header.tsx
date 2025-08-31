import {
  Box,
  Flex,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiMenu,
  FiSun,
  FiMoon,
  FiLogOut,
  FiUser,
  FiSettings,
} from "react-icons/fi";
// import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      bg={bg}
      p={4}
      boxShadow="sm"
      borderBottomWidth="1px"
      borderColor={borderColor}
    >
      <Flex justify="space-between" align="center">
        <Flex align="center">
          <IconButton
            aria-label="Menu"
            icon={<FiMenu />}
            variant="ghost"
            display={{ md: "none" }}
            mr={2}
          />
          <Text fontSize="xl" fontWeight="bold">
            Dashboard
          </Text>
        </Flex>

        <Flex align="center" gap={4}>
          <IconButton
            aria-label="Toggle theme"
            icon={isDark ? <FiSun /> : <FiMoon />}
            onClick={toggleTheme}
            variant="ghost"
          />

          <Menu>
            <MenuButton>
              <Flex
                align="center"
                cursor="pointer"
                p={2}
                borderRadius="md"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar size="sm" name={user?.name} bg="blue.500" mr={2} />
                <Text
                  fontWeight="medium"
                  display={{ base: "none", md: "block" }}
                >
                  {user?.name}
                </Text>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FiUser />}>Profile</MenuItem>
              <MenuItem icon={<FiSettings />}>Settings</MenuItem>
              <MenuItem icon={<FiLogOut />} onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;

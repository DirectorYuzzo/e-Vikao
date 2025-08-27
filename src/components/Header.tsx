import {
  Avatar,
  Badge,
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import React from "react";
import {
  FiBell,
  FiChevronDown,
  FiLogOut,
  FiSearch,
  FiSettings,
  FiSliders,
  FiUser,
} from "react-icons/fi";

interface Props {
  title: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const Header = ({ title, user }: Props) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isDark, toggleTheme } = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      bg="white"
      px={{ base: 4, md: 6 }}
      py={4}
      boxShadow="sm"
      borderBottomWidth="1px"
      borderColor={colorMode === "dark" ? "gray.700" : "gray.200"}
    >
      <Flex justify="space-between" align="center">
        <Text
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold"
          color={colorMode === "dark" ? "white" : "gray.800"}
        >
          {title}
        </Text>
        <Flex align="center" gap={{ base: 2, md: 4 }}>
          {!isMobile && (
            <InputGroup maxW="300px">
              <InputLeftElement pointerEvents="none">
                <FiSearch color="gray.300" />
              </InputLeftElement>
              <Input type="text" placeholder="Search..." borderRadius="full" />
            </InputGroup>
          )}

          {isMobile && (
            <IconButton
              aria-label="Search"
              icon={<FiSearch />}
              variant="ghost"
              size="sm"
            />
          )}

          {/* Nofication component */}
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

          {/* Add the User Profire with the Drop down List */}
          <Menu>
            <MenuButton>
              <Flex align="center" cursor="pointer">
                <Avatar
                  size="sm"
                  name={user.name}
                  src={user.avatar}
                  mr={2}
                  bg="blue.500"
                />
                {isMobile && (
                  <>
                    <Text fontWeight="medium">{user.name}</Text>
                    <FiChevronDown style={{ marginLeft: "4px" }} />
                  </>
                )}
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FiUser />}>Profile</MenuItem>
              <MenuItem icon={<FiSettings />}>Settings</MenuItem>
              <MenuItem icon={<FiSliders />}>Preferences</MenuItem>
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;

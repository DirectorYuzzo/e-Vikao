import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import {
  Box,
  VStack,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useColorModeValue,
  Spacer,
} from "@chakra-ui/react";
import {
  FiHome,
  FiVideo,
  FiList,
  FiCalendar,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SidebarContent = ({ onClose }: { onClose?: () => void }) => {
  const location = useLocation();
  const bg = useColorModeValue("gray.100", "gray.800");
  const hoverBg = useColorModeValue("gray.200", "gray.700");
  const activeBg = useColorModeValue("blue.100", "blue.900");
  const textColor = useColorModeValue("gray.600", "gray.400");

  const isActive = (path: string) => location.pathname === path;

  const links = [
    { to: "/", label: "Dashboard", icon: FiHome },
    { to: "/meetings", label: "Meetings", icon: FiVideo },
    { to: "/agendas", label: "Agendas", icon: FiList },
    { to: "/calendar", label: "Calendar", icon: FiCalendar },
    { to: "/reports", label: "Reports", icon: FiBarChart2 },
    { to: "/settings", label: "Settings", icon: FiSettings },
  ];

  return (
    <Flex direction="column" h="100%" w="250px" bg={bg} p={4}>
      <Box mb={6} textAlign="center">
        <Image src="/logo.png" alt="e-Vikao Logo" maxW="160px" mx="auto" />
      </Box>

      <VStack spacing={2} align="stretch" flex="1">
        {links.map(({ to, label, icon: Icon }) => (
          <Box
            as={NavLink}
            key={to}
            to={to}
            p={3}
            borderRadius="md"
            bg={isActive(to) ? activeBg : "transparent"}
            _hover={{ bg: hoverBg }}
            textDecoration="none"
            color="inherit"
            onClick={() => onClose?.()}
          >
            <Icon style={{ display: "inline", marginRight: "12px" }} />
            {label}
          </Box>
        ))}
      </VStack>

      <Box textAlign="center" pt={4} borderTop="1px" borderColor={hoverBg}>
        <Box mt="auto" p={4} textAlign="center" fontSize="sm" color={textColor}>
          &copy; {new Date().getFullYear()} e-Vikao. Managed by Director Yuzzo.
        </Box>
      </Box>
    </Flex>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const bg = useColorModeValue("gray.100", "gray.800");

  return (
    <>
      <Box
        display={{ base: "none", md: "block" }}
        position="fixed"
        left={0}
        top={0}
        h="100vh"
        zIndex={20}
      >
        <SidebarContent onClose={onClose} />
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">e-Vikao</DrawerHeader>
          <DrawerBody p={0} overflowY="auto" bg={bg}>
            <SidebarContent onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;

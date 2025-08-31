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
    <Box w="250px" bg={bg} h="100vh" p={4}>
      <Flex>
        <Box mb={6} textAlign="left">
          <Image
            src="/logo.png"
            color="red"
            alt="e-Vikao Logo"
            maxW="160px"
            mx="auto"
          />
        </Box>
      </Flex>
      <VStack spacing={2} align="stretch">
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
    </Box>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const bg = useColorModeValue("gray.100", "gray.800");

  return (
    <>
      {/* Desktop fixed sidebar */}
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

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">e-Vikao</DrawerHeader>
          <DrawerBody p={0} bg={bg}>
            <SidebarContent onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;

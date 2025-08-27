import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  Divider,
  Avatar,
  Badge,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  ListIcon,
  Heading,
  useBreakpointValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import {
  FiHome,
  FiVideo,
  FiList,
  FiBarChart2,
  FiUsers,
  FiSettings,
  FiBell,
  FiSearch,
  FiMenu,
  FiClock,
  FiCalendar,
  FiCheckCircle,
  FiFileText,
  FiUser,
} from "react-icons/fi";

// Types
interface MenuItem {
  name: string;
  icon: React.ElementType;
}

interface AgendaItem {
  id: number;
  title: string;
  priority: "high" | "medium" | "low";
  dueDate: string;
}

interface ActivityItem {
  id: number;
  title: string;
  time: string;
  icon: React.ElementType;
}

// Mock data
const menuItems: MenuItem[] = [
  { name: "Dashboard", icon: FiHome },
  { name: "Meetings", icon: FiVideo },
  { name: "Agendas", icon: FiList },
  { name: "Reports", icon: FiBarChart2 },
  { name: "User Management", icon: FiUsers },
  { name: "Settings", icon: FiSettings },
];

const prioritizedAgendas: AgendaItem[] = [
  { id: 1, title: "Budget review", priority: "high", dueDate: "Today" },
  { id: 2, title: "Project kickoff", priority: "medium", dueDate: "Tomorrow" },
  { id: 3, title: "Policy update", priority: "low", dueDate: "In 3 days" },
];

const recentActivities: ActivityItem[] = [
  {
    id: 1,
    title: "Meeting minutes uploaded",
    time: "Yesterday at 4:30 PM",
    icon: FiFileText,
  },
  {
    id: 2,
    title: "New attendees added",
    time: "Today at 9:15 AM",
    icon: FiUsers,
  },
  {
    id: 3,
    title: "Action items completed",
    time: "Today at 10:45 AM",
    icon: FiCheckCircle,
  },
];

const VikaoDashboard: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const sidebarBg = useColorModeValue("blue.800", "gray.800");
  const contentBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("gray.800", "white");

  const isMobile = useBreakpointValue({ base: true, lg: false });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    if (isMobile) onClose();
  };

  const getPriorityColor = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "gray";
    }
  };

  // Sidebar content component
  const SidebarContent = () => (
    <Box w="full" h="full" py={4}>
      <VStack align="flex-start" spacing={6} w="full" px={4}>
        <Heading size="md" color="white" display="flex" alignItems="center">
          <Icon as={FiCalendar} mr={2} />
          e-Vikao
        </Heading>

        <VStack spacing={1} w="full">
          {menuItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              w="full"
              justifyContent="flex-start"
              color={activeMenu === item.name ? "white" : "gray.300"}
              bg={activeMenu === item.name ? "blue.700" : "transparent"}
              _hover={{ bg: "blue.700" }}
              leftIcon={<Icon as={item.icon} />}
              onClick={() => handleMenuClick(item.name)}
            >
              {item.name}
            </Button>
          ))}
        </VStack>

        <Box
          mt="auto"
          pt={4}
          borderTopWidth={1}
          borderTopColor="blue.700"
          w="full"
          px={4}
        >
          <Text fontSize="sm" color="gray.400">
            Managed by
          </Text>
          <Flex align="center" mt={2}>
            <Avatar size="sm" name="Philip" bg="blue.500" color="white" />
            <Text ml={2} color="white">
              Philip
            </Text>
          </Flex>
        </Box>
      </VStack>
    </Box>
  );

  return (
    <Flex h="100vh" overflow="hidden">
      {/* Sidebar for desktop */}
      {!isMobile && (
        <Box
          w="64"
          bg={sidebarBg}
          color="white"
          display={{ base: "none", lg: "block" }}
        >
          <SidebarContent />
        </Box>
      )}

      {/* Mobile drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={sidebarBg} color="white">
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading size="md" color="white" display="flex" alignItems="center">
              <Icon as={FiCalendar} mr={2} />
              e-Vikao
            </Heading>
          </DrawerHeader>
          <DrawerBody p={0}>
            <SidebarContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Main content */}
      <Box flex="1" bg={contentBg} overflowY="auto">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          p={4}
          bg={cardBg}
          boxShadow="sm"
        >
          {isMobile && (
            <IconButton
              aria-label="Open menu"
              icon={<Icon as={FiMenu} />}
              onClick={onOpen}
              variant="outline"
            />
          )}

          <Heading size="lg" ml={isMobile ? 4 : 8} color={headingColor}>
            Dashboard
          </Heading>

          <HStack spacing={4}>
            <InputGroup maxW="xs" display={{ base: "none", md: "flex" }}>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} color="gray.400" />
              </InputLeftElement>
              <Input placeholder="Search..." />
            </InputGroup>

            <IconButton
              aria-label="Notifications"
              icon={<Icon as={FiBell} />}
              variant="ghost"
            />

            <Avatar size="sm" name="Philip" bg="blue.500" color="white" />
          </HStack>
        </Flex>

        <Box p={6}>
          {/* Next Meeting Card */}
          <Box bg={cardBg} borderRadius="lg" boxShadow="base" p={6} mb={6}>
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="md" color={headingColor}>
                Next Meeting
              </Heading>
              <Badge colorScheme="blue" px={3} py={1} borderRadius="full">
                <HStack spacing={1}>
                  <Icon as={FiClock} />
                  <Text>11:00 AM</Text>
                </HStack>
              </Badge>
            </Flex>

            <VStack align="start" spacing={4}>
              <Heading size="lg" color={headingColor}>
                Quarterly Review Meeting
              </Heading>
              <Text color={textColor}>
                Review of Q2 performance metrics, budget allocation for Q3, and
                strategic planning for upcoming projects.
              </Text>

              <Flex align="center">
                <Avatar
                  size="sm"
                  name="Philip"
                  bg="blue.500"
                  color="white"
                  mr={2}
                />
                <Text color={textColor}>
                  Hosted by{" "}
                  <Text as="span" fontWeight="medium">
                    Philip
                  </Text>
                </Text>
              </Flex>

              <HStack spacing={3}>
                <Button colorScheme="blue" leftIcon={<Icon as={FiVideo} />}>
                  Join Meeting
                </Button>
                <Button variant="outline" leftIcon={<Icon as={FiFileText} />}>
                  View Agenda
                </Button>
              </HStack>
            </VStack>
          </Box>

          <Flex direction={{ base: "column", lg: "row" }} gap={6}>
            {/* Prioritized Agendas */}
            <Box bg={cardBg} borderRadius="lg" boxShadow="base" p={6} flex="1">
              <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md" color={headingColor}>
                  Prioritized Agendas
                </Heading>
                <Button variant="link" colorScheme="blue">
                  View All
                </Button>
              </Flex>

              <List spacing={4}>
                {prioritizedAgendas.map((agenda) => (
                  <ListItem key={agenda.id}>
                    <Flex align="center">
                      <Box
                        w="3"
                        h="3"
                        borderRadius="full"
                        bg={`${getPriorityColor(agenda.priority)}.500`}
                        mr={3}
                      />
                      <Box flex="1">
                        <Text fontWeight="medium" color={headingColor}>
                          {agenda.title}
                        </Text>
                        <Text fontSize="sm" color={textColor}>
                          Due: {agenda.dueDate} •{" "}
                          <Text as="span" textTransform="capitalize">
                            {agenda.priority} Priority
                          </Text>
                        </Text>
                      </Box>
                      <IconButton
                        aria-label="More options"
                        icon={<Icon as={FiSettings} />}
                        variant="ghost"
                        size="sm"
                      />
                    </Flex>
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Recent Activity */}
            <Box bg={cardBg} borderRadius="lg" boxShadow="base" p={6} flex="1">
              <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md" color={headingColor}>
                  Recent Activity
                </Heading>
                <Button variant="link" colorScheme="blue">
                  View All
                </Button>
              </Flex>

              <List spacing={4}>
                {recentActivities.map((activity) => (
                  <ListItem key={activity.id}>
                    <Flex>
                      <Flex
                        align="center"
                        justify="center"
                        w="8"
                        h="8"
                        borderRadius="full"
                        bg="blue.100"
                        color="blue.600"
                        mr={3}
                      >
                        <Icon as={activity.icon} />
                      </Flex>
                      <Box>
                        <Text fontWeight="medium" color={headingColor}>
                          {activity.title}
                        </Text>
                        <Text fontSize="sm" color={textColor}>
                          {activity.time}
                        </Text>
                      </Box>
                    </Flex>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default VikaoDashboard;

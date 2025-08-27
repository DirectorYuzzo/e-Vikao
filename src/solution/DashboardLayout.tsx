// import {
//   Box,
//   Flex,
//   useBreakpointValue,
//   IconButton,
//   Drawer,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerCloseButton,
//   DrawerHeader,
//   DrawerBody,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { FiMenu } from "react-icons/fi";
// import { useState } from "react";
// import Sidebar from "./Sidebar";
// import Header from "./Header";

// interface DashboardLayoutProps {
//   children: React.ReactNode;
// }

// const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const isMobile = useBreakpointValue({ base: true, lg: false });
//   const sidebarWidth = sidebarCollapsed ? 20 : 60;

//   return (
//     <Box minH="100vh" bg="gray.50">
//       {/* Sidebar for desktop */}
//       {!isMobile && (
//         <Box
//           position="fixed"
//           left={0}
//           top={0}
//           h="full"
//           w={sidebarWidth}
//           bg="white"
//           boxShadow="md"
//           transition="width 0.2s"
//           zIndex={10}
//         >
//           <Sidebar
//             isCollapsed={sidebarCollapsed}
//             onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
//           />
//         </Box>
//       )}

//       {/* Mobile drawer */}
//       <Drawer isOpen={isOpen} onClose={onClose} placement="left">
//         <DrawerOverlay />
//         <DrawerContent>
//           <DrawerCloseButton />
//           <DrawerHeader>e-Vikao</DrawerHeader>
//           <DrawerBody p={0}>
//             <Sidebar isCollapsed={false} onToggle={onClose} />
//           </DrawerBody>
//         </DrawerContent>
//       </Drawer>

//       {/* Main content */}
//       <Box ml={!isMobile ? sidebarWidth : 0} transition="margin-left 0.2s">
//         <Header
//           onMenuClick={
//             isMobile ? onOpen : () => setSidebarCollapsed(!sidebarCollapsed)
//           }
//           isSidebarCollapsed={sidebarCollapsed}
//         />

//         <Box as="main" p={{ base: 4, md: 6 }}>
//           {children}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default DashboardLayout;

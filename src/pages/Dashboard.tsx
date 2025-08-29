import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import MeetingModal from "../components/dashboard/MeetingModal";
import { StatsData, Meeting } from "../types";
import { useMeetings } from "../hooks/useMeetings";
import { useAgendaItems } from "../hooks/useAgendaItems";
import StatsGrid from "../components/dashboard/StatsGrid";

const mockMeeting = {
  id: "1",
  title: "Quartely Review Meeting",
  data: "2025-08-15",
  time: "11:00",
  participants: ["morgan@me.com", "yuzzo@dev.com"],
  description:
    "Review of Q2 performance metrics, budget allocation for Q3, and strategic planing for upcoming Projet ",
};

const mockStats: StatsData = {
  totalMeetings: 24,
  completedAgendas: 18,
  pendingActions: 7,
  upcomingMeetings: 3,
  participantEngagement: 85,
  averageMeetingDuration: "45m",
};

const emptyMeeting: Omit<Meeting, "id"> = {
  title: "",
  description: "",
  date: "",
  time: "09:00",
  participants: [],
};

const DashBoard = () => {
  const [showHighPriorityOnly, setShowHighPriorityOnly] = useState(false);
  // const [agendas, setAgendas] = useState<AgendaItem[]>(mockAgendas);
  // const [meetings, setMeetings] = useState<Meeting[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Use our custom hooks
  const {
    meetings,
    upcomingMeetings,
    loading: meetingsLoading,
    createMeeting,
    error: meetingsError,
  } = useMeetings();

  const {
    items: agendas,
    prioritizedItems,
    loading: agendasLoading,
    toggleStatus,
    error: agendasError,
  } = useAgendaItems();

  const nextMeeting = upcomingMeetings.length > 0 ? upcomingMeetings[0] : null;

  // Show errors if any occur
  useEffect(() => {
    if (meetingsError) {
      toast({
        title: "Meetings Error",
        description: meetingsError,
        status: "error",
        duration: 3000,
      });
    }

    if (agendasError) {
      toast({
        title: "Agendas Error",
        description: agendasError,
        status: "error",
        duration: 3000,
      });
    }
  }, [meetingsError, agendasError, toast]);

  const handleJoinMeeting = () => {
    alert("Joining meetin...");
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleStatus(id);
    } catch (error) {
      // Error is already handled by the hook and shown via toast
    }
  };

  const handleCreateMeeting = async (meetingData: typeof emptyMeeting) => {
    try {
      await createMeeting(meetingData);
      toast({
        title: "Meeting created successfully",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      // Error is already handled by the hook
    }
  };

  return (
    <Box p={6}>
      {/* Header with Stats Title */}
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h2" size="lg" color="gray.700">
          Dashboard Overview
        </Heading>
        <Button leftIcon={<FiPlus />} colorScheme="blue" onClick={onOpen}>
          New Meeting
        </Button>
      </Flex>

      {/* Stats Grid Section */}
      <Box mb={8}>
        <StatsGrid data={mockStats} />
      </Box>

      {/* Main Content Grid */}
      <Grid
        templateColumns={{ base: "1fr", lg: "2fr 1fr" }}
        gap={6}
        alignItems="start"
      ></Grid>
      {/* Meeting Creation Modal */}
      <MeetingModal
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleCreateMeeting}
        initialData={emptyMeeting}
      />
    </Box>
  );
};

export default DashBoard;

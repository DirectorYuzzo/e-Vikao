import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Button,
  useToast,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useAgendaItems } from "../../hooks/useAgendaItems";
import { useMeetings } from "../../hooks/useMeetings";
import { StatsData, AgendaItem, CreateMeetingDTO } from "../../types";
import MeetingCard from "../dashboard/MeetingCard";
import StatsGrid from "../dashboard/StatsGrid";
import MeetingModal from "../modals/MeetingModal";
import AgendaList from "../agendas/AgendaList";
import { useState } from "react";

const mockStats: StatsData = {
  totalMeetings: 24,
  completedAgendas: 18,
  pendingActions: 7,
  upcomingMeetings: 3,
  participantEngagement: 85,
  averageMeetingDuration: "45m",
};

const Dashboard = () => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const headingColor = useColorModeValue("gray.700", "gray.200");

  const {
    isOpen: isMeetingModalOpen,
    onOpen: onMeetingModalOpen,
    onClose: onMeetingModalClose,
  } = useDisclosure();
  const toast = useToast();

  const {
    upcomingMeetings,
    loading: meetingsLoading,
    createMeeting,
    error: meetingsError,
  } = useMeetings();

  const {
    prioritizedItems,
    loading: agendasLoading,
    createItem,
    deleteItem,
    toggleStatus,
    error: agendasError,
  } = useAgendaItems();

  const [editingAgenda, setEditingAgenda] = useState<AgendaItem | null>(null);

  const nextMeeting = upcomingMeetings.length > 0 ? upcomingMeetings[0] : null;

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

  const handleCreateMeeting = async (meetingData: CreateMeetingDTO) => {
    try {
      await createMeeting(meetingData);
      toast({
        title: "Meeting created successfully",
        status: "success",
        duration: 3000,
      });
      onMeetingModalClose();
    } catch (error) {
      toast({
        title: "Error creating meeting",
        description: error instanceof Error ? error.message : "Unknown error",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleDeleteAgendaItem = async (id: string) => {
    try {
      await deleteItem(id);
      toast({
        title: "Agenda item deleted successfully",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error deleting agenda item",
        description: error instanceof Error ? error.message : "Unknown error",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleToggleAgendaStatus = async (id: string) => {
    try {
      await toggleStatus(id);
      toast({ title: "Status updated", status: "success", duration: 2000 });
    } catch (error) {
      toast({
        title: "Error updating status",
        description: error instanceof Error ? error.message : "Unknown error",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Box p={6} bg={bg} minH="100vh">
      <Flex justify="space-between" align="center" mb={6}>
        <Heading color={headingColor}>Dashboard Overview</Heading>
        <Button
          leftIcon={<FiPlus />}
          colorScheme="blue"
          onClick={onMeetingModalOpen}
          isLoading={meetingsLoading}
        >
          New Meeting
        </Button>
      </Flex>

      <Box mb={8}>
        <StatsGrid data={mockStats} />
      </Box>

      <Grid
        templateColumns={{ base: "1fr", lg: "2fr 1fr" }}
        gap={6}
        alignItems="start"
      >
        <GridItem>
          <MeetingCard
            meeting={nextMeeting}
            isLoading={meetingsLoading}
            onJoinMeeting={() =>
              toast({
                title: "Joining meeting...",
                status: "info",
                duration: 2000,
              })
            }
          />
        </GridItem>

        <GridItem>
          <AgendaList
            title="Prioritized Agendas"
            agendas={prioritizedItems}
            loading={agendasLoading}
            onDelete={handleDeleteAgendaItem}
            onToggleStatus={handleToggleAgendaStatus}
            onEdit={(agenda) => setEditingAgenda(agenda)} // ✅ FIX added missing prop
          />
        </GridItem>
      </Grid>

      <MeetingModal
        isOpen={isMeetingModalOpen}
        onClose={onMeetingModalClose}
        onSave={handleCreateMeeting}
      />
    </Box>
  );
};

export default Dashboard;

import {
  Box,
  Heading,
  Grid,
  GridItem,
  useToast,
  useDisclosure,
  Button,
  Flex,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useAgendaItems } from "../../hooks/useAgendaItems";
import { useMeetings } from "../../hooks/useMeetings";
import { StatsData, AgendaItem, CreateMeetingDTO } from "../../types";
// import AgendaList from "../dashboard/AgendaList";
import MeetingCard from "../dashboard/MeetingCard";
import StatsGrid from "../dashboard/StatsGrid";
import MeetingModal from "../modals/MeetingModal";
import AgendaList from "../agendas/AgendaList";

// Mock data for demonstration
const mockStats: StatsData = {
  totalMeetings: 24,
  completedAgendas: 18,
  pendingActions: 7,
  upcomingMeetings: 3,
  participantEngagement: 85,
  averageMeetingDuration: "45m",
};

const mockAgendas: AgendaItem[] = [
  {
    id: "1",
    title: "Budget review",
    description: "Review of departmental budgets",
    status: "pending",
    priority: "high",
    dueDate: "Today",
  },
  {
    id: "2",
    title: "Project kickoff",
    description: "Kickoff meeting for new client project",
    status: "in-progress",
    priority: "medium",
    dueDate: "Tomorrow",
  },
  {
    id: "3",
    title: "Policy update",
    description: "Update company remote work policies",
    status: "pending",
    priority: "low",
    dueDate: "Next week",
  },
];

const Dashboard = () => {
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
  const handleJoinMeeting = () => {
    toast({
      title: "Joining meeting...",
      status: "info",
      duration: 2000,
    });
  };

  const handleAddAgendaItem = async (itemData: any) => {
    try {
      await createItem(itemData);
      toast({
        title: "Agenda item created successfully",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error creating agenda item",
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
      toast({
        title: "Status updated",
        status: "success",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Error updating status",
        description: error instanceof Error ? error.message : "Unknown error",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleToggleStatus = (id: string) => {
    toast({
      title: "Status updated",
      status: "success",
      duration: 2000,
    });
  };

  return (
    <Box>
      {/* Header with Create Button */}
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1" size="xl" color="gray.700">
          Dashboard Overview
        </Heading>
        <Button
          leftIcon={<FiPlus />}
          colorScheme="blue"
          onClick={onMeetingModalOpen}
          isLoading={meetingsLoading}
        >
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
      >
        <GridItem>
          <MeetingCard
            meeting={nextMeeting}
            isLoading={meetingsLoading}
            onJoinMeeting={handleJoinMeeting}
          />
        </GridItem>

        <GridItem>
          <AgendaList
            title="Prioritized Agendas"
            agendas={prioritizedItems}
            loading={agendasLoading}
            onEdit={() => {
              /* Will implement later */
            }}
            onDelete={handleDeleteAgendaItem}
            onToggleStatus={handleToggleAgendaStatus}
          />

          {/* <AgendaList
            title="Prioritized Agendas"
            items={prioritizedItems}
            isLoading={agendasLoading}
            onAddItem={handleAddAgendaItem}
            onDeleteItem={handleDeleteAgendaItem}
            onToggleStatus={handleToggleAgendaStatus}
          /> */}
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

import {
  Box,
  Heading,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useToast,
  useDisclosure,
  Alert,
  AlertIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiPlus, FiSearch, FiFilter } from "react-icons/fi";
import { useState } from "react";
import { useMeetings } from "../../hooks/useMeetings";
import { Meeting, CreateMeetingDTO } from "../../types";
import MeetingList from "../meetings/MeetingList";
import MeetingModal from "../modals/MeetingModal";

const Meetings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "upcoming" | "past">(
    "all"
  );
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const bg = useColorModeValue("gray.50", "gray.900");
  const headingColor = useColorModeValue("gray.700", "gray.200");

  const {
    meetings,
    loading,
    createMeeting,
    updateMeeting,
    deleteMeeting,
    error,
  } = useMeetings();

  if (error) {
    toast({
      title: "Error loading meetings",
      description: error,
      status: "error",
      duration: 3000,
    });
  }

  const filteredMeetings = meetings.filter((meeting) => {
    const matchesSearch =
      meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.description.toLowerCase().includes(searchTerm.toLowerCase());
    const now = new Date();
    const meetingDate = new Date(`${meeting.date}T${meeting.time}`);
    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "upcoming"
        ? meetingDate > now
        : meetingDate <= now;
    return matchesSearch && matchesStatus;
  });

  const handleEditMeeting = async (meetingData: CreateMeetingDTO) => {
    if (!editingMeeting) return;
    try {
      await updateMeeting(editingMeeting.id, meetingData);
      toast({
        title: "Meeting updated successfully",
        status: "success",
        duration: 3000,
      });
      setEditingMeeting(null);
      onClose();
    } catch (err) {
      toast({
        title: "Error updating meeting",
        description: err instanceof Error ? err.message : "Failed",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleDeleteMeeting = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this meeting?")) {
      try {
        await deleteMeeting(id);
        toast({
          title: "Meeting deleted successfully",
          status: "success",
          duration: 3000,
        });
      } catch (err) {
        toast({
          title: "Error deleting meeting",
          description: err instanceof Error ? err.message : "Failed",
          status: "error",
          duration: 3000,
        });
      }
    }
  };

  return (
    <Box p={6} bg={bg} minH="100vh">
      <Flex justify="space-between" align="center" mb={6}>
        <Heading color={headingColor}>Meetings</Heading>
        <Button
          leftIcon={<FiPlus />}
          colorScheme="blue"
          onClick={onOpen}
          isLoading={loading}
        >
          New Meeting
        </Button>
      </Flex>

      <Flex gap={4} mb={6} direction={{ base: "column", md: "row" }}>
        <InputGroup maxW={{ md: "300px" }}>
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search meetings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        <Select
          width={{ base: "100%", md: "200px" }}
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "all" | "upcoming" | "past")
          }
          icon={<FiFilter />}
        >
          <option value="all">All Meetings</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </Select>
      </Flex>

      {filteredMeetings.length === 0 && !loading ? (
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          {searchTerm || statusFilter !== "all"
            ? "No meetings match your search criteria"
            : "No meetings found. Create your first meeting to get started!"}
        </Alert>
      ) : (
        <MeetingList
          meetings={filteredMeetings}
          loading={loading}
          onEdit={setEditingMeeting}
          onDelete={handleDeleteMeeting}
        />
      )}

      <MeetingModal
        isOpen={isOpen}
        onClose={() => {
          setEditingMeeting(null);
          onClose();
        }}
        onSave={editingMeeting ? handleEditMeeting : createMeeting}
        isEditing={!!editingMeeting}
      />
    </Box>
  );
};

export default Meetings;

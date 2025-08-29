import { Box } from "@chakra-ui/react";
import React from "react";
import MeetingCard from "../components/layout/MeetingCard";
import { useMeetings } from "../hooks/useMeetings";
import { Meeting } from "../types";

const mockMeeting = {
  id: "1",
  title: "Quartely Review Meeting",
  data: "2025-08-15",
  time: "11:00",
  participants: ["morgan@me.com", "yuzzo@dev.com"],
  description:
    "Review of Q2 performance metrics, budget allocation for Q3, and strategic planing for upcoming Projet ",
};

const emptyMeeting: Omit<Meeting, "id"> = {
  title: "",
  description: "",
  date: "",
  time: "09:00",
  participants: [],
};

const Meetings = () => {
  const {
    meetings,
    upcomingMeetings,
    loading: meetingsLoading,
    createMeeting,
    error: meetingsError,
  } = useMeetings();

  const handleJoinMeeting = () => {
    alert("Joining meetin...");
  };

  const handleViewAgenda = () => {
    alert("show agenda...");
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
    <Box>
      <MeetingCard
        meeting={mockMeeting}
        onJoinMeeting={handleJoinMeeting}
        onViewAgenda={handleViewAgenda}
        isLoading={meetingsLoading}
      />
    </Box>
  );
};

export default Meetings;
function toast(arg0: { title: string; status: string; duration: number }) {
  throw new Error("Function not implemented.");
}

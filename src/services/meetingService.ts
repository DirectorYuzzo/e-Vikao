import api from "./api";
import { Meeting, CreateMeetingDTO } from "../types";

export const meetingService = {
  // Get all meetings
  getMeetings: async (): Promise<Meeting[]> => {
    const response = await api.get("/meetings");
    return response.data;
  },

  // Get single meeting
  getMeeting: async (id: string): Promise<Meeting> => {
    const response = await api.get(`/meetings/${id}`);
    return response.data;
  },

  // Create meeting
  createMeeting: async (meetingData: CreateMeetingDTO): Promise<Meeting> => {
    const response = await api.post("/meetings", meetingData);
    return response.data;
  },

  // Update meeting
  updateMeeting: async (
    id: string,
    updates: Partial<Meeting>
  ): Promise<Meeting> => {
    const response = await api.put(`/meetings/${id}`, updates);
    return response.data;
  },

  // Delete meeting
  deleteMeeting: async (id: string): Promise<void> => {
    await api.delete(`/meetings/${id}`);
  },
};

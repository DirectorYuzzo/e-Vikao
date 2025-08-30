import { useState, useEffect } from "react";
import { Meeting, CreateMeetingDTO } from "../types";
import { useLocalStorage } from "./useLocalStorage";
import { useAuth } from "../contexts/AuthContext";

export const useMeetings = () => {
  const [meetings, setMeetings] = useLocalStorage<Meeting[]>("meetings", []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [allMeetings, setAllMeetings] = useLocalStorage<
    Record<string, Meeting[]>
  >("meetings", {});

  // Get meetings for current user
  const userMeetings = user ? allMeetings[user.id] || [] : [];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const createMeeting = async (meetingData: CreateMeetingDTO) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newMeeting: Meeting = {
        ...meetingData,
        id: Date.now().toString(),
      };

      setMeetings((prev) => [newMeeting, ...prev]);
      setError(null);
      return newMeeting;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create meeting";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  //   if (!user) throw new Error("User not authenticated");

  //   try {
  //     setLoading(true);
  //     await new Promise((resolve) => setTimeout(resolve, 500));

  //     const newMeeting: Meeting = {
  //       ...meetingData,
  //       id: Date.now().toString(),
  //     };

  //     setAllMeetings((prev) => ({
  //       ...prev,
  //       [user.id]: [newMeeting, ...(prev[user.id] || [])],
  //     }));

  //     setError(null);
  //     return newMeeting;
  //   } catch (err) {
  //     const errorMessage =
  //       err instanceof Error ? err.message : "Failed to create meeting";
  //     setError(errorMessage);
  //     throw new Error(errorMessage);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const deleteMeeting = async (id: string) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      setMeetings((prev) => prev.filter((meeting) => meeting.id !== id));
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete meeting";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateMeeting = async (id: string, updates: Partial<Meeting>) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedMeeting = { ...updates, id } as Meeting;
      setMeetings((prev) =>
        prev.map((meeting) => (meeting.id === id ? updatedMeeting : meeting))
      );

      setError(null);
      return updatedMeeting;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update meeting";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getUpcomingMeetings = () => {
    const now = new Date();
    return userMeetings
      .filter((meeting) => {
        const meetingDate = new Date(`${meeting.date}T${meeting.time}`);
        return meetingDate > now;
      })
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA.getTime() - dateB.getTime();
      });
  };

  return {
    meetings: userMeetings,
    upcomingMeetings: getUpcomingMeetings(),
    loading,
    error,
    createMeeting,
    // updateMeeting,
    // deleteMeeting,
  };
};

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "user";
}

export interface AgendaItem {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "high" | "medium" | "low";
  dueDate: string;
}

export interface StatsData {
  totalMeetings: number;
  completedAgendas: number;
  pendingActions: number;
  upcomingMeetings: number;
  participantEngagement: number;
  averageMeetingDuration: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  participants: string[];
  description: string;
}

export interface CreateMeetingDTO {
  title: string;
  description: string;
  date: string;
  time: string;
  participants: string[];
}

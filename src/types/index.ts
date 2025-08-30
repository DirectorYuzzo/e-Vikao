export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  participants: string[];
  description: string;
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

export interface CreateMeetingDTO {
  title: string;
  description: string;
  date: string;
  time: string;
  participants: string[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: any;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  avatar?: string;
}

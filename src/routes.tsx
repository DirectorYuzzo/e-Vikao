import { createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/layout/DashBoardLayout";
import Dashboard from "./pages/Dashboard";
import Meetings from "./pages/Meetings";
import Agendas from "./pages/Agendas";
import { AgendaItem } from "./types";

const mockAgendas: AgendaItem[] = [
  {
    id: "1",
    title: "Budget Review",
    description: "kickoff meeting for new client Project",
    status: "pending" as const,
    priority: "high" as const,
    dueDate: "Today",
  },
  {
    id: "2",
    title: "Project kickoff",
    description: "kickoff meeting for new client Project",
    status: "in-progress" as const,
    priority: "medium" as const,
    dueDate: "Tomorrow",
  },
  {
    id: "3",
    title: "Policy update",
    description: "Update company remote work policies",
    status: "pending" as const,
    priority: "low" as const,
    dueDate: "Next week",
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "meetings",
        element: <Meetings />,
      },
      {
        path: "agendas",
        element: <Agendas />,
      },
    ],
  },
]);

import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import DashboardLayout from "./components/Layout/DashboardLayout";
import Agendas from "./components/pages/Agenda";
import Calendar from "./components/pages/Calendar";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import Meetings from "./components/pages/Meeting";
import NotFound from "./components/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
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
      {
        path: "calendar",
        element: <Calendar />,
      },
    ],
  },
]);

import DashBoard from "./DashBoard";
import { createBrowserRouter } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const router = createBrowserRouter([
  { path: "/", element: <DashBoard /> },
  {
    path: "/sidebar",
    element: (
      <Header
        title={""}
        user={{
          name: "",
          email: "",
          avatar: undefined,
        }}
      />
    ),
  },
]);

export default router;

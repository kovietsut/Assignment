import MainLayout from "@/components/templates/main_layout/MainLayout";
import { PATH } from "@/routes/path";
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";

function Routes() {
  return useRoutes([
    { element: <Navigate to={PATH.tickets.list} replace />, index: true },
    {
      path: "app",
      element: (
          <MainLayout />
      ),
      children: [
        { element: <Navigate to={PATH.tickets.list} replace />, index: true },
        { path: "tickets", element: <div>Ticket List (To be implemented)</div> },
        { path: "tickets/:id", element: <div>Ticket Detail - ID: :id (To be implemented)</div> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

// ----------------------------------------------------------------------------------
const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default Router;

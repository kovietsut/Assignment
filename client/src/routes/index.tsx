import MainLayout from "@/components/templates/main_layout/MainLayout";
import TicketListPageWithQuery from "@/pages/tickets/TicketListPageWithQuery";
import TicketDetailPage from "@/pages/ticket-detail/TicketDetailPage";
import { PATH } from "@/routes/path";
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";

function Routes() {
  return useRoutes([
    { element: <Navigate to={PATH.tickets.list} replace />, index: true },
    {
      path: "app",
      element: <MainLayout />,
      children: [
        { element: <Navigate to={PATH.tickets.list} replace />, index: true },
        { path: "tickets", element: <TicketListPageWithQuery /> },
        {
          path: "tickets/:id",
          element: <TicketDetailPage />,
        },
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

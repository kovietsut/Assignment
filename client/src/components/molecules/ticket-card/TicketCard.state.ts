import { useNavigate } from "react-router-dom";
import { PATH } from "@/routes/path";
import type { TicketWithStatus } from "@acme/shared-models";

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Open":
      return "error";
    case "In Progress":
      return "warning";
    case "Completed":
      return "success";
    default:
      return "default";
  }
};

interface TicketCardStateProps {
  ticket: TicketWithStatus;
  onToggleComplete?: (ticketId: number, completed: boolean) => void;
}

export const useTicketCardState = ({
  ticket,
  onToggleComplete,
}: TicketCardStateProps) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(PATH.tickets.detail(ticket.id.toString()));
  };

  const handleToggleComplete = () => {
    if (onToggleComplete) {
      onToggleComplete(ticket.id, !ticket.completed);
    }
  };

  return {
    handleViewDetails,
    handleToggleComplete,
  };
};

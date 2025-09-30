import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PATH } from "@/routes/path";
import {
  useFetchTicketById,
  useFetchUsers,
  useTicketAssign,
  useTicketUnassign,
  useTicketComplete,
} from "@/services/tickets";
import type { User } from "@acme/shared-models";

export const getStatusColor = (
  completed: boolean,
  assigneeId: number | null
) => {
  if (completed) return "success";
  if (assigneeId) return "warning";
  return "error";
};

export const getStatusLabel = (
  completed: boolean,
  assigneeId: number | null
) => {
  if (completed) return "Completed";
  if (assigneeId) return "In Progress";
  return "Open";
};

export const useTicketDetailPageState = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedAssignee, setSelectedAssignee] = useState<number | "">("");

  // React Query hooks
  const { data: ticketResponse, isLoading, error } = useFetchTicketById(id!);
  const { data: usersResponse } = useFetchUsers();
  const assignTicketMutation = useTicketAssign();
  const unassignTicketMutation = useTicketUnassign();
  const completeTicketMutation = useTicketComplete();

  // useFetch already unwraps the DataResponse, so we get the data directly
  const ticket = ticketResponse;
  const users = usersResponse || [];

  // Find current assignee
  const currentAssignee = ticket?.assigneeId
    ? users.find((user: User) => user.id === ticket.assigneeId)
    : null;

  const handleAssignUser = async () => {
    if (!ticket || !selectedAssignee) return;

    try {
      await assignTicketMutation.mutateAsync({
        ticketId: ticket.id,
        userId: selectedAssignee as number,
      });
      setSelectedAssignee("");
    } catch (error) {
      console.error("Failed to assign ticket:", error);
    }
  };

  const handleUnassignUser = async () => {
    if (!ticket) return;

    try {
      await unassignTicketMutation.mutateAsync({
        ticketId: ticket.id,
      });
    } catch (error) {
      console.error("Failed to unassign ticket:", error);
    }
  };

  const handleToggleComplete = async () => {
    if (!ticket) return;

    try {
      await completeTicketMutation.mutateAsync({
        ticketId: ticket.id,
        completed: !ticket.completed,
      });
    } catch (error) {
      console.error("Failed to update ticket:", error);
    }
  };

  const handleBackToList = () => {
    navigate(PATH.tickets.list);
  };

  return {
    // Data
    id,
    ticket,
    users,
    currentAssignee,
    selectedAssignee,

    // Query states
    isLoading,
    error,

    // Mutations
    assignTicketMutation,
    unassignTicketMutation,
    completeTicketMutation,

    // Handlers
    setSelectedAssignee,
    handleAssignUser,
    handleUnassignUser,
    handleToggleComplete,
    handleBackToList,
  };
};

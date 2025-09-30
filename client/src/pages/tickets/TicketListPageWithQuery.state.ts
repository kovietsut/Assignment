import {
  useFetchTickets,
  useFetchUsers,
  useTicketAssign,
  useTicketComplete,
  useTicketCreate,
} from "@/services/tickets";
import type {
  Ticket,
  TicketFilter,
  TicketStatus,
  TicketWithStatus,
  User,
} from "@acme/shared-models";
import { useMemo, useState } from "react";

// Helper function to map backend ticket to frontend display ticket
const mapTicketToDisplay = (
  ticket: Ticket,
  users: User[]
): TicketWithStatus => {
  // Determine status based on completed flag and assignee
  let status: TicketStatus;
  if (ticket.completed) {
    status = "Completed";
  } else if (ticket.assigneeId) {
    status = "In Progress";
  } else {
    status = "Open";
  }

  // Create title from description (first 50 chars)
  const title =
    ticket.description.length > 50
      ? ticket.description.substring(0, 50) + "..."
      : ticket.description;

  // Find assignee user
  const assignee = ticket.assigneeId
    ? users.find((user: User) => user.id === ticket.assigneeId)
    : undefined;

  return {
    ...ticket,
    status,
    title,
    assignee,
  };
};

export const useTicketListPageState = () => {
  const [filter, setFilter] = useState<TicketFilter>("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // React Query hooks
  const { data: ticketsResponse, isLoading, error } = useFetchTickets();
  const { data: usersResponse } = useFetchUsers();
  const createTicketMutation = useTicketCreate();
  const assignTicketMutation = useTicketAssign();
  const completeTicketMutation = useTicketComplete();

  // useFetch already unwraps the DataResponse, so we get the data directly
  const users = useMemo(() => usersResponse || [], [usersResponse]);

  // Map tickets with status
  const tickets = useMemo(
    () =>
      Array.isArray(ticketsResponse)
        ? ticketsResponse.map((ticket: Ticket) =>
            mapTicketToDisplay(ticket, users)
          )
        : [],
    [ticketsResponse, users]
  );

  // Filter tickets based on selected filter
  const filteredTickets = useMemo(() => {
    if (filter === "All") return tickets;
    return tickets?.filter(
      (ticket: TicketWithStatus) => ticket.status === filter
    );
  }, [tickets, filter]);

  const handleAddTicket = async (description: string) => {
    try {
      // Create the ticket
      await createTicketMutation.mutateAsync({ description });
    } catch (error) {
      console.error("Failed to create ticket:", error);
    }
  };

  const handleToggleComplete = async (ticketId: number, completed: boolean) => {
    try {
      await completeTicketMutation.mutateAsync({
        ticketId,
        completed,
      });
    } catch (error) {
      console.error("Failed to update ticket:", error);
    }
  };

  const handleAddTicketModalOpen = () => setIsAddModalOpen(true);
  const handleAddTicketModalClose = () => setIsAddModalOpen(false);

  return {
    // State
    filter,
    isAddModalOpen,
    tickets,
    filteredTickets,
    users,

    // Query states
    isLoading,
    error,

    // Mutations
    createTicketMutation,
    assignTicketMutation,
    completeTicketMutation,

    // Handlers
    setFilter,
    handleAddTicket,
    handleToggleComplete,
    handleAddTicketModalOpen,
    handleAddTicketModalClose,
  };
};

import AddTicketModal from "@/components/molecules/add-ticket-modal/AddTicketModal";
import TicketCard from "@/components/molecules/ticket-card/TicketCard";
import TicketHeader from "@/components/molecules/ticket-header/TicketHeader";
import { useTicketStore } from "@/stores/useTickets";
import {
  useFetchTickets,
  useFetchUsers,
  useTicketCreate,
  useTicketComplete,
} from "@/services/tickets";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import type {
  Ticket,
  User,
  TicketWithStatus,
  TicketStatus,
} from "@acme/shared-models";

const TicketListPage = () => {
  // Zustand store for state management only
  const { tickets, users, filter, setTickets, setUsers, setFilter } =
    useTicketStore();

  // Services for API calls
  const { data: ticketsData, isLoading, error } = useFetchTickets();
  const { data: usersData } = useFetchUsers();
  const createTicketMutation = useTicketCreate();
  const completeTicketMutation = useTicketComplete();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Update store when data changes
  useEffect(() => {
    if (ticketsData) setTickets(ticketsData);
  }, [ticketsData, setTickets]);

  useEffect(() => {
    if (usersData) setUsers(usersData);
  }, [usersData, setUsers]);

  const handleAddTicket = async (description: string, assigneeId?: number) => {
    try {
      await createTicketMutation.mutateAsync({ description, assigneeId });
    } catch (error) {
      console.error("Failed to create ticket:", error);
    }
  };

  const handleToggleComplete = async (ticketId: number, completed: boolean) => {
    try {
      await completeTicketMutation.mutateAsync({ ticketId, completed });
    } catch (error) {
      console.error("Failed to update ticket:", error);
    }
  };

  // Helper function to map tickets with status
  const mapTicketToDisplay = (ticket: Ticket): TicketWithStatus => {
    let status: TicketStatus;
    if (ticket.completed) {
      status = "Completed";
    } else if (ticket.assigneeId) {
      status = "In Progress";
    } else {
      status = "Open";
    }

    const title =
      ticket.description.length > 50
        ? ticket.description.substring(0, 50) + "..."
        : ticket.description;

    const assignee = ticket.assigneeId
      ? users.find((user: User) => user.id === ticket.assigneeId)
      : undefined;

    return { ...ticket, status, title, assignee };
  };

  // Map and filter tickets
  const ticketsWithStatus = tickets.map(mapTicketToDisplay);
  const currentTickets =
    filter === "All"
      ? ticketsWithStatus
      : ticketsWithStatus.filter((ticket) => ticket.status === filter);

  if (isLoading && tickets.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <TicketHeader
        filter={filter}
        onFilterChange={setFilter}
        onAddTicket={() => setIsAddModalOpen(true)}
        ticketCount={currentTickets.length}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error.message}
        </Alert>
      )}

      {currentTickets.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="300px"
          textAlign="center"
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {filter === "All"
              ? "No tickets found"
              : `No ${filter.toLowerCase()} tickets`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {filter === "All"
              ? "Get started by creating your first ticket"
              : "Try changing the filter or create a new ticket"}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {currentTickets.map((ticket) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={ticket.id}>
              <TicketCard
                ticket={ticket}
                onToggleComplete={handleToggleComplete}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <AddTicketModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddTicket}
        users={users}
      />
    </Container>
  );
};

export default TicketListPage;

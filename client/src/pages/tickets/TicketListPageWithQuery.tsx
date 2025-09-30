import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import TicketCard from "@/components/molecules/ticket-card/TicketCard";
import TicketHeader from "@/components/molecules/ticket-header/TicketHeader";
import AddTicketModal from "@/components/molecules/add-ticket-modal/AddTicketModal";
import useStyle from "./TicketListPageWithQuery.styles";
import { useTicketListPageState } from "./TicketListPageWithQuery.state";

const TicketListPageWithQuery = () => {
  const styles = useStyle();
  const {
    filter,
    isAddModalOpen,
    filteredTickets,
    users,
    isLoading,
    error,
    createTicketMutation,
    completeTicketMutation,
    setFilter,
    handleAddTicket,
    handleToggleComplete,
    handleAddTicketModalOpen,
    handleAddTicketModalClose,
  } = useTicketListPageState();

  if (isLoading && (!filteredTickets || filteredTickets.length === 0)) {
    return (
      <Container maxWidth="lg" sx={styles.container}>
        <Box sx={styles.loadingContainer}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <TicketHeader
        filter={filter}
        onFilterChange={setFilter}
        onAddTicket={handleAddTicketModalOpen}
        ticketCount={filteredTickets?.length || 0}
      />

      {error && (
        <Alert severity="error" sx={styles.errorAlert}>
          {error instanceof Error ? error.message : "An error occurred"}
        </Alert>
      )}

      {createTicketMutation.error && (
        <Alert severity="error" sx={styles.errorAlert}>
          Failed to create ticket: {createTicketMutation.error.message}
        </Alert>
      )}

      {completeTicketMutation.error && (
        <Alert severity="error" sx={styles.errorAlert}>
          Failed to update ticket: {completeTicketMutation.error.message}
        </Alert>
      )}

      {filteredTickets?.length === 0 ? (
        <Box sx={styles.emptyStateContainer}>
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
          {filteredTickets?.map((ticket) => (
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
        onClose={handleAddTicketModalClose}
        onSubmit={handleAddTicket}
        users={users}
      />
    </Container>
  );
};

export default TicketListPageWithQuery;

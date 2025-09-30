import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Chip,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { PATH } from "@/routes/path";
import Iconify from "@/components/atoms/Iconify";
import {
  useFetchTicketById,
  useFetchUsers,
  useTicketAssign,
  useTicketUnassign,
  useTicketComplete,
} from "@/services/tickets";
import type { User } from "@acme/shared-models";
import useStyle from "./TicketDetailPage.styles";

const getStatusColor = (completed: boolean, assigneeId: number | null) => {
  if (completed) return "success";
  if (assigneeId) return "warning";
  return "error";
};

const getStatusLabel = (completed: boolean, assigneeId: number | null) => {
  if (completed) return "Completed";
  if (assigneeId) return "In Progress";
  return "Open";
};

const TicketDetailPage: React.FC = () => {
  const styles = useStyle();
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
      await unassignTicketMutation.mutateAsync({ ticketId: ticket.id });
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

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={styles.container}>
        <Box sx={styles.loadingContainer}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !ticket) {
    return (
      <Container maxWidth="md" sx={styles.container}>
        <Alert severity="error" sx={styles.errorAlert}>
          {error instanceof Error ? error.message : "Ticket not found"}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<Iconify icon="material-symbols:arrow-back" />}
          onClick={handleBackToList}
        >
          Back to List
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={styles.container}>
      {/* Header with Back Button */}
      <Box sx={styles.headerContainer}>
        <Button
          variant="outlined"
          startIcon={<Iconify icon="material-symbols:arrow-back" />}
          onClick={handleBackToList}
          sx={styles.backButton}
        >
          Back to List
        </Button>
        <Typography variant="h4" sx={styles.title}>
          Ticket #{ticket.id}
        </Typography>
      </Box>

      {/* Error Messages */}
      {assignTicketMutation.error && (
        <Alert severity="error" sx={styles.errorAlert}>
          Failed to assign ticket: {assignTicketMutation.error.message}
        </Alert>
      )}
      {unassignTicketMutation.error && (
        <Alert severity="error" sx={styles.errorAlert}>
          Failed to unassign ticket: {unassignTicketMutation.error.message}
        </Alert>
      )}
      {completeTicketMutation.error && (
        <Alert severity="error" sx={styles.errorAlert}>
          Failed to update ticket: {completeTicketMutation.error.message}
        </Alert>
      )}

      {/* Main Content */}
      <Paper elevation={2} sx={styles.paper}>
        {/* Status and Basic Info */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={3}
        >
          <Box>
            <Chip
              label={getStatusLabel(ticket.completed, ticket.assigneeId)}
              color={getStatusColor(ticket.completed, ticket.assigneeId)}
              size="medium"
              sx={{ mb: 2, fontSize: "1rem", height: "32px" }}
            />
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {ticket.description}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Current Assignee Section */}
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            Current Assignee
          </Typography>
          {currentAssignee ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    mr: 2,
                    bgcolor: "primary.main",
                  }}
                >
                  {currentAssignee.name.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="body1">{currentAssignee.name}</Typography>
              </Box>
              <Button
                variant="outlined"
                color="error"
                onClick={handleUnassignUser}
                disabled={unassignTicketMutation.isPending}
                startIcon={
                  unassignTicketMutation.isPending ? (
                    <CircularProgress size={16} />
                  ) : (
                    <Iconify icon="material-symbols:person-remove" />
                  )
                }
              >
                Unassign
              </Button>
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No one assigned to this ticket
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Assign User Section */}
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            Assign User
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Select User</InputLabel>
              <Select
                value={selectedAssignee}
                label="Select User"
                onChange={(e) => setSelectedAssignee(e.target.value)}
              >
                {users.map((user: User) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              onClick={handleAssignUser}
              disabled={!selectedAssignee || assignTicketMutation.isPending}
              startIcon={
                assignTicketMutation.isPending ? (
                  <CircularProgress size={16} />
                ) : (
                  <Iconify icon="material-symbols:person-add" />
                )
              }
            >
              Assign
            </Button>
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Actions Section */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Actions
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant={ticket.completed ? "outlined" : "contained"}
              color={ticket.completed ? "warning" : "success"}
              onClick={handleToggleComplete}
              disabled={completeTicketMutation.isPending}
              startIcon={
                completeTicketMutation.isPending ? (
                  <CircularProgress size={16} />
                ) : (
                  <Iconify
                    icon={
                      ticket.completed
                        ? "material-symbols:undo"
                        : "material-symbols:check-circle"
                    }
                  />
                )
              }
            >
              {ticket.completed ? "Mark as Incomplete" : "Mark as Complete"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default TicketDetailPage;

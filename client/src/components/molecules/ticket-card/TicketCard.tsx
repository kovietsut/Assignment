import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Box,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import Iconify from "@/components/atoms/Iconify";
import type { TicketWithStatus } from "@acme/shared-models";
import useStyle from "./TicketCard.styles";
import { useTicketCardState, getStatusColor } from "./TicketCard.state";

interface TicketCardProps {
  ticket: TicketWithStatus;
  onToggleComplete?: (ticketId: number, completed: boolean) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  onToggleComplete,
}) => {
  const styles = useStyle();
  const { handleViewDetails, handleToggleComplete } = useTicketCardState({
    ticket,
    onToggleComplete,
  });

  return (
    <Card sx={styles.card}>
      <CardContent>
        <Box sx={styles.titleContainer}>
          <Typography variant="h6" component="h3" sx={styles.title}>
            {ticket.title}
          </Typography>
          <Chip
            label={ticket.status}
            color={getStatusColor(ticket.status)}
            size="small"
            sx={styles.chip}
          />
        </Box>

        {ticket.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={styles.description}
          >
            {ticket.description}
          </Typography>
        )}

        {ticket.assignee && (
          <Box sx={styles.assigneeContainer}>
            <Avatar sx={styles.avatar}>
              {ticket.assignee.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="body2" color="text.secondary">
              Assigned to {ticket.assignee.name}
            </Typography>
          </Box>
        )}
      </CardContent>

      <CardActions sx={styles.cardActions}>
        <Box sx={styles.actionsContainer}>
          <Tooltip
            title={ticket.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            <IconButton
              size="small"
              onClick={handleToggleComplete}
              color={ticket.completed ? "success" : "default"}
            >
              <Iconify
                icon={
                  ticket.completed
                    ? "material-symbols:check-circle"
                    : "material-symbols:radio-button-unchecked"
                }
              />
            </IconButton>
          </Tooltip>
        </Box>
        <Button
          size="small"
          variant="outlined"
          onClick={handleViewDetails}
          sx={styles.viewDetailsButton}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default TicketCard;

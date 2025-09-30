import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import Iconify from "@/components/atoms/Iconify";
import TicketFilterComponent from "../ticket-filter/TicketFilter";
import type { TicketFilter } from "@acme/shared-models";
import useStyle from "./TicketHeader.styles";

interface TicketHeaderProps {
  filter: TicketFilter;
  onFilterChange: (filter: TicketFilter) => void;
  onAddTicket: () => void;
  ticketCount: number;
}

const TicketHeader: React.FC<TicketHeaderProps> = ({
  filter,
  onFilterChange,
  onAddTicket,
  ticketCount,
}) => {
  const styles = useStyle();

  return (
    <Box sx={styles.container}>
      <Box sx={styles.headerContainer}>
        <Box>
          <Typography variant="h4" component="h1" sx={styles.title}>
            Ticket Manager
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {ticketCount} {ticketCount === 1 ? "ticket" : "tickets"}
            {filter !== "All" && ` • Filtered by ${filter}`}
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Iconify icon="material-symbols:add" />}
          onClick={onAddTicket}
          sx={styles.addButton}
        >
          Add New Ticket
        </Button>
      </Box>

      <Stack direction="row" spacing={2} alignItems="center">
        <TicketFilterComponent value={filter} onChange={onFilterChange} />
      </Stack>
    </Box>
  );
};

export default TicketHeader;

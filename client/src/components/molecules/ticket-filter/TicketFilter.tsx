import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";
import type { TicketFilter } from "@acme/shared-models";
import useStyle from "./TicketFilter.styles";

interface TicketFilterProps {
  value: TicketFilter;
  onChange: (filter: TicketFilter) => void;
}

const filters: TicketFilter[] = ["All", "Open", "In Progress", "Completed"];

const TicketFilterComponent: React.FC<TicketFilterProps> = ({
  value,
  onChange,
}) => {
  const styles = useStyle();
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as TicketFilter);
  };

  return (
    <FormControl size="small" sx={styles.formControl}>
      <InputLabel id="ticket-filter-label">Filter by Status</InputLabel>
      <Select
        labelId="ticket-filter-label"
        value={value}
        label="Filter by Status"
        onChange={handleChange}
      >
        {filters.map((filter) => (
          <MenuItem key={filter} value={filter}>
            {filter}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TicketFilterComponent;

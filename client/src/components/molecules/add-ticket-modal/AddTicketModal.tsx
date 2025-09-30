import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import type { User } from "@acme/shared-models";
import useStyle from "./AddTicketModal.styles";
import { useAddTicketModalState } from "./AddTicketModal.state";

interface AddTicketModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (description: string, assigneeId?: number) => void;
  users: User[];
}

const AddTicketModal: React.FC<AddTicketModalProps> = ({
  open,
  onClose,
  onSubmit,
  users,
}) => {
  const styles = useStyle();
  const {
    formData,
    handleSubmit,
    handleClose,
    handleDescriptionChange,
    handleAssigneeChange,
  } = useAddTicketModalState({ onClose, onSubmit });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add New Ticket</DialogTitle>
        <DialogContent>
          <Box sx={styles.dialogContent}>
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              multiline
              rows={4}
              fullWidth
              required
              helperText="Describe the task or issue that needs to be addressed"
            />

            <FormControl fullWidth>
              <InputLabel>Assignee (Optional)</InputLabel>
              <Select
                value={formData.assigneeId || ""}
                label="Assignee (Optional)"
                onChange={(e) =>
                  handleAssigneeChange(
                    e.target.value ? Number(e.target.value) : null
                  )
                }
              >
                <MenuItem value="">Unassigned</MenuItem>
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!formData.description.trim()}
          >
            Add Ticket
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddTicketModal;

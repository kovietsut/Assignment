import { useState } from "react";

interface AddTicketModalStateProps {
  onClose: () => void;
  onSubmit: (description: string, assigneeId?: number) => void;
}

export const useAddTicketModalState = ({
  onClose,
  onSubmit,
}: AddTicketModalStateProps) => {
  const [formData, setFormData] = useState({
    description: "",
    assigneeId: null as number | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.description.trim()) {
      onSubmit(formData.description, formData.assigneeId || undefined);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      description: "",
      assigneeId: null,
    });
    onClose();
  };

  const handleDescriptionChange = (description: string) => {
    setFormData({ ...formData, description });
  };

  const handleAssigneeChange = (assigneeId: number | null) => {
    setFormData({ ...formData, assigneeId });
  };

  return {
    formData,
    handleSubmit,
    handleClose,
    handleDescriptionChange,
    handleAssigneeChange,
  };
};

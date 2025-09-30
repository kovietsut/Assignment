export type User = {
  id: number;
  name: string;
};

export type Ticket = {
  id: number;
  description: string;
  assigneeId: null | number;
  completed: boolean;
};

// Frontend-specific types for enhanced UI
export type TicketStatus = "Open" | "In Progress" | "Completed";
export type TicketFilter = "All" | TicketStatus;

// Extended ticket type for frontend display
export type TicketWithStatus = Ticket & {
  status: TicketStatus;
  title: string;
  assignee?: User;
};

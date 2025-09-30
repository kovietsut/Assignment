import type { Ticket, TicketFilter, User } from "@acme/shared-models";
import { create } from "zustand";

interface TicketStore {
  // State
  tickets: Ticket[];
  users: User[];
  filter: TicketFilter;

  // Actions - only for state management
  setTickets: (tickets: Ticket[]) => void;
  setUsers: (users: User[]) => void;
  setFilter: (filter: TicketFilter) => void;
}

export const useTicketStore = create<TicketStore>((set) => ({
  // Initial state
  tickets: [],
  users: [],
  filter: "All",

  // State setters only
  setTickets: (tickets) => set({ tickets }),
  setUsers: (users) => set({ users }),
  setFilter: (filter) => set({ filter }),
}));

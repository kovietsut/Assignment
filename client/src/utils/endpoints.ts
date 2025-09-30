export const Endpoint = {
  tickets: {
    root: "/tickets",
    detail: (id: string | number) => `/tickets/${id}`,
    assign: (ticketId: string | number, userId: string | number) =>
      `/tickets/${ticketId}/assign/${userId}`,
    unassign: (ticketId: string | number) => `/tickets/${ticketId}/unassign`,
    complete: (ticketId: string | number) => `/tickets/${ticketId}/complete`,
  },
  users: {
    root: "/users",
    detail: (id: string | number) => `/users/${id}`,
  },
};

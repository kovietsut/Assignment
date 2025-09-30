export const PATH = {
  auth: {
    login: "/auth/login",
  },
  tickets: {
    list: "/app/tickets",
    detail: (id: string) => `/app/tickets/${id}`,
  },
};

import { useFetch, usePost } from "@/utils/reactQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";
import { Endpoint } from "@/utils/endpoints";
import type { Ticket, User } from "@acme/shared-models";
import type { DataResponse } from "@/interfaces/responseData";

export const useFetchTickets = () => {
  return useFetch<Ticket[]>(Endpoint.tickets.root);
};

export const useFetchTicketById = (id: string | number | null) => {
  return useFetch<Ticket>(id ? Endpoint.tickets.detail(id) : null);
};

export const useFetchUsers = () => {
  return useFetch<User[]>(Endpoint.users.root);
};

export const useTicketCreate = () => {
  return usePost<Ticket, { description: string }>(Endpoint.tickets.root);
};

export const useTicketAssign = () => {
  const queryClient = useQueryClient();

  return useMutation<
    DataResponse<void>,
    Error,
    { ticketId: number; userId: number }
  >({
    mutationFn: ({ ticketId, userId }) =>
      api.put<void>(Endpoint.tickets.assign(ticketId, userId)),
    onMutate: async () => {
      // Cancel any outgoing refetches to prevent race conditions
      await queryClient.cancelQueries({ queryKey: [Endpoint.tickets.root] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Endpoint.tickets.root] });
    },
    onError: () => {
      // Invalidate queries on error to ensure fresh data
      queryClient.invalidateQueries({ queryKey: [Endpoint.tickets.root] });
    },
  });
};

export const useTicketUnassign = () => {
  const queryClient = useQueryClient();

  return useMutation<DataResponse<void>, Error, { ticketId: number }>({
    mutationFn: ({ ticketId }) =>
      api.put<void>(Endpoint.tickets.unassign(ticketId)),
    onMutate: async () => {
      // Cancel any outgoing refetches to prevent race conditions
      await queryClient.cancelQueries({ queryKey: [Endpoint.tickets.root] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Endpoint.tickets.root] });
    },
    onError: () => {
      // Invalidate queries on error to ensure fresh data
      queryClient.invalidateQueries({ queryKey: [Endpoint.tickets.root] });
    },
  });
};

export const useTicketComplete = () => {
  const queryClient = useQueryClient();

  return useMutation<
    DataResponse<void>,
    Error,
    { ticketId: number; completed: boolean }
  >({
    mutationFn: ({ ticketId, completed }) => {
      if (completed) {
        return api.put<void>(Endpoint.tickets.complete(ticketId));
      } else {
        return api.delete<void>(Endpoint.tickets.complete(ticketId));
      }
    },
    onMutate: async () => {
      // Cancel any outgoing refetches to prevent race conditions
      await queryClient.cancelQueries({ queryKey: [Endpoint.tickets.root] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Endpoint.tickets.root] });
    },
    onError: () => {
      // Invalidate queries on error to ensure fresh data
      queryClient.invalidateQueries({ queryKey: [Endpoint.tickets.root] });
    },
  });
};

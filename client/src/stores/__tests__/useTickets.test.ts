import { act, renderHook } from "@testing-library/react";
import { useTicketStore } from "../useTickets";
import type { Ticket, User } from "../../tests/test-type";

// Mock data
const mockTickets: Ticket[] = [
  {
    id: 1,
    description: "Fix login issue",
    assigneeId: 1,
    completed: false,
  },
  {
    id: 2,
    description: "Update homepage design",
    assigneeId: 2,
    completed: true,
  },
];

const mockUsers: User[] = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

describe("useTicketStore", () => {
  beforeEach(() => {
    // Reset store state before each test
    useTicketStore.setState({
      tickets: [],
      users: [],
      filter: "All",
    });
  });

  it("should have initial state", () => {
    const { result } = renderHook(() => useTicketStore());

    expect(result.current.tickets).toEqual([]);
    expect(result.current.users).toEqual([]);
    expect(result.current.filter).toBe("All");
  });

  it("should set tickets", () => {
    const { result } = renderHook(() => useTicketStore());

    act(() => {
      result.current.setTickets(mockTickets);
    });

    expect(result.current.tickets).toEqual(mockTickets);
  });

  it("should set users", () => {
    const { result } = renderHook(() => useTicketStore());

    act(() => {
      result.current.setUsers(mockUsers);
    });

    expect(result.current.users).toEqual(mockUsers);
  });

  it("should set filter", () => {
    const { result } = renderHook(() => useTicketStore());

    act(() => {
      result.current.setFilter("Open");
    });

    expect(result.current.filter).toBe("Open");

    act(() => {
      result.current.setFilter("In Progress");
    });

    expect(result.current.filter).toBe("In Progress");

    act(() => {
      result.current.setFilter("Completed");
    });

    expect(result.current.filter).toBe("Completed");
  });

  it("should update state independently", () => {
    const { result } = renderHook(() => useTicketStore());

    act(() => {
      result.current.setTickets(mockTickets);
      result.current.setUsers(mockUsers);
      result.current.setFilter("Open");
    });

    expect(result.current.tickets).toEqual(mockTickets);
    expect(result.current.users).toEqual(mockUsers);
    expect(result.current.filter).toBe("Open");
  });

  it("should replace tickets when setting new ones", () => {
    const { result } = renderHook(() => useTicketStore());

    // Set initial tickets
    act(() => {
      result.current.setTickets(mockTickets);
    });

    expect(result.current.tickets).toHaveLength(2);

    // Set new tickets (should replace, not append)
    const newTickets: Ticket[] = [
      {
        id: 3,
        description: "New ticket",
        assigneeId: null,
        completed: false,
      },
    ];

    act(() => {
      result.current.setTickets(newTickets);
    });

    expect(result.current.tickets).toEqual(newTickets);
    expect(result.current.tickets).toHaveLength(1);
  });

  it("should handle empty arrays", () => {
    const { result } = renderHook(() => useTicketStore());

    // First set some data
    act(() => {
      result.current.setTickets(mockTickets);
      result.current.setUsers(mockUsers);
    });

    expect(result.current.tickets).toHaveLength(2);
    expect(result.current.users).toHaveLength(2);

    // Then clear them
    act(() => {
      result.current.setTickets([]);
      result.current.setUsers([]);
    });

    expect(result.current.tickets).toEqual([]);
    expect(result.current.users).toEqual([]);
  });
});

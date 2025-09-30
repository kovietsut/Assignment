/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DataResponse } from "@/interfaces/responseData";

// Simple API client for backend communication
const API_BASE_URL = "http://localhost:4200/api";

export const api = {
  get: async <T>(
    url: string,
    params?: object,
    baseURL?: string,
    signal?: AbortSignal
  ): Promise<DataResponse<T>> => {
    const searchParams = params
      ? new URLSearchParams(params as any).toString()
      : "";
    const fullUrl = `${baseURL || API_BASE_URL}${url}${
      searchParams ? `?${searchParams}` : ""
    }`;

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      status: response.status,
      code: null,
      message: null,
      data,
      errors: null,
    } as DataResponse<T>;
  },

  post: async <T>(
    url: string,
    data?: any,
    baseURL?: string,
    signal?: AbortSignal
  ): Promise<DataResponse<T>> => {
    const response = await fetch(`${baseURL || API_BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
      signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return {
      status: response.status,
      code: null,
      message: null,
      data: responseData,
      errors: null,
    } as DataResponse<T>;
  },

  put: async <T>(
    url: string,
    data?: any,
    baseURL?: string,
    signal?: AbortSignal
  ): Promise<DataResponse<T>> => {
    const response = await fetch(`${baseURL || API_BASE_URL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
      signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // For PUT requests that return 204 (No Content), return empty object
    let responseData;
    if (response.status === 204) {
      responseData = {} as T;
    } else {
      responseData = await response.json();
    }

    return {
      status: response.status,
      code: null,
      message: null,
      data: responseData,
      errors: null,
    } as DataResponse<T>;
  },

  delete: async <T>(
    url: string,
    baseURL?: string,
    signal?: AbortSignal
  ): Promise<DataResponse<T>> => {
    const response = await fetch(`${baseURL || API_BASE_URL}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // For DELETE requests that return 204 (No Content), return empty object
    let responseData;
    if (response.status === 204) {
      responseData = {} as T;
    } else {
      responseData = await response.json();
    }

    return {
      status: response.status,
      code: null,
      message: null,
      data: responseData,
      errors: null,
    } as DataResponse<T>;
  },
};

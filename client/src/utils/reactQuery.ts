import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
  type QueryFunctionContext,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { api } from "./api";
import type { DataResponse } from "@/interfaces/responseData";

export type QueryKeyT = [string, object | undefined];

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 3, refetchOnWindowFocus: true } },
});

const isSearch = (url: string) => url.includes("search");
export const fetcher = async <T>(
  context: QueryFunctionContext<QueryKeyT>,
  baseURL?: string
): Promise<T> => {
  const [url, params] = context.queryKey;
  const { signal } = context;
  const trigger = isSearch(url) ? api.post<T> : api.get<T>;
  return trigger(
    url,
    {
      ...params,
    },
    baseURL,
    signal
  ).then((res) => res.data);
};

export const usePrefetch = <T>(
  url: string | null,
  params?: object,
  baseURL?: string
) => {
  const queryClient = useQueryClient();

  return () => {
    if (!url) {
      return;
    }

    queryClient.prefetchQuery<T, Error, T, QueryKeyT>({
      queryKey: [url!, params],
      queryFn: (context) => fetcher(context, baseURL),
    });
  };
};

export const useFetch = <T>(
  url: string | null,
  params?: object,
  baseURL?: string,
  config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
  const context = useQuery<T, Error, T, QueryKeyT>({
    queryKey: [url!, params],
    queryFn: (context) => fetcher(context, baseURL),
    enabled: !!url,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...config,
  });

  return context;
};

const useGenericMutation = <T, S>(
  func: (data: T | S, baseURL?: string) => Promise<DataResponse<S>>,
  url: string,
  params?: object,
  baseURL?: string,
  updater?: ((oldData: T, newData: S) => T) | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation<DataResponse<S>, Error, T | S>({
    mutationFn: (data) => func(data, baseURL),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [url!, params] });

      const previousData = queryClient.getQueryData([url!, params]);

      queryClient.setQueryData<T>([url!, params], (oldData) =>
        updater ? updater(oldData!, data as S) : (data as T)
      );

      return previousData;
    },
    onError: (__, _, context) => {
      queryClient.setQueryData([url!, params], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [url!, params] });
    },
  });
};

export const useDelete = <T>(
  url: string,
  params?: object,
  baseURL?: string,
  updater?: (oldData: T, id: string | number) => T
) =>
  useGenericMutation<T, string | number>(
    (id) => api.delete(`${url}/${id}`, baseURL),
    url,
    params,
    baseURL,
    updater
  );

export const useDeleteList = <T>(
  url: string,
  params?: object,
  baseURL?: string,
  updater?: (oldData: T, id: string | number) => T
) =>
  useGenericMutation<T, string | number>(
    (id) => api.delete(`${url}?ids=${id}`, baseURL),
    url,
    params,
    baseURL,
    updater
  );

export const usePost = <T, S>(
  url: string,
  params?: object,
  baseURL?: string,
  updater?: (oldData: T, newData: S) => T
) =>
  useGenericMutation<T, S>(
    (data) => api.post<S>(url, data, baseURL),
    url,
    params,
    baseURL,
    updater
  );

export const useUpdate = <T, S>(
  url: string,
  params?: object,
  baseURL?: string,
  updater?: (oldData: T, newData: S) => T
) =>
  useGenericMutation<T, S>(
    (data) => api.put<S>(url, data, baseURL),
    url,
    params,
    baseURL,
    updater
  );

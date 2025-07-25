import type { QueryClientConfig } from "@tanstack/react-query";

export const queryOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 0,
      gcTime: 0,
    },
  },
};

import {
  QueryClient,
  QueryClientProvider as BaseClientProvider,
} from "@tanstack/react-query";
import { type PropsWithChildren, useState } from "react";

import { queryOptions } from "../react-query";

export const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient(queryOptions));

  return (
    <BaseClientProvider client={queryClient}>{children}</BaseClientProvider>
  );
};

"use client";

import * as RQ from "@tanstack/react-query";
import React, { useState } from "react";
import { useOnQueryError } from "@/libs/hooks/use-on-query-error";

type Props = {
  children: React.ReactNode;
};

export const QueryProvider = ({ children }: Props) => {
  const onError = useOnQueryError();

  const [queryClient] = useState(() => {
    const queryCache = new RQ.QueryCache({ onError });
    const mutationCache = new RQ.MutationCache({ onError });
    return new RQ.QueryClient({ queryCache, mutationCache });
  });

  return (
    <RQ.QueryClientProvider client={queryClient}>
      {children}
    </RQ.QueryClientProvider>
  );
};

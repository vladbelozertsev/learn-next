"use client";

import { ToastProvider } from "./toast-provider";
import { QueryProvider } from "./query-provider";

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <ToastProvider>
      <QueryProvider>{children}</QueryProvider>
    </ToastProvider>
  );
};

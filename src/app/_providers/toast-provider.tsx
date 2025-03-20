"use client";

import { FC, Fragment } from "react";
import { Toaster } from "react-hot-toast";

type Props = {
  children: React.ReactNode;
};

export const ToastProvider: FC<Props> = ({ children }) => {
  return (
    <Fragment>
      {children}
      <Toaster position="top-center" />
    </Fragment>
  );
};

import { GridRowParams } from "@mui/x-data-grid";
import { useGo } from "@refinedev/core";

export const useGridGo = (action: "edit" | "show" | "clone", resource: string) => {
  const go = useGo();

  return ({ id }: GridRowParams<any>) => {
    go({ to: { resource, action, id } });
  };
};

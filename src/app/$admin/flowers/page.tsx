"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { EditButton, useDataGrid } from "@refinedev/mui";
import { List } from "@mui/material";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "number", width: 50 },
  { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
  {
    field: "actions",
    headerName: "Actions",
    display: "flex",
    renderCell: function render({ row }) {
      return <EditButton hideText recordItemId={row.id} />;
    },
  },
];

export default function ProductList() {
  const { dataGridProps } = useDataGrid();

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} pageSizeOptions={[10, 25, 50]} />
    </List>
  );
}

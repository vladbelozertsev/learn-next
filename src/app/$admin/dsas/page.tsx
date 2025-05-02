"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Img } from "../_libs_/components/img";
import { List } from "@mui/material";
import { sxPointer } from "../_libs_/utils";
import { useDataGrid } from "@refinedev/mui";
import { useGo } from "@refinedev/core";

const columns: GridColDef<any>[] = [
  {
    field: "id",
    headerName: "№",
    type: "number",
    width: 75,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "img",
    headerName: "Изображение",
    width: 145,
    align: "center",
    editable: true,
    renderCell: ({ value }) => <Img src={value} width={75} height={75} />,
  },
  {
    field: "name",
    headerName: "Имя",
    minWidth: 200,
    flex: 1,
  },
  {
    field: "price",
    headerName: "Цена",
    minWidth: 300,
    flex: 1,
  },
];

export default function FlowersList() {
  const data = useDataGrid<any>();
  const go = useGo();

  const showFlower = (id: string | number) => {
    go({ to: { resource: "flowers", action: "show", id } });
  };

  return (
    <List>
      <div>asdasdas</div>
      <DataGrid
        {...data.dataGridProps}
        columns={columns}
        onRowClick={(e) => showFlower(e.id)}
        rowHeight={145}
        sx={sxPointer}
      />
    </List>
  );
}

// https://refine.dev/docs/ui-integrations/material-ui/introduction/
// ONLY npm i @refinedev/mui
// other deps installed to node_modules via @refinedev/mui peerDependencies

"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Img } from "../../_libs_/components/img";
import { useDataGrid } from "@refinedev/mui";
import { useShow } from "@refinedev/core";

interface IProduct {
  id: string;
  name: string;
  price: number;
}

const columns: GridColDef<IProduct>[] = [
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

export default function FlowerShow() {
  const { query } = useShow<IProduct>();

  console.log(query);

  return (
    <div>
      <div>{query.data?.data?.id}</div>
      <div>{query.data?.data?.name}</div>
      <div>{query.data?.data?.price}</div>
    </div>
  );
}

// https://refine.dev/docs/ui-integrations/material-ui/introduction/
// ONLY npm i @refinedev/mui
// other deps installed to node_modules via @refinedev/mui peerDependencies

export const sxPointer = {
  // https://stackoverflow.com/questions/74624999/how-to-make-material-ui-datagrid-row-cliccable-and-with-pointer-cursor-withou
  // disable cell selection style
  ".MuiDataGrid-cell:focus": {
    outline: "none",
  },
  // pointer cursor on ALL rows
  "& .MuiDataGrid-row:hover": {
    cursor: "pointer",
  },
};

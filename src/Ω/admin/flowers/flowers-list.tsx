import React from "react";
import { ArrayField, Datagrid, Field, ImageField, List, TextField } from "react-admin";

export const FlowersList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" contentEditable={false} label="№" />
        <TextField source="name" label="Имя" />
      </Datagrid>
    </List>
  );
};

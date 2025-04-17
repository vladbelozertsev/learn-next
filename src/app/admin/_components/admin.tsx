"use client";

import simpleRestProvider from "ra-data-simple-rest";
import { Admin, EditGuesser, ListGuesser, Resource } from "react-admin";

const dataProvider = simpleRestProvider("http://localhost:3000/api");

const AdminApp = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={ListGuesser} edit={EditGuesser} recordRepresentation="name" />
  </Admin>
);

export default AdminApp;

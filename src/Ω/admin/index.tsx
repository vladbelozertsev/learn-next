"use client";

import jsonServerProvider from "ra-data-json-server";
import simpleRestProvider from "ra-data-simple-rest";
import { Admin, EditGuesser, ListGuesser, Resource } from "react-admin";
import { useDataProvider } from "./hooks/use-data-provider";

// const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const AdminApp = () => {
  const dataProvider = useDataProvider();

  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="flowers" list={ListGuesser} edit={EditGuesser} recordRepresentation="email" />
      {/* <Resource name="posts" list={ListGuesser} edit={EditGuesser} recordRepresentation="title" />
    <Resource name="comments" list={ListGuesser} edit={EditGuesser} /> */}
    </Admin>
  );
};

export default AdminApp;

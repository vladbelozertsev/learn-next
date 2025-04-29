"use client";

import MyLayout from "./_libs_/layout";
import jsonServerProvider from "ra-data-json-server";
import simpleRestProvider from "ra-data-simple-rest";
import { Admin, EditGuesser, ListGuesser, Resource } from "react-admin";
import { FlowersList } from "./flowers/flowers-list";
import { useDataProvider } from "./_libs_/hooks/use-data-provider";

// const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const AdminApp = () => {
  const dataProvider = useDataProvider();

  return (
    <Admin layout={MyLayout} dataProvider={dataProvider}>
      <Resource name="flowers" list={FlowersList} edit={EditGuesser} recordRepresentation="email" />
      {/* <Resource name="posts" list={ListGuesser} edit={EditGuesser} recordRepresentation="title" />
    <Resource name="comments" list={ListGuesser} edit={EditGuesser} /> */}
    </Admin>
  );
};

export default AdminApp;

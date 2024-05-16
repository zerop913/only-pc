import React from "react";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserList, UserEdit, UserCreate } from "./Users/Users";
import {
  CategoryList,
  CategoryEdit,
  CategoryCreate,
} from "./Categories/Categories";
import { ProductList, ProductEdit, ProductCreate } from "./Products/Products";

const dataProvider = jsonServerProvider("http://localhost:3001/api/v1");

const AdminPanel = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      create={UserCreate}
    />
    <Resource
      name="categories"
      list={CategoryList}
      edit={CategoryEdit}
      create={CategoryCreate}
    />
    <Resource
      name="products"
      list={ProductList}
      edit={ProductEdit}
      create={ProductCreate}
    />
  </Admin>
);

export default AdminPanel;

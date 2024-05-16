import React from "react";
import {
  List,
  Datagrid,
  TextField,
  ImageField,
  NumberField,
  EditButton,
  DeleteButton,
  Edit,
  SimpleForm,
  TextInput,
  ImageInput,
  NumberInput,
  Create,
} from "react-admin";

export const ProductList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="product_title" />
      <ImageField source="product_images" title="images" />
      <NumberField
        source="price"
        options={{ style: "currency", currency: "RUB" }}
      />
      <EditButton basePath="/products" />
      <DeleteButton basePath="/products" />
    </Datagrid>
  </List>
);

export const ProductEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="product_title" />
      <ImageInput
        source="product_images"
        label="Product Images"
        accept="image/*"
      >
        <ImageField source="src" title="title" />
      </ImageInput>
      <NumberInput source="price" />
    </SimpleForm>
  </Edit>
);

export const ProductCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="product_title" />
      <ImageInput
        source="product_images"
        label="Product Images"
        accept="image/*"
      >
        <ImageField source="src" title="title" />
      </ImageInput>
      <NumberInput source="price" />
    </SimpleForm>
  </Create>
);

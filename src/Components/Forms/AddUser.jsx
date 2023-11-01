import React from "react";
import { useParams } from "react-router-dom";
import { Form } from "../Join/Form";
import { Register } from "./Register";

export const AddUser = () => {
  const { type } = useParams();

  return <>{type && type == "worker" ? <Form /> : <Register></Register>}</>;
};

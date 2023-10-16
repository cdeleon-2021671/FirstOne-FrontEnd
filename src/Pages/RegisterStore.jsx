import React, { useEffect } from "react";
import $ from "jquery";
import { Header } from "../Components/Join/Header";
import { Helmet } from "react-helmet-async";
import { Form } from "../Components/Join/Form";

export const RegisterStore = () => {
  useEffect(() => {
    $(".header").addClass("disable");
    $(".menu").addClass("disable");
    return () => {
      $(".header").removeClass("disable");
      $(".menu").removeClass("disable");
    };
  }, []);
  return (
    <>
      <Helmet>
        <title>Tienda.gt - Afiliarse</title>
        <meta
          name="description"
          content="Aqui puedes unirte a tienda.gt para que podamos
        promocionar tus productos. No te lo pierdas!"
        />
        <link rel="canonical" href="https://tienda.gt/join/trade-online/data" />
      </Helmet>
      <Header></Header>
      <Form></Form>
    </>
  );
};

import React, { useEffect } from "react";
import { Header } from "../Components/Join/Header";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";

export const RegisterStore = () => {

  return (
    <>
      <Helmet>
        <title>Tienda.gt - Afiliarse</title>
        <meta
          name="description"
          content="Aqui puedes unirte a tienda.gt para que podamos
        promocionar tus productos. No te lo pierdas!"
        />
        <link
          rel="canonical"
          href="https://tienda.gt/join/trade-online/step1"
        />
      </Helmet>
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
};

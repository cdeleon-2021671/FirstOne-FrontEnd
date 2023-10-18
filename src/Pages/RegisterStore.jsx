import React, { useEffect } from "react";
import $ from "jquery";
import { Header } from "../Components/Join/Header";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";

export const RegisterStore = () => {
  useEffect(() => {
    $(".header").addClass("disable");
    $(".menu").addClass("disable");
    localStorage.setItem("register", "");
    localStorage.setItem("codeExpired", "");
    return () => {
    localStorage.setItem("register", "");
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

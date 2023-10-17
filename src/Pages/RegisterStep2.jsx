import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "../Components/Join/Header";
import { StoreInformation } from "../Components/Join/StoreInformation";
import { AuthContext } from "../Index";
import $ from "jquery";

export const RegisterStep2 = () => {
  const [register, setRegister] = useState(false);
  const { isLogged, user } = useContext(AuthContext);
  useEffect(() => {
    const token = localStorage.getItem("register");
    if (
      token ||
      (isLogged && (user.rol == "BUSINESSMAN" || user.rol == "WORKER"))
    )
      setRegister(true);
    $(".header").addClass("disable");
    $(".menu").addClass("disable");
    return () => {
      $(".header").removeClass("disable");
      $(".menu").removeClass("disable");
      localStorage.clear();
    };
  }, []);
  return (
    <>
      <Helmet>
        <title>Tienda.gt - Afiliarse Paso 2</title>
        <meta
          name="description"
          content="Aqui puedes unirte a tienda.gt para que podamos
    promocionar tus productos. No te lo pierdas!"
        />
        <link
          rel="canonical"
          href="https://tienda.gt/join/trade-online/step2"
        />
      </Helmet>
      <Header two="isActive"></Header>
      {register && <StoreInformation></StoreInformation>}
    </>
  );
};

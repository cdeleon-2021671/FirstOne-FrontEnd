import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.scss";
import { Helmet } from "react-helmet-async";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <>
    <Helmet>
      <title>Tienda.gt - Página no encontrada</title>
      <meta name="description" content="Lo sentimos! no hemos podido encontrar lo que estás buscando.
      Regresa a la página anterior para seguir navegando. Bienvenido!" />
      <link rel="canonical" href="https://tienda.gt" />
    </Helmet>
    <div className="max-page-container">
      <div className="not-found-page">
        <div>
          <p>Error 404</p>
          <h1>Página no encontrada</h1>
          <p>Lo siento! no pudimos encontrar la página que estás buscando</p>
          <button onClick={() => navigate(-1)}>Regresar</button>
        </div>
      </div>
    </div>
    </>
  );
};

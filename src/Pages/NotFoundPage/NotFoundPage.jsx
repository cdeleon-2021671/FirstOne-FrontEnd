import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.scss";
import { Helmet } from "react-helmet-async";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="max-page-container">
      <Helmet>
        <title>Tienda.gt - Página no encontrada</title>
        <meta
          name="description"
          content="Lo sentimos, no hemos podido encontrar la página que buscas"
        />
        <link rel="stylesheet" href="https://tienda.gt/NotFoundPage" />
      </Helmet>
      <div className="not-found-page">
        <div>
          <p>Error 404</p>
          <h1>Página no encontrada</h1>
          <p>Lo siento! no pudimos encontrar la página que estás buscando</p>
          <button onClick={() => navigate(-1)}>Regresar</button>
        </div>
      </div>
    </div>
  );
};

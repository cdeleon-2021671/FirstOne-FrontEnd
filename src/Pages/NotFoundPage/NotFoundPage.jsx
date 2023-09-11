import React from 'react'
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.scss";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found-page">
      <div>
        <p>Error 404</p>
        <h1>Página no encontrada</h1>
        <p>Lo siento! no pudimos encontrar la página que estás buscando</p>
        <button onClick={() => navigate(-1)}>Regresar</button>
      </div>
    </div>
  );
}
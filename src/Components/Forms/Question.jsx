import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Index";
import "./Question.scss";

export const Question = () => {
  const { isLogged } = useContext(AuthContext);

  return (
    <>
      {!isLogged && (
        <div className="form">
          <div className="container">
            <div className="container-title">
              <label>Crear cuenta</label>
            </div>
            <div className="question">
              <Link className="question-item" to={`/join/trade-online/step1`}>
                Afiliarse como tienda
              </Link>
              <Link className="question-item" to={`/form/register`}>
                Recibir noticias y ofertas como cliente
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

import React, { useContext, useState } from "react";
import { AuthContext } from "../../Index";
import { useNavigate } from "react-router-dom";
import { Animation } from "../Animation/Animation";

export const Info = () => {
  const { user, setIsLogged } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const outSesion = () => {
    setLoading(true);
    localStorage.clear();
    setIsLogged(false);
    setLoading(false);
    navigate("/");
  };

  return (
    <>
      {loading && <Animation></Animation>}
      <div className="form">
        <div className="container">
          <div className="container-form">
            <span className="container-form-title">Perfil de usuario</span>
            <div className="container-form-data">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                readOnly
              />
            </div>
            <div className="container-form-data">
              <label htmlFor="name">Correo</label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.email}
                readOnly
              />
            </div>
            <div className="container-form-data">
              <label htmlFor="name">Rol</label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.rol}
                readOnly
              />
            </div>
            <div className="buttons">
              {user && user.rol == "COMERCIANTE" && (
                <button className="container-form-send edit">Editar</button>
              )}
              <button className="container-form-send close" onClick={outSesion}>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

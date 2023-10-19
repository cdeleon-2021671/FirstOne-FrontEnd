import React, { useContext } from "react";
import { AuthContext } from "../../Index";
import { useNavigate } from "react-router-dom";

export const Info = () => {
  const { user, setUser, setIsLogged, isLogged } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
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
            <button className="container-form-send edit">Editar</button>
            <button
              className="container-form-send close"
              onClick={() => {
                localStorage.clear();
                setIsLogged(false);
                navigate("/");
              }}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

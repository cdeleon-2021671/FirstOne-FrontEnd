import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.scss";
import { AuthContext } from "../../Index";

export const Dashboard = () => {
  const { user } = useContext(AuthContext);
  
  return (
    <div className="dashboard">
      {user && user.name && (
        <Link
          className="dashboard-item"
          to={`/profile/info/${user.name.replace(/[ ]+/g, "-")}/${user.sub}`}
        >
          Perfil
        </Link>
      )}
      <Link className="dashboard-item" to={`/profile/all-stores`}>
        Tiendas
      </Link>
      {user.rol == "COMERCIANTE" ? (
        <Link className="dashboard-item" to={`/profile/all-users`}>
          Empleados
        </Link>
      ) : user.rol == "MAESTRO" ? (
        <Link className="dashboard-item" to={`/profile/all-users`}>
          Usuarios
        </Link>
      ) : null}
    </div>
  );
};

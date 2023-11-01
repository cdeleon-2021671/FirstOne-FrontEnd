import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Index";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Users.scss";

const imgDefautl =
  "https://www.researchgate.net/profile/Maria-Monreal/publication/315108532/figure/fig1/AS:472492935520261@1489662502634/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png";

export const Users = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="info">
      {user && user.rol == "COMERCIANTE" ? (
        <div className="info-title">
          <h2>Todos tus usuarios</h2>
          <Link to="/profile/register/worker">Agregar Trabajador</Link>
        </div>
      ) : (
        user &&
        user.rol == "MAESTRO" && (
          <div className="info-title">
            <h2>Todos los usuarios</h2>
            <Link to="/profile/register/admin">Agregar Administrador</Link>
          </div>
        )
      )}
      {user && <CardUser rol={user.rol} store={user.stores[0]}></CardUser>}
    </div>
  );
};

const CardUser = ({ rol, store }) => {
  const [users, setUsers] = useState(null);

  const getUsers = async (url, headers) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URI_API}/user/${url}`,
        { headers: headers }
      );
      const { users } = data;
      setUsers(users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const url =
      rol == "MAESTRO" || rol == "ADMIN"
        ? "get-all-users"
        : `get-all-workers/${store.storeId}`;
    const headers = {
      "content-types": "aplication/json",
      Authorization: localStorage.getItem("token"),
    };
    getUsers(url, headers);
  }, [rol, store]);

  return (
    <div className="users all">
      <div className="users-header all-content">
        <label></label>
        <label>Nombre</label>
        <label>Correo</label>
        <label>Rol</label>
        <label>Acciones</label>
      </div>
      {users &&
        users.length != 0 &&
        users.map((item, key) => (
          <div className="all-content" id="users-content" key={key}>
            <img src={imgDefautl} alt={item.name} />
            <span>{item.name}</span>
            <span>{item.email}</span>
            <span>{item.rol}</span>
            <div className="users-options">
              <button>Editar</button>
              <button>Eliminar</button>
            </div>
          </div>
        ))}
    </div>
  );
};

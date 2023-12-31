import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Index";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Table.scss";
import "./Stores.scss";
import { Animation } from "../Animation/Animation";

const imgDefautl =
  "https://www.researchgate.net/profile/Maria-Monreal/publication/315108532/figure/fig1/AS:472492935520261@1489662502634/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png";

export const Users = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="info">
      {user && user.rol == "COMERCIANTE" ? (
        <div className="info-title">
          <h2>Todos tus usuarios</h2>
          <Link className="info-title-action" to="/profile/register/worker">
            Agregar Trabajador
          </Link>
        </div>
      ) : (
        user &&
        user.rol == "MAESTRO" && (
          <div className="info-title">
            <h2>Todos los usuarios</h2>
            <Link className="info-title-action" to="/profile/register/admin">
              Agregar Administrador
            </Link>
          </div>
        )
      )}
      {user && <CardUser user={user} store={user.stores[0]}></CardUser>}
    </div>
  );
};

const CardUser = ({ user, store }) => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUsers = async (url, headers) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URI_API}/user/${url}`,
        { headers: headers }
      );
      const { users } = data;
      setUsers(users);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    const url =
      user.rol == "MAESTRO" || user.rol == "ADMIN"
        ? "get-all-users"
        : `get-all-workers/${user.sub}`;
    const headers = {
      "content-types": "aplication/json",
      Authorization: localStorage.getItem("token"),
    };
    getUsers(url, headers);
  }, [user, store]);

  return (
    <>
      {loading && <Animation></Animation>}
      <div className="table all">
        <div className="table-header all-content">
          <label></label>
          <label>Nombre</label>
          <label>Correo</label>
          <label>Rol</label>
          <label>Acciones</label>
        </div>
        {users &&
          users.length != 0 &&
          users.map((item, key) => (
            <div className="all-content" id="table-content" key={key}>
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
    </>
  );
};

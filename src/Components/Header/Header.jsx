import React, { useContext } from "react";
import { Searchbar } from "../Searchbar/Searchbar";
import { AuthContext } from "../../Index";
import { Link } from "react-router-dom";
import {FaUser} from 'react-icons/fa'
import "./Header.scss";

export const Header = ({ setView }) => {
  const { isLogged, user } = useContext(AuthContext);

  return (
    <div className="header">
      <h1 className="header-title">
        <Link title="Página Principal">Tienda.gt</Link>
      </h1>
      <Searchbar></Searchbar>
      {isLogged && user && user.name && user.sub ? (
        <Link
          to={`/profile/info/${user.name.replace(/[ ]+/g, "-")}/${user.sub}`}
          className="header-identify"
        >
          <FaUser></FaUser>Perfil
        </Link>
      ) : (
        <button
          className="header-identify"
          title="Iniciar sesión"
          onClick={() => setView(true)}
        >
          <FaUser></FaUser>
          Únete
        </button>
      )}
    </div>
  );
};
import React, { useContext } from "react";
import { Searchbar } from "../Searchbar/Searchbar";
import { AuthContext } from "../../Index";
import { Link } from "react-router-dom";
import { FaUserCircle, FaUserPlus } from "react-icons/fa";
import "./Header.scss";

export const Header = () => {
  const { isLogged, user } = useContext(AuthContext);

  return (
    <div className={`header ${isLogged ? "logged" : ""}`}>
      <Link title="Página Principal" className="header-title">
        <img src={`https://tienda.gt/Tienda.gt-logo.svg`} alt="Logo" />
        Tienda.gt
      </Link>
      <Searchbar></Searchbar>
      <div className="btnOptions">
        <Link
          className="header-identify"
          title={isLogged ? "Perfil" : "Iniciar sesión"}
          to={
            isLogged ? `/profile/info/${user.email}/${user.sub}` : "/form/login"
          }
        >
          <FaUserCircle></FaUserCircle>
          Mi cuenta
        </Link>
        {!isLogged && (
          <Link
            className="header-identify twoOption"
            title="Regístrate"
            to={"/form/type"}
          >
            <FaUserPlus></FaUserPlus>
            Regístrate
          </Link>
        )}
      </div>
    </div>
  );
};

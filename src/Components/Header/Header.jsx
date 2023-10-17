import React, { useContext, useEffect } from "react";
import { Searchbar } from "../Searchbar/Searchbar";
import { AuthContext } from "../../Index";
import { Link } from "react-router-dom";
import "./Header.scss";

export const Header = ({ setView }) => {
  const { isLogged, user } = useContext(AuthContext);
  
  return (
    <div className="header">
      <h1 className="header-title">
        <Link title="Página Principal">Tienda.gt</Link>
      </h1>
      <Searchbar></Searchbar>
      {isLogged ? (
        <Link
          to={`/profile/info/${user.name.replace(/[ ]+/g, "-")}/${user.sub}`}
          className="header-identify"
        >
          <Icon></Icon>Perfil
        </Link>
      ) : (
        <button
          className="header-identify"
          title="Iniciar sesión"
          onClick={() => setView(true)}
        >
          <Icon></Icon>
          Únete
        </button>
      )}
      <label className="header-gt">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Flag_of_Guatemala.svg"
          alt="GT"
        />
        GT
      </label>
    </div>
  );
};

const Icon = () => {
  return (
    <svg
      fill="none"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fillOpacity={0}
    >
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
};

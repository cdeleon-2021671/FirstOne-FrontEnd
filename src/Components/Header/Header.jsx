import React from "react";
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import "./Header.scss";
import { Searchbar } from "../Search/Searchbar";

export const Header = () => {
  return (
    <div id="header-content">
      <h1>
        <Link to={"/"} title="Página Principal">
          Tienda.gt
        </Link>
      </h1>
      <div className="header-searchbar">
        <Searchbar></Searchbar>
      </div>
      <div className="header-info">
        <img
          src={`https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Flag_of_Guatemala.svg/640px-Flag_of_Guatemala.svg.png`}
          alt="Guatemala"
        />
        <span>GT</span>
      </div>
      <div className="identify">
        <button>
          <label>
            <BsPersonCircle />
          </label>
          Identificate
        </button>
      </div>
    </div>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import "./Header.scss";

export const Header = () => {
  return (
    <div className="headerContainer">
      <div className="menuHeader">
        <FaBars></FaBars>
        <label>Menú</label>
      </div>
      <h1>
        <Link to={"/"}>Tienda.gt</Link>
      </h1>
    </div>
  );
};

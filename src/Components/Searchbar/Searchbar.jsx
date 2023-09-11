import React from "react";
import { FiSearch } from "react-icons/fi";
import "./Searchbar.scss";

export const Searchbar = () => {
  return (
    <div className="searchbarContainer">
      <label htmlFor="mySearchbar">
        <FiSearch></FiSearch>
      </label>
      <input type="text" id="mySearchbar" placeholder="Estás buscando..." />
    </div>
  );
};

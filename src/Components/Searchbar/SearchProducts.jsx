import React from "react";
import "./SearchProducts.scss";

export const SearchProducts = () => {
  return (
    <div className="search-products">
      <div className="search-products-content">
        <Icon></Icon>
        <input
          id="searchbar-products"
          type="text"
          autoComplete="off"
          placeholder="Estoy buscando..."
        />
      </div>
    </div>
  );
};

const Icon = () => {
  return (
    <label htmlFor="searchbar-products">
      <svg
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        fillOpacity="0"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path d="M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z" />
        <path d="M16 16l3 3" />
      </svg>
    </label>
  );
};

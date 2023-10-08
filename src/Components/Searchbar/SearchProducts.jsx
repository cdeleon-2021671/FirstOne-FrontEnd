import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Fuse from "fuse.js";
import "./SearchProducts.scss";

export const SearchProducts = ({ original, setOriginal, action }) => {
  const [search, setSearch] = useState("");
  const location = useLocation();

  const searchProducts = (value) => {
    const fuse = new Fuse(original, {
      ignoreLocation: true,
      distance: 0,
      threshold: 0.5,
      keys: ["name", "tags", "description"],
    });
    const result = Array.from(fuse.search(value));
    const filters = result.map(({ item }) => item);
    if (filters.length == 0) {
      setOriginal(original);
    } else setOriginal(filters);
  };
  
  const searchCategories = (value) => {
    const fuse = new Fuse(original, {
      ignoreLocation: true,
      distance: 0,
      threshold: 0.5,
      keys: ["product.name", "tag", "product.tags"],
    });
    const result = Array.from(fuse.search(value));
    const filters = result.map(({ item }) => item);
    if (filters.length == 0) {
      setOriginal(original);
    } else setOriginal(filters);
  };

  const searchStores = (value) => {
    const fuse = new Fuse(original, {
      ignoreLocation: true,
      distance: 0,
      threshold: 0.5,
      keys: ["store.name", "store.description"],
    });
    const result = Array.from(fuse.search(value));
    const filters = result.map(({ item }) => item);
    if (filters.length == 0) {
      setOriginal(original);
    } else setOriginal(filters);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (action == "products") {
      searchProducts(value);
    } else if (action == "categories") {
      searchCategories(value);
    } else if (action == "stores") {
      searchStores(value);
    }
  };

  useEffect(() => {
    setSearch("");
  }, [location]);

  return (
    <div className="search-products">
      <div className="search-products-content">
        <Icon></Icon>
        <input
          id="searchbar-products"
          type="text"
          autoComplete="off"
          placeholder="Estoy buscando..."
          value={search}
          onChange={handleChange}
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

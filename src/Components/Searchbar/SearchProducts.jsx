import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Fuse from "fuse.js";
import { GoSearch } from "react-icons/go";
import "./SearchProducts.scss";

export const SearchProducts = ({ original, setOriginal, action }) => {
  const [search, setSearch] = useState("");
  const location = useLocation();

  const searchCategories = (value) => {
    const fuse = new Fuse(original, {
      ignoreLocation: true,
      location: 0,
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
      location: 0,
      distance: 0,
      threshold: 0.3,
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
    if (action == "categories") {
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
        <label htmlFor="searchbar-products">
          <GoSearch></GoSearch>
        </label>
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

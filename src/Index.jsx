import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Components/Utilities";

export const AuthContext = createContext();
export const Index = () => {
  const [stores, setStores] = useState(null);
  const [tags, setTags] = useState(null);
  const [products, setProducts] = useState(null);

  const getStores = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URI_API}/store/get-stores`
      );
      const { stores } = data;
      setStores(stores);
    } catch (err) {
      console.log(err);
    }
  };

  const getProductsOfTags = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URI_API}/product/get-products-of-fags`
      );
      const { allTags } = data;
      setTags(allTags);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URI_API}/product/get-all-products`
      );
      const { products } = data;
      setProducts(products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStores();
    getProductsOfTags();
    getAllProducts();
  }, []);

  return (
    <>
      {stores && products && tags ? (
        <AuthContext.Provider value={{ stores, tags, products }}>
          <RouterProvider router={routes} />
        </AuthContext.Provider>
      ) : (
        <div>Cargando...</div>
      )}
    </>
  );
};

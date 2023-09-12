import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { RouterProvider } from "react-router-dom";
import { routes, socialLinks } from "./Components/Utilities";
import { Animation } from "./Components/Animation/Animation";

export const AuthContext = createContext();
export const Index = () => {
  const [stores, setStores] = useState(null);
  const [tags, setTags] = useState(null);
  const [products, setProducts] = useState(null);
  const [autoComplete, setAutoComplete] = useState(null);

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

  const getOptions = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URI_API}/product/get-options`
      );
      const { result } = data;
      setAutoComplete(result);
    } catch (err) {
      console.log(err);
    }
  };

  const getProductsOfTags = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URI_API}/product/get-products-of-fags`
      );
      const { result } = data;
      setTags(result);
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
    getOptions();
  }, []);

  return (
    <>
      {stores && products && tags && autoComplete ? (
        <AuthContext.Provider
          value={{ stores, tags, products, autoComplete, socialLinks }}
        >
          <RouterProvider router={routes} />
        </AuthContext.Provider>
      ) : (
        <Animation></Animation>
      )}
    </>
  );
};

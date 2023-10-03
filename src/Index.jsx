import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { RouterProvider } from "react-router-dom";
import { routes, socialLinks } from "./Components/Utilities";
import { Animation } from "./Components/Animation/Animation";

export const AuthContext = createContext();
export const Index = () => {
  const [stores, setStores] = useState(null);
  const [tags, setTags] = useState(null);
  const [offers, setOffers] = useState(null);
  const [products, setProducts] = useState(null);
  const [autoComplete, setAutoComplete] = useState(null);
  const [randomCategories, setRandomCategories] = useState([]);
  const [mostViewed, setMostViewed] = useState(null);

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

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URI_API}/product/get-products-of-tags`
      );
      const { result } = data;
      const newCategories = [];
      while (true) {
        if (newCategories.length == result.length) break;
        const random = Math.floor(Math.random() * result.length);
        const product = result[random];
        if (newCategories.includes(product) == false)
          newCategories.push(result[random]);
      }
      setTags(result);
      setRandomCategories(newCategories);
    } catch (err) {
      console.log(err);
    }
  };

  const getOffers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URI_API}/product/get-all-offers`
      );
      const { allOffers } = data;
      setOffers(allOffers);
    } catch (err) {
      console.log(err);
    }
  };

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URI_API}/product/get-all-products`
      );
      const { allProducts } = data;
      setProducts(allProducts);
    } catch (err) {
      console.log(err);
    }
  };
  
  const getMostViewed = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URI_API}/product/get-most-viewed`
      );
      const { products } = data;
      setMostViewed(products);
    } catch (err) {
      console.log(err);
    }
  };

  const getAutoComplete = async () => {
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

  useEffect(() => {
    getStores();
    getCategories();
    getOffers();
    getProducts();
    getAutoComplete();
    getMostViewed()
  }, []);

  return (
    <>
      {stores && tags && offers && products && autoComplete ? (
        <AuthContext.Provider
          value={{
            stores,
            tags,
            offers,
            products,
            socialLinks,
            autoComplete,
            randomCategories,
            mostViewed
          }}
        >
          <RouterProvider router={routes} />
        </AuthContext.Provider>
      ) : (
        <Animation></Animation>
      )}
    </>
  );
};

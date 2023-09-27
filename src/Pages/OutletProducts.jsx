import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Searchbar } from "../Components/Search/Searchbar";
import { ProductsCard } from "../Components/Search/ProductsCard";
import { AuthContext } from "../Index";
import { Animation } from "../Components/Animation/Animation";

export const OutletProducts = () => {
  const location = useLocation();
  const { offers, products } = useContext(AuthContext);
  const { category, storeId, store, search } = useParams();
  const [options, setOptions] = useState(null);
  const [array, setArray] = useState();
  const [filter, setFilter] = useState("");

  const getProductsByTag = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URI_API}/product/get-products-by-tag`,
        { tag: category }
      );
      const { products } = data;
      setArray(products);
      getAutoComplete(products);
    } catch (err) {
      console.log(err);
    }
  };

  const getProductsByStoreTag = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URI_API}/product/get-products-by-store-tag`,
        { tag: category, storeId: storeId }
      );
      const { products } = data;
      setArray(products);
      getAutoComplete(products);
    } catch (err) {
      console.log(err);
    }
  };

  const getOffers = () => {
    const allOffers = [];
    offers.forEach((element) => {
      if (element.storeId._id == storeId) allOffers.push(element);
    });
    setArray(allOffers);
    getAutoComplete(allOffers);
  };

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_URI_API
        }/product/get-products-by-store/${storeId}`
      );
      const { products } = data;
      setArray(products);
      getAutoComplete(products);
    } catch (err) {
      console.log(err);
    }
  };

  const searchProducts = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URI_API}/product/search-products`,
        { search: search }
      );
      const { result } = data;
      if (result.length === 0) {
        setArray(products);
        getAutoComplete(products);
      } else {
        setArray(result);
        getAutoComplete(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAutoComplete = (newOptions) => {
    let allTags = [];
    newOptions.forEach(({ tags }) => {
      tags.forEach((element) => {
        const tag = element.replace("#", "");
        if (element != "Home" && tag != category && tag != search)
          allTags.push(tag);
      });
    });
    allTags = Array.from(new Set(allTags));
    if (allTags.length > 3) {
      const result = [];
      while (result.length < 3) {
        const number = Math.floor(Math.random() * allTags.length);
        if (result.includes(allTags[number]) == false) {
          result.push(allTags[number]);
        }
      }
      setOptions(result);
    } else setOptions(allTags);
  };

  useEffect(() => {
    if (category && !storeId && !store) {
      // Ver productos de una categoria
      getProductsByTag();
      setFilter(category);
    } else if (category && store && storeId) {
      // Ver productos de una categoria en tienda especifica
      getProductsByStoreTag();
      setFilter(category);
    } else if (location.pathname == "/all-offers-in-store") {
      // Ver todas las ofertas
      setArray(offers);
      getAutoComplete(offers);
      setFilter("Ofertas");
    } else if (location.pathname == "/all-products-in-store") {
      // Ver todos los productos
      setArray(products);
      getAutoComplete(products);
      setFilter("Todos los productos");
    } else if (location.pathname.includes(`/products/${storeId}`)) {
      // Ver productos de una tienda en especifico
      console.log(location.pathname);
      getProducts();
      setFilter(`Productos ${store}`);
    } else if (location.pathname.includes(`/offers/${storeId}`)) {
      // Ver ofertas de una tienda en especifico
      getOffers();
      setFilter(`Ofertas ${store}`);
    } else if (search) {
      setArray(null);
      searchProducts();
      setFilter(search);
    }
  }, [location]);

  return (
    <>
      {array && options ? (
        <div id="outlet-products-container">
          <Searchbar filter={filter} />
          <ProductsCard
            products={array}
            category={category}
            tags={options}
          ></ProductsCard>
        </div>
      ) : (
        <Animation></Animation>
      )}
    </>
  );
};

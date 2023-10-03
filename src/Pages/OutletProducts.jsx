import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ResultsCard } from "../Components/Products/ResultsCard";
import { AuthContext } from "../Index";
import axios from "axios";
import { Animation } from "../Components/Animation/Animation";

export const OutletProducts = () => {
  const location = useLocation();
  const { category, store, storeId, search } = useParams();
  const { products, offers, mostViewed } = useContext(AuthContext);
  const [boxes, setBoxes] = useState(Array.from(products));

  const getProductsByCategory = async () => {
    try {
      const tag = category.replace(/[-]+/g, " ");
      const { data } = await axios.post(
        `${import.meta.env.VITE_URI_API}/product/get-products-by-tag`,
        { tag: tag }
      );
      const { products } = data;
      setBoxes(products);
    } catch (err) {
      console.log(err);
    }
  };

  const getProductsByStore = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_URI_API
        }/product/get-products-by-store/${storeId}`
      );
      const { products } = data;
      setBoxes(products);
    } catch (err) {
      console.log(err);
    }
  };

  const getOffersByStore = async () => {
    if (offers) {
      const products = offers.filter((item) => {
        const { _id } = item.storeId;
        if (_id == storeId) return item;
      });
      setBoxes(products);
    }
  };

  const getSearching = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URI_API}/product/search-products`,
        { search: search }
      );
      const { result } = data;
      setBoxes(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (category) {
      getProductsByCategory();
    } else if (location.pathname == `/${store}/products/${storeId}`) {
      getProductsByStore();
    } else if (location.pathname == `/${store}/offers/${storeId}`) {
      getOffersByStore();
    } else if (location.pathname == "/all-products-in-store") {
      setBoxes(Array.from(products));
    } else if (location.pathname == "/all-offers-in-store") {
      setBoxes(Array.from(offers));
    } else if (location.pathname == "/most-viewed") {
      setBoxes(Array.from(mostViewed));
    } else if (search) {
      getSearching();
    }
  }, [location]);

  return (
    <>
      {products ? <ResultsCard products={boxes}></ResultsCard> : <Animation />}
    </>
  );
};

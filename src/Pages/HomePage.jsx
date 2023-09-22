import React, { useState, useContext, useEffect } from "react";
import { Introduction } from "../Components/HomePage/Introduction";
import { Categories } from "../Components/Categories/Categories";
import { Products } from "../Components/Products/Products";
import { Searchbar } from "../Components/Search/Searchbar";
import { GoToLink } from "../Components/GoToLink/GoToLink";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../Index";
import { v4 } from "uuid";
import $ from "jquery";

export const HomePage = () => {
  const location = useLocation();
  const { randomCategories, offers, products } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allOffers, setAllOffers] = useState([]);

  const getProducts = () => {
    const newProducts = Array.from(products);
    if (products.length > 40) newProducts.length = 40;
    setAllProducts(newProducts);
  };

  const getOffers = () => {
    const newOffers = Array.from(offers);
    if (products.length > 40) newOffers.length = 40;
    setAllOffers(newOffers);
  };

  const getMyCategories = () => {
    if (randomCategories.length >= 16) {
      const newCategories = Array.from(randomCategories);
      const containerWidth = window.innerWidth;
      if (containerWidth >= 550 && containerWidth <= 800) {
        if (randomCategories.length >= 18) newCategories.length = 18;
        setCategories(newCategories);
      } else {
        if (randomCategories.length >= 16) newCategories.length = 16;
        setCategories(newCategories);
      }
    } else {
      setCategories(randomCategories);
    }
  };

  const getCategoriesBySize = () => {
    $(window).on("resize", getMyCategories);
  };

  useEffect(() => {
    getMyCategories();
    getCategoriesBySize();
    return () => {
      $(window).off("resize");
    };
  }, [randomCategories]);

  useEffect(() => {
    getProducts();
  }, [products]);

  useEffect(() => {
    getOffers();
  }, [offers]);

  return (
    <div id="margin-padding-container">
      <Introduction></Introduction>
      <Searchbar></Searchbar>
      <Categories tags={categories} url={"products"}></Categories>
      <div style={{ marginTop: "1em" }}>
        <GoToLink url="/all-categories"></GoToLink>
      </div>
      {allOffers.length !== 0 && (
        <>
          <Products
            products={allOffers}
            title={"Ofertas"}
            classRight={v4()}
            classLeft={v4()}
          ></Products>
          <GoToLink url="/products/offers"></GoToLink>
        </>
      )}
      {allProducts.length !== 0 && (
        <>
          <Products
            products={allProducts}
            title={"Populares"}
            classRight={v4()}
            classLeft={v4()}
          ></Products>
          <GoToLink url="/products/all"></GoToLink>
        </>
      )}
    </div>
  );
};

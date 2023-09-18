import React, { useState, useContext, useEffect } from "react";
import { Introduction } from "../Components/HomePage/Introduction";
import { Categories } from "../Components/Categories/Categories";
import { Products } from "../Components/Products/Products";
import { Searchbar } from "../Components/Search/Searchbar";
import { GoToLink } from "../Components/GoToLink/GoToLink";
import { AuthContext } from "../Index";
import { v4 } from "uuid";

export const HomePage = () => {
  const { tags, offers, products } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allOffers, setAllOffers] = useState([]);

  const getNewCategories = () => {
    const newCategories = [];
    while (true) {
      if (newCategories.length == 16) break;
      const random = Math.floor(Math.random() * tags.length);
      const product = tags[random];
      if (newCategories.includes(product) == false)
        newCategories.push(tags[random]);
    }
    setCategories(newCategories);
  };

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

  useEffect(() => {
    if (tags.length >= 16) {
      getNewCategories();
    } else {
      setCategories(tags);
    }
  }, [tags]);

  useEffect(() => {
    getProducts();
  }, [products]);

  useEffect(() => {
    getOffers();
  }, [offers]);

  return (
    <>
      <Introduction></Introduction>
      <Searchbar></Searchbar>
      <Categories tags={categories} url={"products"}></Categories>
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
    </>
  );
};

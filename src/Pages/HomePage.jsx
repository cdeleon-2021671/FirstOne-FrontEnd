import React, { useState, useContext, useEffect } from "react";
import { Introduction } from "../Components/HomePage/Introduction";
import { Categories } from "../Components/Categories/Categories";
import { Products } from "../Components/Products/Products";
import { Searchbar } from "../Components/Search/Searchbar";
import { GoToLink } from "../Components/GoToLink/GoToLink";
import { BuyInformation } from "../Components/HomePage/BuyInformation";
import { AuthContext } from "../Index";
import { Helmet } from "react-helmet";
import $ from "jquery";

export const HomePage = () => {
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
      if (containerWidth > 1000) {
        if (randomCategories.length >= 20) newCategories.length = 20;
        setCategories(newCategories);
      } else if (containerWidth <= 800) {
        if (randomCategories.length >= 12) newCategories.length = 12;
        setCategories(newCategories);
      } else if (containerWidth < 1000) {
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
    <div className="padding-container">
      <Helmet>
        <title>Tienda.gt</title>
        <meta
          name="description"
          content="Tienda para toda guatemala en donde puede encontrar
    productos tanto para hombre como para mujer"
        />
        <meta
          name="keywords"
          content="guatemala, online, compras, ofertas, accesorios, ropa, mujer, hombre, calidad"
        />
        <link rel="canonical" href="https://tienda.gt" />
      </Helmet>
      <Introduction></Introduction>
      <BuyInformation></BuyInformation>
      {window.innerWidth <= 500 && <Searchbar></Searchbar>}
      {categories && (
        <>
          <Categories tags={categories}></Categories> <br />
          <GoToLink url="all-categories"></GoToLink>
        </>
      )}
      {allOffers && allOffers.length !== 0 && (
        <>
          <Products products={allOffers} title={"Ofertas"} />
          <GoToLink url="all-offers-in-store"></GoToLink>
        </>
      )}
      {allProducts && allProducts.length !== 0 && (
        <>
          <Products products={allProducts} title={"Populares"} />
          <GoToLink url="all-products-in-store"></GoToLink>
        </>
      )}
    </div>
  );
};

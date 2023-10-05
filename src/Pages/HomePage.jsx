import React, { useContext, useEffect, useState } from "react";
import { Introduction } from "../Components/HomePage/Introduction";
import { Toolbar } from "../Components/HomePage/Toolbar";
import { Categories } from "../Components/Categories/Categories";
import { Carrusel } from "../Components/Products/Carrusel";
import { AuthContext } from "../Index";
import $ from "jquery";
import { Animation } from "../Components/Animation/Animation";
import { GoToLink } from "../Components/GoToLink/GoToLink";

export const HomePage = () => {
  const { randomCategories, products, offers } = useContext(AuthContext);
  const [categories, setCategories] = useState(Array.from(randomCategories));
  const [popular, setPopular] = useState(Array.from(products));
  const [newOffers, setNewOffers] = useState(Array.from(offers));

  const resizeWindow = () => {
    const newCategories = Array.from(randomCategories);
    const { innerWidth } = window;
    if (innerWidth > 1000) {
      if (newCategories.length > 20) newCategories.length = 20;
      setCategories(newCategories);
    } else if (innerWidth > 730) {
      if (newCategories.length > 16) newCategories.length = 16;
      setCategories(newCategories);
    } else {
      if (newCategories.length > 12) newCategories.length = 12;
      setCategories(newCategories);
    }
  };

  const getPopular = () => {
    if (products.length > 40) products.length = 40;
    if (offers.length > 40) offers.length = 40;
  };

  useEffect(() => {
    resizeWindow();
    getPopular();
    $(window).on("resize", resizeWindow);
    return () => {
      $(window).off("resize");
    };
  }, []);

  return (
    <>
      {randomCategories && offers && products && popular ? (
        <div className="padding-container">
          <Introduction></Introduction>
          <Toolbar></Toolbar>
          <Categories categories={categories}></Categories>
          <Carrusel products={popular} title="Destacados"></Carrusel>
          <GoToLink url="/"></GoToLink>
          <Carrusel products={newOffers} title="Ofertas"></Carrusel>
          <GoToLink url="/all-offers-in-store"></GoToLink>
          <Carrusel products={popular} title="Populares"></Carrusel>
          <GoToLink url="/gt/products-results/all"></GoToLink>
        </div>
      ) : (
        <Animation></Animation>
      )}
    </>
  );
};

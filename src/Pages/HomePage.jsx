import React, { useContext, useEffect, useState } from "react";
import { Categories } from "../Components/Categories/Categories";
import { GoToLink } from "../Components/GoToLink/GoToLink";
import { Carrusel } from "../Components/Products/Carrusel";
import { Toolbar } from "../Components/HomePage/Toolbar";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Index";
import $ from "jquery";

export const HomePage = () => {
  const { tags, mostViewed, offers, trending } = useContext(AuthContext);
  const [categories, setCategories] = useState(null);
  const [randomCategries, setRandomCategories] = useState(null);
  const [newTrending, setNewTrending] = useState(null);
  const [popular, setPopular] = useState(null);
  const [newOffers, setNewOffers] = useState(null);

  const resizeWindow = (array) => {
    if (array && array.length != 0) {
      let newCategories = Array.from(array);
      const { innerWidth } = window;
      if (innerWidth > 1000) {
        if (newCategories.length > 20) newCategories.length = 20;
      } else if (innerWidth > 730) {
        if (newCategories.length > 16) newCategories.length = 16;
      } else {
        if (newCategories.length > 12) newCategories.length = 12;
      }
      setCategories(newCategories);
    }
  };

  const getRandomCategories = () => {
    const newCategories = [];
    while (true) {
      if (newCategories.length == tags.length) break;
      const random = Math.floor(Math.random() * tags.length);
      const product = tags[random];
      if (newCategories.includes(product) == false)
        newCategories.push(tags[random]);
    }
    setCategories(newCategories);
    setRandomCategories(newCategories);
  };

  useEffect(() => {
    if (tags) getRandomCategories();
  }, [tags]);

  useEffect(() => {
    resizeWindow(randomCategries);
    $(window).on("resize", () => {
      resizeWindow(randomCategries);
    });
    return () => {
      $(window).off("resize");
    };
  }, [randomCategries]);

  useEffect(() => {
    if (mostViewed) {
      const array = Array.from(mostViewed);
      if (array && array.length > 40) array.length = 40;
      setPopular(array);
    }
  }, [mostViewed]);

  useEffect(() => {
    if (offers) {
      const array = Array.from(offers);
      if (array && array.length > 40) array.length = 40;
      setNewOffers(array);
    }
  }, [offers]);

  useEffect(() => {
    if (trending) {
      const array = Array.from(trending);
      if (array && array.length > 40) array.length = 40;
      setNewTrending(array);
    }
  }, [trending]);

  return (
    <>
      <Helmet>
        <title>Tienda.gt - Inicio</title>
        <meta
          name="description"
          content="Descubre nuestra tienda en línea, tu destino para encontrar una amplia gama de productos
          de alta calidad. Explora nuestra selección cuidadosamente curada que incluye ropa, accesorios,
          electrónicos y mucho más. Con un enfoque en la calidad y la satisfacción del cliente,
          nuestra tienda te ofrece una experiencia de compra conveniente y confiable.
          Encuentra los productos que necesitas y descubre nuestras ofertas especiales mientras
          exploras nuestro catálogo en constante crecimiento. ¡Bienvenido a tu tienda de confianza para
          todas tus necesidades de compras en línea. No te lo pierdas!"
        />
        <link rel="canonical" href="https://tienda.gt" />
      </Helmet>
      <div className="padding-container">
        <Toolbar></Toolbar>
        <Categories categories={categories}></Categories>
        <Carrusel products={newTrending} title="🔥 Trending"></Carrusel>
        {newTrending && newTrending.length !== 0 && (
          <GoToLink url="/trending-48-hours"></GoToLink>
        )}
        <Carrusel products={newOffers} title="Ofertas"></Carrusel>
        {newOffers && newOffers.length !== 0 && (
          <GoToLink url="/all-offers-in-store"></GoToLink>
        )}
        <Carrusel products={popular} title="Populares"></Carrusel>
        {popular && popular.length !== 0 && (
          <GoToLink url="/all-popular-in-store"></GoToLink>
        )}
      </div>
    </>
  );
};

import React, { useContext, useEffect, useState } from "react";
import { Introduction } from "../Components/HomePage/Introduction";
import { Categories } from "../Components/Categories/Categories";
import { Animation } from "../Components/Animation/Animation";
import { GoToLink } from "../Components/GoToLink/GoToLink";
import { Carrusel } from "../Components/Products/Carrusel";
import { Toolbar } from "../Components/HomePage/Toolbar";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Index";
import $ from "jquery";

export const HomePage = () => {
  const { tags, mostViewed, offers } = useContext(AuthContext);
  const [categories, setCategories] = useState(null);
  const [popular, setPopular] = useState(
    mostViewed ? Array.from(mostViewed) : null
  );
  const [newOffers, setNewOffers] = useState(
    offers ? Array.from(offers) : null
  );

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
    resizeWindow(newCategories);
  };

  const resizeWindow = (tags) => {
    const newCategories = categories
      ? Array.from(categories)
      : Array.from(tags);
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

  const getProducts = () => {
    if (popular && popular.length > 40) popular.length = 40;
    if (newOffers && newOffers.length > 40) newOffers.length = 40;
  };

  const detectAdBlock = async () => {
    try {
      const FingerPrint = await import("fingerprintjs2");
      FingerPrint.get((res) => {
        const values = res.map((item) => item.value);
        const id = FingerPrint.x64hash128(values.join(""), 31);
        console.log(id);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRandomCategories();
    getProducts();
    detectAdBlock();
    $(window).on("resize", resizeWindow);
    return () => {
      $(window).off("resize");
    };
  }, []);

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
      {categories && offers && mostViewed && popular ? (
        <div className="padding-container">
          <Introduction></Introduction>
          <Toolbar></Toolbar>
          <Categories categories={categories}></Categories>
          <Carrusel products={popular} title="Destacados"></Carrusel>
          {popular && popular.length !== 0 && <GoToLink url="/"></GoToLink>}
          <Carrusel products={newOffers} title="Ofertas"></Carrusel>
          {newOffers && newOffers.length !== 0 && (
            <GoToLink url="/all-offers-in-store"></GoToLink>
          )}
          <Carrusel products={popular} title="Populares"></Carrusel>
          {popular && popular.length !== 0 && (
            <GoToLink url="/all-popular-in-store"></GoToLink>
          )}
        </div>
      ) : (
        <Animation></Animation>
      )}
    </>
  );
};

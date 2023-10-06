import React, { useContext, useEffect, useState } from "react";
import { Introduction } from "../Components/StorePage/Introduction";
import { Categories } from "../Components/Categories/Categories";
import { Animation } from "../Components/Animation/Animation";
import { Carrusel } from "../Components/Products/Carrusel";
import { GoToLink } from "../Components/GoToLink/GoToLink";
import { Banner } from "../Components/StorePage/Banner";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Index";
import axios from "axios";

export const StorePage = () => {
  const [categories, setCategories] = useState(null);
  const [newOffers, setNewOffers] = useState(null);
  const { tags, offers } = useContext(AuthContext);
  const [products, setProducts] = useState(null);
  const [store, setStore] = useState(null);
  const { storeId } = useParams();

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_URI_API
        }/product/get-products-by-store/${storeId}`
      );
      const { products } = data;
      const newProducts = Array.from(products);
      if (products.length > 40) newProducts.length = 40;
      setProducts(newProducts);
      setStore(newProducts[0].storeId);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const allOffers = [];
    offers.forEach((element) => {
      if (element.storeId._id == storeId) allOffers.push(element);
    });
    if (allOffers.length > 40) allOffers.length = 40;
    setNewOffers(allOffers);
  }, [offers]);

  useEffect(() => {
    const newCategories = [];
    tags.forEach((element) => {
      if (element.product.storeId._id == storeId) newCategories.push(element);
    });
    setCategories(newCategories);
  }, [tags]);

  return (
    <>
      {tags && storeId && store && categories && products && newOffers ? (
        <>
          <Helmet>
            <title>Tienda.gt - {store.name}</title>
            <meta
              name="description"
              content={`Explora la tienda de ${store.name}, el lugar perfecto para descubrir una amplia variedad
              de productos de alta calidad. ${store.name} se enorgullece de ofrecer una cuidadosa selección de artículos
              con un enfoque inquebrantable en la calidad y la satisfacción del cliente, esta tienda ofrece una 
              experiencia de compra en línea confiable y conveniente. Encuentra productos excepcionales y 
              aprovecha las ofertas especiales mientras navegas por el catálogo en constante expansión. 
              Bienvenido a la tienda de ${store.name}, donde tus necesidades de compra en línea son nuestra principal
              prioridad.`}
            />
            <link
              rel="canonical"
              href={`https://tienda.gt/${store}/${storeId}`}
            />
          </Helmet>
          <div
            id="store-page-container"
            itemscope
            itemtype="https://schema.org/Store"
          >
            {store && store.length !== 0 && (
              <Introduction {...store}></Introduction>
            )}
            <Categories
              categories={categories}
              url={`/${store.name.replace(/[ ]+/g, "-")}/${store._id}`}
            ></Categories>
            <Carrusel products={newOffers} title={"Destacados"}></Carrusel>
            <GoToLink></GoToLink>
            <Carrusel products={newOffers} title={"Ofertas"}></Carrusel>
            <GoToLink
              url={`/${store.name.replace(/[ ]+/g, "-")}/offers/${storeId}`}
            ></GoToLink>
            <Carrusel products={products} title={"Populares"}></Carrusel>
            <GoToLink
              url={`/${store.name.replace(/[ ]+/g, "-")}/products/${storeId}`}
            ></GoToLink>
            <Banner {...store}></Banner>
          </div>
        </>
      ) : (
        <Animation></Animation>
      )}
    </>
  );
};

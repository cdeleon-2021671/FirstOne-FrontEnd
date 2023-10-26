import React, { useEffect, useState } from "react";
import { Introduction } from "../Components/StorePage/Introduction";
import { Categories } from "../Components/Categories/Categories";
import { Animation } from "../Components/Animation/Animation";
import { Carrusel } from "../Components/Products/Carrusel";
import { GoToLink } from "../Components/GoToLink/GoToLink";
import { Banner } from "../Components/StorePage/Banner";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";

export const StorePage = () => {
  const [categories, setCategories] = useState(null);
  const [newOffers, setNewOffers] = useState(null);
  const [tags, setTags] = useState(null);
  const [offers, setOffers] = useState(null);
  const [mostViewed, setMostViewed] = useState(null);
  const [stores, setStores] = useState(null);
  const [popular, setPopular] = useState(null);
  const [store, setStore] = useState(null);
  const { storeId } = useParams();

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URI_API}/product/get-products-of-tags`
      );
      const { result } = data;
      setTags(result);
    } catch (err) {
      console.log(err);
    }
  };

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

  useEffect(() => {
    getStores();
    getOffers();
    getMostViewed();
    getCategories();
  }, []);

  useEffect(() => {
    if (stores) {
      const newStore = [];
      stores.forEach((element) => {
        const { store } = element;
        if (store._id == storeId) newStore.push(store);
      });
      setStore(newStore[0]);
    }
  }, [stores]);

  useEffect(() => {
    if (mostViewed) {
      const newPopular = [];
      mostViewed.forEach((element) => {
        const { _id } = element.storeId;
        if (storeId == _id) newPopular.push(element);
      });
      if (newPopular.length > 40) newPopular.length = 40;
      setPopular(newPopular);
    }
  }, [mostViewed]);

  useEffect(() => {
    if (offers) {
      const allOffers = [];
      offers.forEach((element) => {
        if (element.storeId._id == storeId) allOffers.push(element);
      });
      if (allOffers.length > 40) allOffers.length = 40;
      setNewOffers(allOffers);
    }
  }, [offers]);

  useEffect(() => {
    if (tags) {
      const newCategories = [];
      tags.forEach((element) => {
        if (element.product.storeId._id == storeId) newCategories.push(element);
      });
      setCategories(newCategories);
    }
  }, [tags]);

  return (
    <>
      {tags &&
      store &&
      store.length !== 0 &&
      categories &&
      popular &&
      newOffers ? (
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
            <Introduction {...store}></Introduction>
            <Categories
              categories={categories}
              url={`/${store.name.replace(/[ ]+/g, "-")}/${store._id}`}
            ></Categories>
            <Carrusel products={popular} title={"Destacados"}></Carrusel>
            <GoToLink></GoToLink>
            <Carrusel products={newOffers} title={"Ofertas"}></Carrusel>
            <GoToLink
              url={`/${store.name.replace(/[ ]+/g, "-")}/offers/${storeId}`}
            ></GoToLink>
            <Carrusel products={popular} title={"Populares"}></Carrusel>
            <GoToLink
              url={`/${store.name.replace(/[ ]+/g, "-")}/popular/${storeId}`}
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

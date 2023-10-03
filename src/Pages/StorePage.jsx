import React, { useContext, useEffect, useState } from "react";
import { Searchbar } from "../Components/Searchbar/Searchbar";
import { Introduction } from "../Components/StorePage/Introduction";
import { useParams } from "react-router-dom";
import { Categories } from "../Components/Categories/Categories";
import { Carrusel } from "../Components/Products/Carrusel";
import { Animation } from "../Components/Animation/Animation";
import { AuthContext } from "../Index";
import axios from "axios";
import { Banner } from "../Components/StorePage/Banner";
import { Helmet } from "react-helmet-async";
import { GoToLink } from "../Components/GoToLink/GoToLink";

export const StorePage = () => {
  const { tags, offers } = useContext(AuthContext);
  const { storeId } = useParams();
  const [categories, setCategories] = useState(null);
  const [store, setStore] = useState(null);
  const [newOffers, setNewOffers] = useState(null);
  const [products, setProducts] = useState(null);

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
        <div
          id="store-page-container"
          itemscope
          itemtype="https://schema.org/Store"
        >
          <Helmet>
            <title>Tienda.gt - {store.name}</title>
            <meta
              name="description"
              content={`En Tienda.gt contamos con productos de ${store.name} de excelente calidad. ${store.description}`}
            />
            <link
              rel="canonical"
              href={`https://tienda.gt/${store.name}/${store._id}`}
            />
          </Helmet>
          {store.length !== 0 && <Introduction {...store}></Introduction>}
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
      ) : (
        <Animation></Animation>
      )}
    </>
  );
};

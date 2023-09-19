import React, { useContext, useEffect, useState } from "react";
import { Searchbar } from "../Components/Search/Searchbar";
import { Introduction } from "../Components/StorePage/Introduction";
import { useParams } from "react-router-dom";
import { Categories } from "../Components/Categories/Categories";
import { Products } from "../Components/Products/Products";
import { Animation } from "../Components/Animation/Animation";
import { GoToLink } from "../Components/GoToLink/GoToLink";
import { AuthContext } from "../Index";
import axios from "axios";
import { v4 } from "uuid";

export const StorePage = () => {
  const { tags, offers } = useContext(AuthContext);
  const { storeId } = useParams("");
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
        <>
          <Searchbar filter={store.name}></Searchbar>
          {store.length !== 0 && <Introduction {...store}></Introduction>}
          <Categories
            tags={categories}
            url={`store/${store.name}/${storeId}`}
          ></Categories>
          {newOffers && newOffers.length != 0 && (
            <>
              <Products
                classRight={v4()}
                classLeft={v4()}
                products={newOffers}
                title={"Ofertas"}
              ></Products>
              <GoToLink url={`/${store.name}/offers/${storeId}`}></GoToLink>
            </>
          )}
          {products.length !== 0 && (
            <>
              <Products
                classRight={v4()}
                classLeft={v4()}
                products={products}
                title={"Populares"}
              ></Products>
              <GoToLink url={`/${store.name}/products/${storeId}`}></GoToLink>
            </>
          )}
          <Banner {...store}></Banner>
        </>
      ) : (
        <Animation></Animation>
      )}
    </>
  );
};

const Banner = ({ banner, urlStore }) => {
  return (
    <div
      id="banner"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      <GoToLink
        url={urlStore}
        mode="_blank"
        title="Explora toda la tienda"
      ></GoToLink>
    </div>
  );
};

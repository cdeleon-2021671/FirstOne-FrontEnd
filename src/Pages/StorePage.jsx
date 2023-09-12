import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Searchbar } from "../Components/Searchbar/Searchbar";
import { AuthContext } from "../Index";
import { ProductsCard } from "../Components/Products/ProductsCard";
import { StoreIntroduction } from "../Components/Introduction/StoreIntroduction";
import { Categories } from "../Components/Categories/Categories";
import { Animation } from "../Components/Animation/Animation";

export const StorePage = () => {
  const { tags } = useContext(AuthContext);
  const { store } = useParams();
  const [infoStore, setInfoStore] = useState(null);
  const [storeTags, setStoreTags] = useState(null);
  const [products, setProducts] = useState(null);

  const getTagsByStore = () => {
    const newTags = tags.filter((item) => {
      const { product } = item;
      const { storeId } = product;
      const { _id } = storeId;
      const filter = store.split("-")[1];
      if (_id == filter) return item;
    });
    setStoreTags(newTags);
  };

  const getProductsByStore = async () => {
    try {
      const id = store.split("-")[1];
      const { data } = await axios.get(
        `${import.meta.env.VITE_URI_API}/product/get-products-by-store/${id}`
      );
      const { products } = data;
      setInfoStore(products[0][0].storeId);
      setProducts(products);
      getTagsByStore();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductsByStore();
  }, []);

  return (
    <>
      {infoStore ? (
        <>
          <Searchbar></Searchbar>
          <StoreIntroduction {...infoStore}></StoreIntroduction>
          <Categories allTags={storeTags}></Categories>
          <ProductsCard
            title={`Populares de ${infoStore.name}`}
            products={products}
          ></ProductsCard>
          <ShowAllProducts {...infoStore}></ShowAllProducts>
          <Banner {...infoStore}></Banner>
        </>
      ) : (
        <Animation></Animation>
      )}
    </>
  );
};

const ShowAllProducts = ({ name }) => {
  return (
    <div className="buttonContainer">
      <Link to={`/searching/${name}`}>Ver todos los productos</Link>
    </div>
  );
};

const Banner = ({ banner, name, urlStore }) => {
  return (
    <div className="bannerContainer">
      <img src={banner} alt={name} />
      <Link to={urlStore} target="_blank" style={{ width: "50%", textAlign: "center" }}>
        Explora toda la tienda
      </Link>
    </div>
  );
};

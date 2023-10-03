import axios from "axios";
import { Carrusel } from "../Components/Products/Carrusel";
import { Animation } from "../Components/Animation/Animation";
import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Introduction } from "../Components/Details/Introduction";
import { GoToLink } from "../Components/GoToLink/GoToLink";

export const Details = () => {
  const { productId } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [offer, setOffer] = useState(null);
  const [similar, setSimilar] = useState(null);

  const getProductById = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URI_API}/product/get-product-by-id/${productId}`
      );
      const { product, category } = data;
      if (product.salePrice) {
        const newOffer = (product.price * 100) / product.salePrice;
        setOffer(100 - newOffer);
      }
      setProduct(product);
      getSimilarProducts(product);
    } catch (err) {
      console.log(err);
    }
  };

  const getSimilarProducts = async (filter) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URI_API}/product/get-similar-products`,
        { search: filter.tags, storeId: filter.storeId._id, name: filter.name }
      );
      const { result } = data;
      const newResult = result.filter((item) => item._id != productId);
      if (newResult.length > 40) newResult.length = 40;
      setSimilar(newResult);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductById();
  }, [location]);

  return (
    <>
      {product ? (
        <>
          <Helmet>
            <title>Tienda.gt - {product.name}</title>
            <meta name="description" content={product.description} />
            <link
              rel="stylesheet"
              href={`http://tienda.gt/${product.name.replace(
                /[ ]+/g,
                "-"
              )}/${product.tags.join("-")}/${product.price}/${product._id}`}
            />
          </Helmet>
          <Introduction product={product} offer={offer}></Introduction>
          <Carrusel
            title={"También podría interesarte"}
            products={similar}
          ></Carrusel>
          <GoToLink
            title={`Ver tienda ${product.storeId.name}`}
            url={`/${product.storeId.name.replace(/[ ]+/g, "-")}/${
              product.storeId._id
            }`}
          ></GoToLink>
        </>
      ) : (
        <Animation />
      )}{" "}
    </>
  );
};

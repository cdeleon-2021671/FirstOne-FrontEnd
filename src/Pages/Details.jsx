import React, { useContext, useEffect, useState } from "react";
import { Introduction } from "../Components/Details/Introduction";
import { useLocation, useParams, Link } from "react-router-dom";
import { Animation } from "../Components/Animation/Animation";
import { Carrusel } from "../Components/Products/Carrusel";
import { GoToLink } from "../Components/GoToLink/GoToLink";
import { helmetJsonLdProp } from "react-schemaorg";
import { Helmet } from "react-helmet-async";
import { Product } from "schema-dts";
import axios from "axios";
import { AuthContext } from "../Index";

export const Details = () => {
  const { isLogged, user } = useContext(AuthContext);
  const { productId, product, tags, price } = useParams();
  const location = useLocation();
  const [details, setProduct] = useState(null);
  const [offer, setOffer] = useState(null);
  const [similar, setSimilar] = useState(null);

  const addView = async () => {
    try {
      if (details) {
        if (isLogged == false || (isLogged == true && user.rol == "CLIENT")) {
          const { data } = await axios.post(
            `${import.meta.env.VITE_URI_API}/conversion/add-view`,
            { product: details }
          );
          console.log(data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    addView();
  }, [details]);

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
    window.scrollTo({ top: 0 });
  }, [location]);

  return (
    <>
      {details && details.length != 0 && similar ? (
        <>
          <Helmet
            script={[
              helmetJsonLdProp <
                Product >
                {
                  "@context": "https://schema.org",
                  "@type": "Product",
                  name: details.name,
                  image: details.image,
                  description: details.description,
                  brand: {
                    "@type": "Brand",
                    name: details.storeId.name,
                    logo: details.storeId.urlLogo,
                  },
                  offers: {
                    "@type": "Offer",
                    price: details.price,
                  },
                },
            ]}
          >
            <title>Tienda.gt - {details.name}</title>
            <meta name="description" content={details.description} />
            <link
              rel="canonical"
              href={`https://tienda.gt/${product}/${tags}/${price}/${productId}`}
            />
          </Helmet>
          <Introduction product={details} offer={offer}></Introduction>
          <Carrusel
            title={"También te podría interesar"}
            products={similar}
          ></Carrusel>
          <GoToLink
            title={`Ver tienda ${details.storeId.name}`}
            url={`/${details.storeId.name.replace(/[ ]+/g, "-")}/${
              details.storeId._id
            }`}
          ></GoToLink>
        </>
      ) : (
        <Animation />
      )}{" "}
    </>
  );
};

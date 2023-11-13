import React, { useContext, useEffect, useState } from "react";
import { Introduction } from "../Components/Details/Introduction";
import { useLocation, useParams, Link } from "react-router-dom";
import { Animation } from "../Components/Animation/Animation";
import { Carrusel } from "../Components/Products/Carrusel";
import { GoToLink } from "../Components/GoToLink/GoToLink";
import FingerPrint from "@fingerprintjs/fingerprintjs";
import { helmetJsonLdProp } from "react-schemaorg";
import { Helmet } from "react-helmet-async";
import { Product } from "schema-dts";
import { AuthContext } from "../Index";
import axios from "axios";

export const Details = () => {
  const { isLogged, user } = useContext(AuthContext);
  const { productId, product, tags, price } = useParams();
  const location = useLocation();
  const [details, setProduct] = useState(null);
  const [offer, setOffer] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [loading, setLoading] = useState(false);

  const addView = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_URI_API}/product/add-view/${productId}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const addEvent = async (visitorId, url) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_ANALYSTICS}/newEvent/add-event`,
        {
          url: url,
          fingerprint: visitorId,
          product: details,
          event: "Page View",
          type: "Product",
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const verifyEvent = async () => {
    try {
      if (details) {
        if (isLogged && user && user.rol != "CLIENTE") return;
        const url = `https://tienda.gt${location.pathname}`;
        const fp = await FingerPrint.load();
        const { visitorId } = await fp.get();
        const { data } = await axios.post(
          `${import.meta.env.VITE_ANALYSTICS}/newEvent/verify-event-day`,
          {
            url: url,
            fingerprint: visitorId,
          }
        );
        addEvent(visitorId, url);
        if (data.message == "false") addView();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    verifyEvent();
  }, [details]);

  const getProductById = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_URI_API}/product/get-product-by-id/${productId}`
      );
      const { product, category } = data;
      if (product.salePrice) {
        const newOffer = (product.salePrice * 100) / product.price;
        setOffer(-100 + newOffer);
      }
      setProduct(product);
      getSimilarProducts(product);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
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
          {loading && <Animation></Animation>}
          <Introduction product={details} offer={offer}></Introduction>
          <Carrusel
            title={"👀 También te podría interesar"}
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

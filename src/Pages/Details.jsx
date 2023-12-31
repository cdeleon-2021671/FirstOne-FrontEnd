import React, { useContext, useEffect, useState } from "react";
import { Introduction } from "../Components/Details/Introduction";
import { useLocation, useParams } from "react-router-dom";
import { Animation } from "../Components/Animation/Animation";
import { Carrusel } from "../Components/Products/Carrusel";
import { GoToLink } from "../Components/GoToLink/GoToLink";
import FingerPrint from "@fingerprintjs/fingerprintjs";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Index";
import axios from "axios";

export const Details = () => {
  const { isLogged, user } = useContext(AuthContext);
  const { productId, product, tags, price } = useParams();
  const location = useLocation();
  const [details, setDetails] = useState(null);
  const [offer, setOffer] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState(null);

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
      setFormat({
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: product.image,
        description: product.description,
        sku: product.idProduct,
        brand: {
          "@type": "Brand",
          name: product.storeId.name,
          logo: product.storeId.urlLogo,
        },
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "GTQ",
        },
      });
      setDetails(product);
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
      {details && details.length != 0 && similar && format ? (
        <>
          <Helmet>
            <script type="application/ld+json">{JSON.stringify(format)}</script>
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

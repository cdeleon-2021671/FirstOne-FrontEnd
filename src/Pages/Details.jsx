import React, { useEffect, useState } from "react";
import { Searchbar } from "../Components/Search/Searchbar";
import { Introduction } from "../Components/Details/Introduction";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Animation } from "../Components/Animation/Animation";
import { Options } from "../Components/Details/Options";
import { Products } from "../Components/Products/Products";
import { GoToLink } from "../Components/GoToLink/GoToLink";
import { Description } from "../Components/Details/Description";
import $ from "jquery";
import { v4 } from "uuid";
import { Helmet } from "react-helmet";

export const Details = () => {
  const { productId } = useParams();
  const [details, setDetails] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [category, setCategory] = useState("");
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URI_API}/product/get-product-by-id/${productId}`
      );
      const { product } = data;
      const { category } = data;
      setCategory(category);
      getSimilarProducts(product.tags, product.storeId._id, product.name);
      setDetails(product);
    } catch (err) {
      console.log(err);
    }
  };

  const getSimilarProducts = async (tags, id, name) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URI_API}/product/get-similar-products/`,
        { search: tags, storeId: id, name: name }
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
    getProduct();
    $(window).scrollTop("0");
  }, [productId]);

  const [viewOptions, setViewOptions] = useState(false);
  const [shouldRunShowOptions, setShouldRunShowOptions] = useState(true);

  const showOptions = () => {
    if (shouldRunShowOptions) {
      if (window.innerWidth <= 600) {
        setViewOptions(true);
      } else {
        setViewOptions(false);
      }
    }
  };

  useEffect(() => {
    showOptions();
    window.addEventListener("resize", showOptions);
    return () => {
      window.removeEventListener("resize", showOptions);
    };
  }, []);

  useEffect(() => {
    if (viewOptions === true) {
      setShouldRunShowOptions(false);
    } else {
      setShouldRunShowOptions(true);
    }
  }, [viewOptions]);

  return (
    <>
      {details && similar ? (
        <div className="padding-container" id="details-container">
          <Helmet>
            <title>Tienda.gt - {details.name}</title>
            <meta name="description" content={details.description} />
            <meta name="keywords" content={details.tags.join(", ")} />
            <link
              rel="stylesheet"
              href={`https://tienda.gt/${details.name}/${details.tags.join(
                "-"
              )}/${details.price}/${details._id}`}
            />
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org/",
                "@type": "Product",
                description: details.description,
                name: details.name,
                image: details.image,
                url: `https://tienda.gt/${details.name}/${details.tags.join(
                  "-"
                )}/${details.price}/${details._id}`,
                offers: {
                  "@type": "Offer",
                  availability: details.stock,
                  price: details.price,
                  priceCurrency: "Q",
                },
              })}
            </script>
          </Helmet>
          <Searchbar filter={category}></Searchbar>
          <Introduction {...details}></Introduction>
          {viewOptions == true && (
            <>
              <Options {...details.storeId}></Options>
              <Description {...details}></Description>
            </>
          )}
          {similar.length !== 0 && (
            <>
              <Products
                products={similar}
                classLeft={v4()}
                classRight={v4()}
                title={"También te podrían interesar"}
              ></Products>
              <GoToLink
                title={`Ver tienda ${details.storeId.name}`}
                url={`/${details.storeId.name}/${details.storeId._id}`}
              ></GoToLink>
            </>
          )}
        </div>
      ) : (
        <Animation></Animation>
      )}
    </>
  );
};

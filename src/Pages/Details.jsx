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

  return (
    <div id="margin-padding-container">
      {details && similar ? (
        <div id="product-details">
          <Searchbar filter={category}></Searchbar>
          <Introduction {...details}></Introduction>
          <Options {...details.storeId}></Options>
          <Description {...details}></Description>
          {similar.length !== 0 && (
            <Products
              products={similar}
              classLeft={v4()}
              classRight={v4()}
              title={"También te podrían interesar"}
            ></Products>
          )}

          <GoToLink
            title={`Ver tienda ${details.storeId.name}`}
            url={`/store/${details.storeId.name}/${details.storeId._id}`}
          ></GoToLink>
        </div>
      ) : (
        <Animation></Animation>
      )}
    </div>
  );
};

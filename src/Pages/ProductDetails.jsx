import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Searchbar } from "../Components/Searchbar/Searchbar";
import { ProductIntroduction } from "../Components/Details/ProductIntroduction";
import { Description } from "../Components/Details/Description";
import { Interest } from "../Components/Details/Interest";
import { OptionsOfStore } from "../Components/Details/OptionsOfStore";

export const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URI_API}/product/get-product-by-id/${productId}`
      );
      const { product } = data;
      setProduct(product);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, [productId]);

  return (
    <>
      {product && (
        <>
          <Searchbar></Searchbar>
          <ProductIntroduction {...product}></ProductIntroduction>
          <OptionsOfStore {...product.storeId}></OptionsOfStore>
          <Description {...product}></Description>
          <Interest {...product}></Interest>
          <ShowAllProducts {...product}></ShowAllProducts>
        </>
      )}
    </>
  );
};

const ShowAllProducts = ({ storeId }) => {
  const { name, urlStore } = storeId;
  return (
    <div className="buttonContainer">
      <Link to={urlStore} target="_blank">
        Ver tienda {name}
      </Link>
    </div>
  );
};

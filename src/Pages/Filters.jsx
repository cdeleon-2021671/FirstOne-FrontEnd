import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Searchbar } from "../Components/Searchbar/Searchbar";
import { FiltersCard } from "../Components/Products/FiltersCard";
import {SkeletonAnimation} from '../Components/Animation/SkeletonAnimation'
import axios from "axios";

export const Filters = () => {
  const { search } = useParams();
  const [products, setProducts] = useState(null);

  const getProducts = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URI_API}/product/search-products`,
        { search: search }
      );
      const { result } = data;
      setProducts(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, [search]);

  return (
    <>
      {products ? (
        <>
          <Searchbar></Searchbar>
          <FiltersCard products={products}></FiltersCard>
        </>
      ) : <SkeletonAnimation></SkeletonAnimation>}
    </>
  );
};

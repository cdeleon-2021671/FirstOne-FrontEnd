import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductsCard } from "../Products/ProductsCard";
import axios from "axios";

export const Interest = ({ storeId, tags }) => {
  const location = useLocation();
  const { name, description } = storeId;
  const [products, setProducts] = useState(null);

  const getMoreProducts = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URI_API}/product/search-products`,
        { search: tags[0] == "Home" ? tags[1] : tags[0] }
      );
      const { result } = data;
      const filter = [];
      const random =
        result.length > 19
          ? Math.floor(Math.random() * (result.length - 20))
          : 0;
      for (let index = random; index < 20; index += 10) {
        const array = result.slice(index, index + 10);
        filter.push(array);
      }
      setProducts(filter);
    } catch (err) {
      console.log(err);
    }
  };

  const reload = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    getMoreProducts();
  }, [location]);

  return (
    <div className="containerInterest">
      <h1 className="titleInterest">{name}</h1>
      <p>{description}</p>
      {products && (
        <ProductsCard
          products={products}
          title={"También le podrían interesar"}
          fnReload={reload}
        />
      )}
    </div>
  );
};

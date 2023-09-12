import React, { useContext, useEffect, useState } from "react";
import { Introduction } from "../Components/Introduction/Introduction";
import { Searchbar } from "../Components/Searchbar/Searchbar";
import { Categories } from "../Components/Categories/Categories";
import { ProductsCard } from "../Components/Products/ProductsCard";
import { AuthContext } from "../Index";
import { SkeletonAnimation } from "../Components/Animation/SkeletonAnimation";

export const HomePage = () => {
  const { tags, products, stores } = useContext(AuthContext);
  const [allTags, setAllTags] = useState(null);

  const getTags = () => {
    let newTags = [];
    while (true) {
      if (newTags.length == 15) {
        break;
      } else {
        const random = Math.floor(Math.random() * tags.length);
        if (newTags.includes(tags[random]) == false) {
          newTags.push(tags[random]);
        }
      }
    }
    setAllTags(newTags);
  };

  useEffect(() => {
    getTags();
  }, []);
  return (
    <>
      {stores && allTags && products ? (
        <>
          <Introduction stores={stores}></Introduction>
          <Searchbar></Searchbar>
          <Categories allTags={allTags}></Categories>
          <ProductsCard products={products} title={"Populares"}></ProductsCard>
        </>
      ) : (
        <SkeletonAnimation></SkeletonAnimation>
      )}
    </>
  );
};

import React, { useContext, useState } from "react";
import { SearchProducts } from "../Components/Searchbar/SearchProducts";
import { Categories } from "../Components/Categories/Categories";
import { AuthContext } from "../Index";
import { Animation } from "../Components/Animation/Animation";

export const AllCategories = () => {
  const { tags } = useContext(AuthContext);
  const [categories, setCategories] = useState(Array.from(tags));

  return (
    <>
      {tags ? (
        <>
          <SearchProducts
            setOriginal={setCategories}
            original={tags}
            action={"categories"}
          ></SearchProducts>
          <Categories categories={categories}></Categories>
        </>
      ) : (
        <Animation></Animation>
      )}
    </>
  );
};

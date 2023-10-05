import React, { useContext, useState } from "react";
import { AuthContext } from "../Index";
import { SearchProducts } from "../Components/Searchbar/SearchProducts";
import { Animation } from "../Components/Animation/Animation";
import { StoresList } from "../Components/StorePage/StoresList";

export const AllStores = () => {
  const { stores } = useContext(AuthContext);
  const [ecommerce, setEcommerce] = useState(Array.from(stores));

  return (
    <>
      {stores ? (
        <>
          <SearchProducts original={stores} setOriginal={setEcommerce} action='stores'></SearchProducts>
          <StoresList stores={ecommerce}></StoresList>
        </>
      ) : (
        <Animation></Animation>
      )}
    </>
  );
};

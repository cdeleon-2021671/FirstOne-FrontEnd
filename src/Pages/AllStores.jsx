import React, { useContext, useState } from "react";
import { AuthContext } from "../Index";
import { SearchProducts } from "../Components/Searchbar/SearchProducts";
import { Animation } from "../Components/Animation/Animation";
import { StoresList } from "../Components/StorePage/StoresList";
import { Helmet } from "react-helmet-async";

export const AllStores = () => {
  const { stores } = useContext(AuthContext);
  const [ecommerce, setEcommerce] = useState(Array.from(stores));

  return (
    <>
      <Helmet>
        <title>Tienda.gt - Tiendas</title>
        <meta
          name="description"
          content="En este apartado podrás buscar la tienda que sea de tu agrado y su variedad de productos"
        />
        <link rel="canonical" href="https://tienda.gt/all-stores" />
      </Helmet>
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

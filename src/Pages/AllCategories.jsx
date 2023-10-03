import React, { useContext } from "react";
import { SearchProducts } from "../Components/Searchbar/SearchProducts";
import { Categories } from "../Components/Categories/Categories";
import { AuthContext } from "../Index";
import { Animation } from "../Components/Animation/Animation";
import { Helmet } from "react-helmet-async";

export const AllCategories = () => {
  const { tags } = useContext(AuthContext);

  return (
    <>
    <Helmet>
      <title>TIenda.gt - Categorías</title>
      <meta name="description" content="En este apartado puedes buscar productos de una categoría
      en específico ya que contamos con diferentes tiendas y sus productos" />
      <link rel="canonical" href="http://tienda.gt/all-categories" />
    </Helmet>
      {tags ? (
        <>
          <SearchProducts></SearchProducts>
          <Categories categories={tags}></Categories>
        </>
      ) : (
        <Animation></Animation>
      )}
    </>
  );
};

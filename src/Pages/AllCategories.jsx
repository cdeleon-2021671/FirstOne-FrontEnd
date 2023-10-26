import React, { useContext, useState } from "react";
import { SearchProducts } from "../Components/Searchbar/SearchProducts";
import { Categories } from "../Components/Categories/Categories";
import { AuthContext } from "../Index";
import { Animation } from "../Components/Animation/Animation";
import { Helmet } from "react-helmet-async";

export const AllCategories = () => {
  const { tags } = useContext(AuthContext);
  const [categories, setCategories] = useState(Array.from(tags));

  return (
    <>
    <Helmet>
      <title>Tienda.gt - Categorías</title>
      <meta name="description" 
      content="Ofrecemos una amplia gama de categorías de productos para satisfacer todas tus necesidades 
      de compras en línea. Desde moda y belleza hasta electrónica y más, nuestras categorías abarcan todo 
      lo que puedas imaginar. Te invitamos a explorar nuestras diversas categorías y descubrir productos 
      de alta calidad en cada una de ellas. Ya sea que estés buscando inspiración para tu próxima compra o 
      desees explorar nuevas opciones, nuestras categorías te ayudarán a navegar fácilmente por nuestra amplia 
      selección de productos. ¡Descubre lo que tenemos para ofrecer y encuentra exactamente lo que estás 
      buscando en nuestra variedad de categorías de productos!" />
      <link rel="canonical" href="https://tienda.gt/all-categories"/>
    </Helmet>
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

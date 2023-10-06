import React, { useContext, useState } from "react";
import { AuthContext } from "../Index";
import { SearchProducts } from "../Components/Searchbar/SearchProducts";
import { Animation } from "../Components/Animation/Animation";
import { StoresList } from "../Components/StorePage/StoresList";
import { Helmet } from 'react-helmet-async';

export const AllStores = () => {
  const { stores } = useContext(AuthContext);
  const [ecommerce, setEcommerce] = useState(Array.from(stores));

  return (
    <>
      <Helmet>
        <title>Tienda.gt - Tiendas</title>
        <meta
          name="description"
          content="¡Descubre un mundo de opciones de compras en un solo lugar! En nuestro sitio web,
          te presentamos una comunidad de tiendas en línea, cada una de ellas gestionada por nuestros 
          afiliados. Explora una variedad de tiendas únicas y encuentra productos exclusivos en cada una de 
          ellas. Desde moda hasta artículos para el hogar, electrónica y más, nuestras tiendas afiliadas 
          tienen algo para todos los gustos. Únete a nosotros para descubrir productos de calidad, todo
          en un solo destino en línea. Explora las tiendas y descubre tesoros ocultos en cada rincón 
          de nuestra comunidad de compras en línea."
        />
        <link rel="canonical" href="https://tienda.gt/all-stores" />
      </Helmet>
      {stores ? (
        <>
          <SearchProducts
            original={stores}
            setOriginal={setEcommerce}
            action="stores"
          ></SearchProducts>
          <StoresList stores={ecommerce}></StoresList>
        </>
      ) : (
        <Animation></Animation>
      )}
    </>
  );
};

import React, { useContext, useEffect, useState } from "react";
import { Suggestion } from "../Components/Products/Suggestion";
import { Animation } from "../Components/Animation/Animation";
import { useLocation, useParams, Link } from "react-router-dom";
import { StoresList } from "../Components/StorePage/StoresList";
import "../Components/Products/Results.scss";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Index";
import { CardProducts } from "../Components/Products/CardProducts";
import axios from "axios";

export const OutletProducts = () => {
  const location = useLocation();
  const { category, store, storeId, search } = useParams();
  const { products, offers, mostViewed, trending } = useContext(AuthContext);
  const [boxes, setBoxes] = useState(null);
  const [original, setOriginal] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [url, setUrl] = useState(null);
  const [storeResult, setStoreResult] = useState(null);

  const getProductsByCategory = async () => {
    try {
      const tag = category.replace(/[-]+/g, " ");
      const { data } = await axios.post(
        `${import.meta.env.VITE_URI_API}/product/get-products-by-tag`,
        { tag: tag }
      );
      const { products } = data;
      setBoxes(products);
      setOriginal(products);
    } catch (err) {
      console.log(err);
    }
  };

  const getProductsByStore = async () => {
    const newPopular = [];
    mostViewed.forEach((element) => {
      const { _id } = element.storeId;
      if (_id == storeId) newPopular.push(element);
    });
    setBoxes(newPopular);
    setOriginal(newPopular);
  };

  const getTrending = async () => {
    if (trending) {
      const products = trending.filter((item) => {
        const { _id } = item.storeId;
        if (_id == storeId) return item;
      });
      console.log(products);
      setBoxes(products);
      setOriginal(products);
    }
  };

  const getOffersByStore = async () => {
    if (offers) {
      const products = offers.filter((item) => {
        const { _id } = item.storeId;
        if (_id == storeId) return item;
      });
      setBoxes(products);
      setOriginal(products);
    }
  };

  const getSearching = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URI_API}/product/search-products`,
        { search: search }
      );
      const { result, stores } = data;
      setBoxes(result);
      setOriginal(result);
      setStoreResult(stores);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (category) {
      const newCategory = category.replace(/[-]+/g, " ");
      getProductsByCategory();
      setTitle(category.replace(/[-]+/g, " "));
      setDescription(
        `Explora nuestra amplia selección de productos en la categoría${newCategory}. 
        En ${newCategory}, encontrarás una variedad de artículos de alta calidad, cuidadosamente 
        seleccionados para satisfacer tus necesidades. Descubre productos excepcionales y opciones 
        emocionantes en nuestra categoría ${newCategory}. No te lo pierdas!`
      );
      setUrl(`${category}`);
    } else if (location.pathname == `/${store}/popular/${storeId}`) {
      const newStore = store.replace(/[-]+/g, " ");
      getProductsByStore();
      setDescription(
        `Explora los productos excepcionales de ${newStore}. Ofrecemos una selección cuidadosamente 
        curada de artículos de alta calidad. Desde los más populares hasta productos que no 
        creeras que existn, encontrarás productos que se ajustan a la oferta única de nuestra tienda. 
        Encuentra lo que necesitas en Tienda.gt - ${newStore}. No te lo pierdas!`
      );
      setUrl(`${store}/popular/${storeId}`);
      setTitle(`Productos ${store.replace(/[-]+/g, " ")}`);
    } else if (location.pathname == `/trending-48-hours`) {
      setBoxes(trending ? Array.from(trending) : null);
      setOriginal(trending ? Array.from(trending) : null);
      setDescription(
        `Explora los productos guatemaltecos más vistos en las ultimas 48 horas!
        Es una selección cuidadosamente curada de artículos de alta calidad.
        Encuentra lo que necesitas en Tienda.gt - Tranding. No te lo pierdas!`
      );
      setUrl(`trending-48-hours`);
      setTitle(`Tranding`);
    } else if (location.pathname == `/${store}/trending/${storeId}`) {
      getTrending();
      setTitle(`Trending ${store.replace(/[-]+/g, " ")}`);
      const newStore = store.replace(/[-]+/g, " ");
      setDescription(
        `Descubre las productos más vistos en las ultimas 48 horas de la tienda ${newStore}. 
        En nuestra tienda, te ofrecemos una variedad de productos de alta calidad. 
        Desde los más populares hasta productos que no creeras que existen, encontrarás oportunidades 
        de ahorro que no querrás perderte. Aprovecha nuestras ofertas en Tienda.gt - ${newStore} hoy mismo.
        .No te lo pierdas!`
      );
      setUrl(`${store}/trending/${storeId}`);
    } else if (location.pathname == `/${store}/offers/${storeId}`) {
      getOffersByStore();
      setTitle(`Ofertas ${store.replace(/[-]+/g, " ")}`);
      const newStore = store.replace(/[-]+/g, " ");
      setDescription(
        `Descubre las emocionantes ofertas en Tienda.gt - ${newStore}. En nuestra tienda, te ofrecemos 
        descuentos irresistibles en una variedad de productos de alta calidad. 
        Desde los más populares hasta productos que no creeras que existen, encontrarás oportunidades 
        de ahorro que no querrás perderte. Aprovecha nuestras ofertas en Tienda.gt - ${newStore} hoy mismo.
        .No te lo pierdas!`
      );
      setUrl(`${store}/offers/${storeId}`);
    } else if (location.pathname == "/all-offers-in-store") {
      setBoxes(Array.from(offers));
      setOriginal(Array.from(offers));
      setTitle(`Ofertas`);
      setDescription(
        `Te mostramos todos nuestros productos en oferta de alta calidad que estamos seguros que 
        te encantará. No te lo pierdas!`
      );
      setUrl(`all-offers-in-store`);
    } else if (location.pathname == "/all-popular-in-store") {
      setBoxes(Array.from(mostViewed));
      setOriginal(Array.from(mostViewed));
      setTitle(`Populares`);
      setDescription(
        `Te mostramos los productos más vistos de alta calidad que estamos seguros que 
        te encantará. No te lo pierdas!`
      );
      setUrl(`popular`);
    } else if (search) {
      if (search == "all") {
        setBoxes(Array.from(products));
        setOriginal(Array.from(products));
      } else {
        getSearching();
      }
      setTitle(`Resultados`);
      setDescription(
        `Te mostramos los productos reloacionados con tu busqueda, esperamos 
          que los resultados sean los mas acertados posible. No te lo pierdas!`
      );
      setUrl(`gt/products-results/${search}`);
    }
  }, [location]);

  return (
    <>
      {title && description && url ? (
        <>
          <Helmet>
            <title>Tienda.gt - {title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={`https://tienda.gt/${url}`} />
          </Helmet>
          <div className="outlet-products">
            <StoresList stores={storeResult}></StoresList>
            <Suggestion options={boxes}></Suggestion>
            <Products products={boxes}></Products>
          </div>
        </>
      ) : (
        <Animation />
      )}
    </>
  );
};

const Products = ({ products }) => {
  return (
    <>
      {products && products.length != 0 && (
        <div className="results">
          {products.map((item) => {
            return <CardProducts item={item} key={item._id} />;
          })}
        </div>
      )}
    </>
  );
};

import React, { useContext, useEffect, useState } from "react";
import { SearchProducts } from "../Components/Searchbar/SearchProducts";
import { Suggestion } from "../Components/Products/Suggestion";
import { Animation } from "../Components/Animation/Animation";
import { useLocation, useParams, Link } from "react-router-dom";
import "../Components/Products/Results.scss";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Index";
import axios from "axios";
import { StoresList } from "../Components/StorePage/StoresList";

export const OutletProducts = () => {
  const location = useLocation();
  const { category, store, storeId, search } = useParams();
  const { products, offers, mostViewed } = useContext(AuthContext);
  const [boxes, setBoxes] = useState(null);
  const [original, setOriginal] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
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
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_URI_API
        }/product/get-products-by-store/${storeId}`
      );
      const { products } = data;
      setBoxes(products);
      setOriginal(products);
    } catch (err) {
      console.log(err);
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
      getProductsByCategory();
      setTitle(category.replace(/[-]+/g, " "));
      setDescription(
        `Te mostramos productos relacionados con ${category.replace(
          /[-]+/g,
          " "
        )} que estamos seguros que te encantará. No te lo pierdas!`
      );
      setUrl(`/${category}`);
    } else if (location.pathname == `/${store}/products/${storeId}`) {
      getProductsByStore();
      setDescription(
        `Te mostramos productos relacionados con ${store.replace(
          /[-]+/g,
          " "
        )} que estamos seguros que te encantará. No te lo pierdas!`
      );
      setUrl(`/${store}/products/${storeId}`);
      setTitle(`Productos ${store.replace(/[-]+/g, " ")}`);
    } else if (location.pathname == `/${store}/offers/${storeId}`) {
      getOffersByStore();
      setTitle(`Ofertas ${store.replace(/[-]+/g, " ")}`);
      setDescription(
        `Te mostramos productos relacionados con ${store.replace(
          /[-]+/g,
          " "
        )} que estamos seguros que te encantará. No te lo pierdas!`
      );
      setUrl(`/${store}/offers/${storeId}`);
    } else if (location.pathname == "/all-products-in-store") {
      setBoxes(Array.from(products));
      setOriginal(Array.from(products));
      setTitle(`Productos`);
      setDescription(
        `Te mostramos todos nuestros productos de alta calidad que estamos seguros que 
        te encantará. No te lo pierdas!`
      );
      setUrl(`/all-products-in-store`);
    } else if (location.pathname == "/all-offers-in-store") {
      setBoxes(Array.from(offers));
      setOriginal(Array.from(products));
      setTitle(`Ofertas`);
      setDescription(
        `Te mostramos todos nuestros productos en oferta de alta calidad que estamos seguros que 
        te encantará. No te lo pierdas!`
      );
      setUrl(`/all-offers-in-store`);
    } else if (location.pathname == "/most-viewed") {
      setBoxes(Array.from(mostViewed));
      setOriginal(Array.from(mostViewed));
      setTitle(`Más vistos`);
      setDescription(
        `Te mostramos los productos más vistos de alta calidad que estamos seguros que 
        te encantará. No te lo pierdas!`
      );
      setUrl(`/most-viewed`);
    } else if (search) {
      getSearching();
      setTitle(`Resultados`);
      setDescription(
        `Te mostramos los productos reloacionados con tu busqueda, esperamos 
        que los resultados sean los mas acertados posible. No te lo pierdas!`
      );
      setUrl(`/gt/products-results/${search}`);
    }
  }, [location]);

  return (
    <>
      {boxes ? (
        <div className="outlet-products">
          <Helmet>
            <title>Tienda.gt - {title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />
          </Helmet>
          <StoresList stores={storeResult}></StoresList>
          <SearchProducts
            original={original}
            setOriginal={setBoxes}
            action={"products"}
          ></SearchProducts>
          <Suggestion options={boxes}></Suggestion>
          <CardProducts products={boxes}></CardProducts>
        </div>
      ) : (
        <Animation />
      )}
    </>
  );
};

const CardProducts = ({ products }) => {
  return (
    <>
      {products && (
        <div className="results">
          {products.map((item) => {
            const newOffer = (item.price * 100) / item.salePrice;
            const offer = 100 - newOffer;
            const nameUrl = item.name.replace(
              /[-[\]{}()*+?.,;:#@<>\\^$|#"']+/g,
              " "
            );
            const tagsUrl = item.tags
              .map((element) => element.replace(/[ ]+/g, "-"))
              .join("-");
            const priceUrl = item.price;
            const id = item._id;
            return (
              <Link
                className="card"
                key={item._id}
                to={`/${nameUrl.replace(
                  /[ ]+/g,
                  "-"
                )}/${tagsUrl}/${priceUrl}/${id}`}
              >
                <img src={item.image} alt={item.name} className="card-image" />
                <div className="card-information">
                  <h3 className="card-information-product">{item.name}</h3>
                  <Link
                    className="card-information-store"
                    title={item.storeId.name}
                    to={`/${item.storeId.name.replace(/[ ]+/g, "-")}/${
                      item.storeId._id
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Producto vendido por {item.storeId.name}
                  </Link>
                  <div className="price">
                    {item.salePrice && (
                      <span className="price-porcent">-{offer}%</span>
                    )}
                    <div className="price-price">
                      <span>Q{item.price.toFixed(2).split(".")[0]}.</span>
                      <span className="little">
                        {item.price.toFixed(2).split(".")[1]}
                      </span>
                    </div>
                  </div>
                  <div className="card-information-salePrice">
                    {item.salePrice && (
                      <div className="normal">
                        Precio normal: &nbsp;
                        <span>Q{item.salePrice.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="aditional">
                      <span>
                        {item.condition} - {item.views} vistas
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

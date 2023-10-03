import React from "react";
import { SearchProducts } from "../Searchbar/SearchProducts";
import { Suggestion } from "./Suggestion";
import { Link } from "react-router-dom";
import "./Results.scss";

export const ResultsCard = ({ products }) => {
  return (
    <div className="outlet-products">
      {products && (
        <>
          <SearchProducts></SearchProducts>
          <Suggestion options={products}></Suggestion>
          <CardProducts products={products}></CardProducts>
        </>
      )}
    </div>
  );
};

const CardProducts = ({ products }) => {
  return (
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
  );
};

import React from "react";
import "./Introduction.scss";

export const Introduction = ({ name, image, price, storeId, stock }) => {
  return (
    <div id="details-introduction">
      <h1 className="mainTitle">{name}</h1>
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="img-logo-store"
      ></div>
      <div className="price-store">
        <div>
          <h1>{name}</h1>
          <span style={{ color: stock == "Disponible" ? "#28B463" : "#E74C3C" }}>
            Q{price.toFixed(2)} | {stock}
          </span>
          <span>Producto vendido por <br /> {storeId.name}</span>
        </div>
      </div>
    </div>
  );
};

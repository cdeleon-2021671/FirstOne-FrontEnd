import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from 'jquery';
import "./ProductsCard.scss";

export const ProductsCard = ({ products, tags }) => {

  useEffect(()=>{
    $('.more-options')[0].scrollLeft = 0
  }, [tags]);

  return (
    <>
      {products && (
        <div id="products-card">
          {tags && tags.length !== 0 && (
            <div className="more-options">
              <label>Ver más:</label>
              {tags.map((item, key) => (
                <Link key={key} to={`/products/${item}`}>
                  {item}
                </Link>
              ))}
            </div>
          )}
          <div className="products">
            {products.map(({ _id, image, price, name, storeId, stock }) => (
              <Link key={_id} to={`/product/${name}/${_id}`}>
                <img src={image} alt={name} />
                <div>
                  <span>
                    {name} - {storeId.name}
                  </span>
                  <span className="price">GTQ: {price.toFixed(2)}</span>
                  <span
                    style={{
                      color: stock == "Disponible" ? "#28B463" : "#E74C3C",
                    }}
                    className="stock"
                  >
                    {stock}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

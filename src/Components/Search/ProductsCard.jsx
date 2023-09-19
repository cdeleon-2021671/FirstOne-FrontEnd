import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import $ from 'jquery';
import "./ProductsCard.scss";

export const ProductsCard = ({ products, tags }) => {
  const {search} = useParams();
  useEffect(()=>{
    $('.more-options')[0].scrollLeft = 0
  }, [tags]);

  const setLocal = ()=>{
    console.log(search);
  }

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
            {products.map(({ _id, image, price, name, storeId, stock }, key) => (
              <Link key={key} to={`/product/${name}/${_id}`} onClick={setLocal}>
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

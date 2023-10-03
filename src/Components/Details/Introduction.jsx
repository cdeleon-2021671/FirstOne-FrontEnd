import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Options } from "./Options";
import { Buy } from "./Buy";
import "./Details.scss";
import $ from "jquery";

export const Introduction = ({ product, offer }) => {
  const scrolling = () => {
    if (window.innerWidth > 800) {
      $("#img-produt-details").css("position", "sticky");
      $("#img-produt-details").css("top", "0");
      $(".details-content").css("position", "sticky");
      $(".details-content").css("top", "0");
    }else{
        $("#img-produt-details").css("position", "static");
      $("#img-produt-details").css("top", "0");
      $(".details-content").css("position", "static");
      $(".details-content").css("top", "0");
    }
  };

  useEffect(() => {
    scrolling();
    $(window).on("resize", scrolling);
    return () => {
      $(window).off("resize");
    };
  }, []);
  return (
    <>
      {product && (
        <div className="details">
          <h2 className="details-title">{product.name}</h2>
          <div>
            <img
              src={product.image}
              alt={product.name}
              id="img-produt-details"
            />
          </div>
          <div>
            <div className="details-content">
              <h2 className="details-content-title">{product.name}</h2>
              <Link
                to={product.storeId.urlStore}
                target="_blank"
                className="details-content-store"
                title="Ver tienda"
              >
                Producto vendido por {product.storeId.name}
              </Link>
              <p className="details-content-description">
                {product.description}
              </p>
              <span className="details-content-introduction">
                {product.views} vistas - {product.condition} -&nbsp;
                <strong
                  style={{
                    color: `${
                      product.stock == "Agotado" ? "#ff0000" : "#008000"
                    }`,
                  }}
                >
                  {product.stock}
                </strong>
              </span>
              <hr />
              <div className="details-content-price">
                {product.salePrice && (
                  <span className="porcent">-{offer}%</span>
                )}
                <span>Q{product.price.toFixed(2).split(".")[0]}.</span>
                <span className="little">
                  {product.price.toFixed(2).split(".")[1]}
                </span>
              </div>
              {product.salePrice && (
                <div className="details-content-salePrice">
                  Precio normal: <span>Q{product.salePrice.toFixed(2)}</span>
                </div>
              )}
              <Options {...product.storeId}></Options>
              <Buy {...product}></Buy>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Options } from "./Options";
import { Buy } from "./Buy";
import "./Details.scss";
import $ from "jquery";

export const Introduction = ({ product, offer }) => {
  const [viewStore, setViewStore] = useState(false);

  const scrolling = () => {
    if (window.innerWidth > 800) {
      $("#img-produt-details").css("position", "sticky");
      $("#img-produt-details").css("top", "0");
      $(".details-content").css("position", "sticky");
      $(".details-content").css("top", "0");
      setViewStore(true);
    } else {
      $("#img-produt-details").css("position", "static");
      $("#img-produt-details").css("top", "0");
      $(".details-content").css("position", "static");
      $(".details-content").css("top", "0");
      setViewStore(false);
    }
  };

  const showStore = () => {
    $(".details-content-store div").addClass("isActive");
  };

  const hiddenStore = () => {
    $(".details-content-store div").removeClass("isActive");
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
              <div className="details-content-store">
                <input
                  type="text"
                  id="showInfoStore"
                  readOnly
                  onFocus={showStore}
                  onBlur={() => {
                    setTimeout(() => hiddenStore(), 100);
                  }}
                />
                <label htmlFor="showInfoStore">
                  Producto vendido por {product.storeId.name}
                </label>
                &nbsp;-&nbsp;
                <span
                  className="stock"
                  style={{
                    color: `${
                      product.stock == "Agotado"
                        ? "#ff0000"
                        : product.stock == "Disponible"
                        ? "#008000"
                        : "#ff6600"
                    }`,
                  }}
                >
                  {product.stock}
                </span>
                {viewStore && (
                  <div>
                    <img
                      src={product.storeId.urlLogo}
                      alt={product.storeId.name}
                    />
                    <span>{product.storeId.description}</span>
                    <Link to={product.storeId.urlStore} target="_blank">
                      Visitar tienda oficial
                    </Link>
                  </div>
                )}
              </div>
              <p className="details-content-description">
                {product.description}
              </p>
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
                  Precio original: <span>Q{product.salePrice.toFixed(2)}</span>
                </div>
              )}
              <Options {...product.storeId}></Options>
              <Buy {...product}></Buy>
              {viewStore == false && (
                <div className="details-content-responsiveStore">
                  <h2>{product.storeId.name}</h2>
                  <p>{product.storeId.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

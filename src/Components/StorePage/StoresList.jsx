import React, { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { RiLuggageDepositLine } from "react-icons/ri";
import { FaRegCreditCard } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import "./StoresList.scss";

export const StoresList = ({ stores }) => {
  return (
    <>
      {stores && stores.length !== 0 && (
        <div className="all-stores">
          {stores.map((store, key) => {
            const { urlLogo, name, _id } = store.store;
            return (
              <Link
                to={`/${name.replace(/[ ]+/g, "-")}/${_id}`}
                className="all-stores-content"
                key={key}
              >
                <img
                  src={urlLogo}
                  alt={name}
                  className="all-stores-content-logo"
                />
                <StoreIntroduction {...store.store} />
                <StoreProducts products={store.products} />
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

const StoreIntroduction = ({
  name,
  description,
  shippingTerms,
  paymentOptions,
}) => {
  const options = {
    "Pago contra entrega": <TbTruckDelivery />,
    Depósito: <RiLuggageDepositLine />,
    "Tarjetas de crédito o débito": <FaRegCreditCard />,
    "Pago en cuotas": <BsCashCoin />,
  };
  return (
    <div className="container">
      <div className="container-item">
        <label className="title">{name}</label>
        <span className="text">{ReactHtmlParser(description)}</span>
      </div>
      {shippingTerms && shippingTerms.length != 0 && (
        <div className="container-item">
          <label className="title">Formas de envío</label>
          {shippingTerms.map((item, key) => {
            return (
              <span key={key} className="text">
                {item}
              </span>
            );
          })}
        </div>
      )}
      {paymentOptions && paymentOptions.length != 0 && (
        <div className="container-item">
          <label className="title">Métodos de pago</label>
          {paymentOptions.map((item, key) => {
            return (
              <span key={key} className="text">
                {options[item]}
                {item}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

const StoreProducts = ({ products }) => {
  const [allProducts, setAllProducts] = useState(null);

  useEffect(() => {
    if (products) {
      const newProducts = Array.from(products);
      if (products.length > 10) newProducts.length = 10;
      setAllProducts(newProducts);
    }
  }, [products]);

  return (
    <div className="store-products">
      {allProducts &&
        allProducts.length !== 0 &&
        allProducts.map((item, key) => {
          return (
            <div
              key={key}
              className="store-products-item"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="store-products-item-image"
              />
              <span className="store-products-item-title">{item.name}</span>
            </div>
          );
        })}
    </div>
  );
};

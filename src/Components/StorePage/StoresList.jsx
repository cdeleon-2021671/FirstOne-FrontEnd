import React from "react";
import { Link } from "react-router-dom";
import "./StoresList.scss";

export const StoresList = ({ stores }) => {
  return (
    <>
      {stores && (
        <div className="all-stores">
          {stores.map(({ store, products }, key) => {
            const {
              urlLogo,
              name,
              description,
              shippingTerms,
              paymentOptions,
            } = store;

            return (
              <div key={key} className="all-stores-store">
                <img src={urlLogo} alt={name} />
                <div className="all-stores-store-information">
                  <h2 className="all-stores-store-information-title">{name}</h2>
                  <span>{description}</span>
                  <span>{products} productos</span>
                </div>
                {shippingTerms && (
                  <div className="all-stores-store-shipping">
                    {shippingTerms.map((item, key) => {
                      return <span key={key}>{item}</span>;
                    })}
                  </div>
                )}
                {paymentOptions && (
                  <div className="all-stores-store-payments">
                    {paymentOptions.map((item, key) => {
                      return <span key={key}>{item}</span>;
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

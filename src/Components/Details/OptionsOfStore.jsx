import React, { useState } from "react";
import "./Details.scss";
import { Link } from "react-router-dom";

export const OptionsOfStore = ({ name, shippingTerms, paymentOptions }) => {
  const [viewShippingTerms, setViewShippingTerms] = useState(false);
  const [viewPaymentOptions, setViewPaymentOptions] = useState(false);

  const showViewShippingTerms = () => {
    setViewShippingTerms(!viewShippingTerms);
    setViewPaymentOptions(false);
  };
  const showViewPaymentOptions = () => {
    setViewPaymentOptions(!viewPaymentOptions);
    setViewShippingTerms(false);
  };

  return (
    <div className="optionsOfStore">
      <span>Vendido por: {name}</span>
      <div className="containerOptions">
        {shippingTerms && (
          <ShowOptions
            array={shippingTerms}
            title={"envío"}
            fnShowOption={showViewShippingTerms}
            showOption={viewShippingTerms}
          />
        )}
        {paymentOptions && (
          <ShowOptions
            array={paymentOptions}
            title={"pago"}
            fnShowOption={showViewPaymentOptions}
            showOption={viewPaymentOptions}
          />
        )}
      </div>
    </div>
  );
};

const ShowOptions = ({ array, title, fnShowOption, showOption }) => {
  return (
    <div className="singleOption">
      <button onClick={fnShowOption}>Opciones de {title}</button>
      {showOption && (
        <div>
          {array.map((item, key) => {
            if (item.includes("http") || item.includes("www"))
              return (
                <Link to={item} key={key}>
                  Ver más
                </Link>
              );
            else return <label key={key}>{item}</label>;
          })}
        </div>
      )}
    </div>
  );
};

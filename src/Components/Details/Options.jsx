import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import $ from "jquery";
import "./Options.scss";

export const Options = ({ shippingTerms, paymentOptions }) => {
  const location = useLocation();

  const setViewShip = () => {
    $(`.btn1Ship`).addClass("isActive");
    $(`.btn2Pay`).removeClass("isActive");
    $(`.option1`).toggleClass("hiddenOption");
    $(`.option2`).addClass("hiddenOption");
  };

  const setViewPay = () => {
    $(`.btn2Pay`).addClass("isActive");
    $(`.btn1Ship`).removeClass("isActive");
    $(`.option1`).addClass("hiddenOption");
    $(`.option2`).toggleClass("hiddenOption");
  };

  useEffect(() => {
    if ($("#outlet-content")[0].offsetWidth <= 800) {
      $(`.option1`).addClass("hiddenOption");
      $(`.option2`).addClass("hiddenOption");
    }
  }, [location]);

  return (
    <div id="options-container">
      {shippingTerms && paymentOptions && (
        <>
          <TwoOptions
            array={shippingTerms}
            title="envío"
            setView={setViewShip}
            myClass={"btn1Ship"}
            optionClass={"option1"}
          ></TwoOptions>
          <TwoOptions
            array={paymentOptions}
            title="pago"
            setView={setViewPay}
            myClass={"btn2Pay"}
            optionClass={"option2"}
          ></TwoOptions>
        </>
      )}
    </div>
  );
};

const TwoOptions = ({ array, title, view, setView, myClass, optionClass }) => {
  return (
    <div className="options">
      <button
        className={`${title != "pago" ? "isActive" : ""} ${myClass}`}
        onClick={setView}
      >
        Opciones de {title}
      </button>
      <span>Opciones de {title}</span>
      <div className={optionClass}>
        {array.map((item, key) => {
          if (item.includes("http") || item.includes("www"))
            return (
              <Link to={item} key={key} target="_blank">
                Ver más
              </Link>
            );
          else return <label key={key}>{item}</label>;
        })}
      </div>
    </div>
  );
};

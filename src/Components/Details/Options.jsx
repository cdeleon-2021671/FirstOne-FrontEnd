import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import $ from "jquery";
import "./Options.scss";

export const Options = ({ shippingTerms, paymentOptions }) => {
  const location = useLocation();

  const setViewShip = () => {
    $(`.btn1Ship`).addClass("isActive");
    $(`.btn2Pay`).removeClass("isActive");
    $(`.option1`).toggleClass("hiddenOption");
    $(`.option2`).addClass("hiddenOption");
    $(`#arrowIcon1`).toggleClass("animateIcon");
    $(`#arrowIcon2`).removeClass("animateIcon");
    $();
  };

  const setViewPay = () => {
    $(`.btn2Pay`).addClass("isActive");
    $(`.btn1Ship`).removeClass("isActive");
    $(`.option1`).addClass("hiddenOption");
    $(`.option2`).toggleClass("hiddenOption");
    $(`#arrowIcon2`).toggleClass("animateIcon");
    $(`#arrowIcon1`).removeClass("animateIcon");
  };

  useEffect(() => {
    if ($("#root")[0].offsetWidth <= 800) {
      $(`.option1`).addClass("hiddenOption");
      $(`.btn1Ship`).addClass("isActive");
      $(`.option2`).addClass("hiddenOption");
      $(`.btn2Pay`).removeClass("isActive");
      $(`#arrowIcon1`).removeClass("animateIcon");
      $(`#arrowIcon2`).removeClass("animateIcon");
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
            arrowNumber={"arrowIcon1"}
          ></TwoOptions>
          <TwoOptions
            array={paymentOptions}
            title="pago"
            setView={setViewPay}
            myClass={"btn2Pay"}
            optionClass={"option2"}
            arrowNumber={"arrowIcon2"}
          ></TwoOptions>
        </>
      )}
    </div>
  );
};

const TwoOptions = ({ array, title, arrowNumber, setView, myClass, optionClass }) => {
  return (
    <div className="options">
      <button
        className={`${title != "pago" ? "isActive" : ""} ${myClass}`}
        onClick={setView}
      >
        Opciones de {title}{" "}
        <label>
          <IoIosArrowDown id={arrowNumber} />
        </label>
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

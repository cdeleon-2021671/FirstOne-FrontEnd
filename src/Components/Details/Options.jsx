import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "./Options.scss";

export const Options = ({ shippingTerms, paymentOptions }) => {
  return (
    <div id="options-container">
      {shippingTerms && paymentOptions && (
        <>
          <TwoOptions array={shippingTerms} title="envío"></TwoOptions>
          <TwoOptions array={paymentOptions} title="pago"></TwoOptions>
        </>
      )}
    </div>
  );
};

const TwoOptions = ({ array, title }) => {
  const fnOpen = (e) => {
    if(e.target.id == 'btn1'){
        $('#btn2').removeClass('isActive');
        $('#btn1').addClass('isActive');
        $('.option2').removeClass('showOptions')
        $('.option1').toggleClass('showOptions');
    }else {
        $('#btn1').removeClass('isActive')
        $('#btn2').addClass('isActive')
        $('.option1').removeClass('showOptions')
        $('.option2').toggleClass('showOptions')
    }
  };
  return (
    <div className="options">
      <button
        className={`${title != "pago" ? "isActive" : ""}`}
        id={`${title != 'pago' ? 'btn1' : 'btn2'}`}
        onClick={fnOpen}
      >
        Opciones de {title}
      </button>
      <span>Opciones de {title}</span>
      <div className={`${title != 'pago' ? 'option1' : 'option2'}`}>
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

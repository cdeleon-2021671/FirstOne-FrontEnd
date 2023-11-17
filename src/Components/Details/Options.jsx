import React from "react";
import { FaShippingFast, FaRegMoneyBillAlt, FaAngleDown } from "react-icons/fa";
import { RiLuggageDepositLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { FaRegCreditCard } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { Link } from "react-router-dom";
import $ from "jquery";

export const Options = ({ shippingTerms, paymentOptions }) => {
  const showShipping = () => {
    if (window.innerWidth <= 6800) {
      $(".options-shipping").toggleClass("isActive");
      $(".options-shipping label").addClass("isActive");
      $(".options-payments").removeClass("isActive");
      $(".options-payments label").removeClass("isActive");
    }
  };

  const showPayments = () => {
    if (window.innerWidth <= 600) {
      $(".options-payments").toggleClass("isActive");
      $(".options-payments label").addClass("isActive");
      $(".options-shipping").removeClass("isActive");
      $(".options-shipping label").removeClass("isActive");
    }
  };

  const options = {
    "Pago contra entrega": <TbTruckDelivery />,
    Depósito: <RiLuggageDepositLine />,
    "Tarjetas de crédito o débito": <FaRegCreditCard />,
    "Pago en cuotas": <BsCashCoin />,
  };

  return (
    <div className="options">
      {shippingTerms && (
        <div className="options-shipping">
          <label onClick={showShipping} className="isActive">
            <FaShippingFast></FaShippingFast>
            Formas de envío
            <small>
              <FaAngleDown></FaAngleDown>
            </small>
          </label>
          {shippingTerms.map((item, key) => {
            if (item.includes("http") || item.includes("www"))
              return (
                <Link key={key} to={item}>
                  Ver más
                </Link>
              );
            else item.includes("http") || item.includes("www");
            return <span key={key}>{item}</span>;
          })}
        </div>
      )}
      {paymentOptions && (
        <div className="options-payments">
          <label onClick={showPayments}>
            <FaRegMoneyBillAlt></FaRegMoneyBillAlt>
            Métodos de pago
            <small>
              <FaAngleDown></FaAngleDown>
            </small>
          </label>
          {paymentOptions.map((item, key) => {
            if (item.includes("http") || item.includes("www"))
              return (
                <Link key={key} to={item}>
                  Ver más
                </Link>
              );
            else item.includes("http") || item.includes("www");
            return (
              <span key={key}>
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

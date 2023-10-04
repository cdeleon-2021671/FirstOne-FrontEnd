import React from "react";
import { Link } from "react-router-dom";
import { LiaShippingFastSolid } from "react-icons/lia";
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

  return (
    <div className="options">
      {shippingTerms && (
        <div className="options-shipping">
          <label onClick={showShipping} className="isActive">
            <LiaShippingFastSolid></LiaShippingFastSolid>
            Opciones de envío
            {Icons[1]}
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
            {Icons[0]}
            Opciones de pago
            {Icons[1]}
          </label>
          {paymentOptions.map((item, key) => {
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
    </div>
  );
};

const Icons = [
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    fillOpacity={0}
  >
    <path
      strokeLinecap="round"
      strokeLineJoin="round"
      d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
    />
  </svg>,
  <small>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fillOpacity={0}
      id="optionArrow"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  </small>,
];

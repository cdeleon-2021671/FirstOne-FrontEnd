import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import "./Carrusel.scss";
import $ from "jquery";
import { CardProducts } from "./CardProducts";

export const Carrusel = ({ products, title }) => {
  const containerRef = useRef(null);
  const classLeft = v4();
  const classRight = v4();

  const moveLeft = () => {
    const container = containerRef.current;
    const widthItem = $("#item-card")[0].offsetWidth + 16;
    const { scrollLeft } = container;
    container.scrollLeft -= widthItem;
    if (scrollLeft <= widthItem) $(`.${classLeft}`).addClass("inactive");
    $(`.${classRight}`).removeClass("inactive");
  };

  const moveRight = () => {
    const container = containerRef.current;
    const widthItem = $("#item-card")[0].offsetWidth + 16;
    const { scrollLeft } = container;
    const { scrollWidth } = container;
    const { clientWidth } = container;
    const scrollRight = scrollWidth - clientWidth - scrollLeft;
    container.scrollLeft += widthItem * 2;
    if (scrollRight <= widthItem * 2) $(`.${classRight}`).addClass("inactive");
    $(`.${classLeft}`).removeClass("inactive");
  };

  const goToDetails = () => {
    window.scrollTo({ top: 0 });
    containerRef.current.scrollTo({ left: 0 });
  };

  return (
    <>
      {products && products.length !== 0 && (
        <div className="products">
          <h2 className="products-title">
            <span>{title}</span>
          </h2>
          <div className="products-container key-container-products">
            <button
              className={`btnLeft ${classLeft} inactive`}
              onClick={moveLeft}
            >
              {arrows[0]}
            </button>
            <div className="products-container-content" ref={containerRef}>
              {products.map((item) => {
                return (
                  <CardProducts
                    item={item}
                    fnAction={goToDetails}
                    key={item._id}
                  ></CardProducts>
                );
              })}
            </div>
            <button className={`btnRight ${classRight}`} onClick={moveRight}>
              {arrows[1]}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const arrows = [
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    fillOpacity={0}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>,
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    fillOpacity={0}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 4.5l7.5 7.5-7.5 7.5"
    />
  </svg>,
];

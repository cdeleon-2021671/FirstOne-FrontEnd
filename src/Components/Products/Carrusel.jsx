import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import "./Carrusel.scss";
import $ from "jquery";

export const Carrusel = ({ products, title }) => {
  const containerRef = useRef(null);
  const classLeft = v4();
  const classRight = v4();

  const moveLeft = () => {
    const container = containerRef.current;
    const widthItem = $("#item-card")[0].clientWidth + 10;
    const { scrollLeft } = container;
    container.scrollLeft -= widthItem;
    if (scrollLeft <= widthItem) $(`.${classLeft}`).addClass("inactive");
    $(`.${classRight}`).removeClass("inactive");
  };

  const moveRight = () => {
    const container = containerRef.current;
    const widthItem = $("#item-card")[0].clientWidth + 10;
    const { scrollLeft } = container;
    const { scrollWidth } = container;
    const { clientWidth } = container;
    const scrollRight = scrollWidth - clientWidth - scrollLeft;
    container.scrollLeft += widthItem;
    if (scrollRight <= widthItem) $(`.${classRight}`).addClass("inactive");
    $(`.${classLeft}`).removeClass("inactive");
  };

  const goToDetails = ()=>{
    window.scrollTo({top: 0})
    containerRef.current.scrollTo({left: 0});
  }

  return (
    <>
      {products && (
        <div className="products">
          <h2 className="products-title">{title}</h2>
          <div className="products-container">
            <button
              className={`btnLeft ${classLeft} inactive`}
              onClick={moveLeft}
            >
              {arrows[0]}
            </button>
            <div className="products-container-content" ref={containerRef}>
              {products.map((item) => {
                const newOffer = (item.price * 100) / item.salePrice;
                const offer = 100 - newOffer;
                const nameUrl = item.name.replace(
                  /[-[\]{}()*+?.,;:#@<>\\^$|#"']+/g,
                  " "
                );
                const tagsUrl = item.tags
                  .map((element) => element.replace(/[ ]+/g, "-"))
                  .join("-");
                const priceUrl = item.price;
                const id = item._id;
                return (
                  <Link
                    id="item-card"
                    className="card"
                    key={item._id}
                    to={`/${nameUrl.replace(
                      /[ ]+/g,
                      "-"
                    )}/${tagsUrl}/${priceUrl}/${id}`}
                    onClick={goToDetails}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="card-image"
                    />
                    <div className="card-information">
                      <h3 className="card-information-product">{item.name}</h3>
                      <Link
                        className="card-information-store"
                        title={item.storeId.name}
                        to={`/${item.storeId.name.replace(/[ ]+/g, "-")}/${
                          item.storeId._id
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        Producto vendido por {item.storeId.name}
                      </Link>
                      <div className="price">
                        {item.salePrice && (
                          <span className="price-porcent">-{offer}%</span>
                        )}
                        <div className="price-price">
                          <span>Q{item.price.toFixed(2).split(".")[0]}.</span>
                          <span className="little">
                            {item.price.toFixed(2).split(".")[1]}
                          </span>
                        </div>
                      </div>
                      <div className="card-information-salePrice">
                        {item.salePrice && (
                          <div className="normal">
                            Precio normal: &nbsp;
                            <span>Q{item.salePrice.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="aditional">
                          <span>
                            {item.condition} - {item.views} vistas
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
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

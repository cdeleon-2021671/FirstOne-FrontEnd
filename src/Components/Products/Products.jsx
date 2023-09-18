import React, { useRef, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import $ from "jquery";
import "./Products.scss";

export const Products = ({ products, title, classRight, classLeft }) => {
  const containerRef = useRef(null);
  const location = useLocation();

  const moveRight = () => {
    const container = containerRef.current;
    container.scrollLeft += 450;
    const { scrollWidth } = container;
    const { scrollLeft } = container;
    const { clientWidth } = container;
    const scrollRight = scrollWidth - clientWidth - scrollLeft;
    $(`.${classLeft}`).removeClass("hiddenButton");
    if (scrollRight <= 450) $(`.${classRight}`).addClass("hiddenButton");
  };

  const moveLeft = () => {
    const container = containerRef.current;
    container.scrollLeft -= 450;
    const { scrollLeft } = container;
    $(`.${classRight}`).removeClass("hiddenButton");
    if (scrollLeft <= 450) $(`.${classLeft}`).addClass("hiddenButton");
  };

  useEffect(() => {
    containerRef.current.scrollLeft = 0;
    $(`.${classRight}`).removeClass("hiddenButton");
    $(`.${classLeft}`).addClass("hiddenButton");
  }, [location]);

  return (
    <>
      {products && (
        <div className="products-container">
          <h1>{title}</h1>
          <div className="products-content">
            <button className={`${classLeft} hiddenButton`} onClick={moveLeft}>
              <IoIosArrowBack />
            </button>
            <div className="products" ref={containerRef}>
              {products.map((product, key) => (
                <MediaCard key={key} {...product} />
              ))}
            </div>
            <button className={`${classRight}`} onClick={moveRight}>
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const MediaCard = (product) => {
  const { image, name, storeId, price, _id } = product;

  return (
    <Link className="single" to={`/product/${name}/${_id}`}>
      <img src={image} alt={name} />
      <div>
        <h4>
          {name} - {storeId.name}
        </h4>
        <h3>QTQ: {price.toFixed(2)}</h3>
      </div>
    </Link>
  );
};

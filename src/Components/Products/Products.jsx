import React, { useRef, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { v4 } from "uuid";
import $ from "jquery";
import "./Products.scss";

export const Products = ({ products, title }) => {
  const containerRef = useRef(null);
  const classRight = v4();
  const classLeft = v4();
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
          <div className="container">
            <h2>{title}</h2>
            <div className="products-content">
              <button className={`${classLeft} btnLeft2 hiddenButton`}>
                <IoIosArrowBack
                  onClick={moveLeft}
                />
              </button>
              <div className="products" ref={containerRef}>
                {products.map((product, key) => (
                  <MediaCard key={key} {...product} />
                ))}
              </div>
              <button className={`${classRight} btnRight2`}>
                <IoIosArrowForward onClick={moveRight} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const MediaCard = (product) => {
  const { image, name, storeId, price, tags, _id } = product;
  const categorias = tags.join('-');
  return (
    <Link className="single" to={`/${name}/${categorias}/${price}/${_id}`}>
      <img src={image} alt={name} />
      <div>
        <h4>
          {name} - {storeId.name}
        </h4>
        <h3>GTQ: {price.toFixed(2)}</h3>
      </div>
    </Link>
  );
};

import React, { useContext, useRef } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { AuthContext } from "../../Index";
import "./Products.scss";

export const AllProducts = () => {
  const { products } = useContext(AuthContext);
  const containers = products && products.map(() => useRef(null));

  const moveRight = (index) => {
    const container = containers[index].current;
    const {clientWidth} = container;
    const {scrollWidth} = container;
    const {scrollLeft} = container;
    const scrollRight = scrollWidth - clientWidth - scrollLeft;
    if(scrollRight == 0) container.scrollLeft = 0
    else container.scrollLeft += 500;
  };

  const moveLeft = (index) => {
    const container = containers[index].current;
    const {scrollLeft} = container;
    const {scrollWidth} = container;
    if(scrollLeft == 0) container.scrollLeft = scrollWidth
    else container.scrollLeft -= 500;
  };

  return (
    <>
      {products && (
        <div className="productsContainer">
          <h1>Populares</h1>
          {products.map((elements, key) => (
            <div key={key} className="products">
              <button onClick={() => moveLeft(key)}>
                <MdOutlineArrowBackIos />
              </button>
              <div className="singleProduct" ref={containers[key]}>
                {elements.map(({ name, image, price, _id, storeId }) => (
                  <div key={_id}>
                    <img src={image} alt={name} />
                    <span>
                      {name} | <b>{storeId.name}</b> <br /> Q{price}
                    </span>
                  </div>
                ))}
              </div>
              <button onClick={() => moveRight(key)}>
                <MdOutlineArrowForwardIos />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Index";
import "./Categories.scss";

export const Categories = () => {
  const { tags } = useContext(AuthContext);
  const containers = tags && tags.map(() => useRef(null));

  useEffect(() => {
    setTimeout(() => {
      containers.forEach((element, key) => {
        const { scrollWidth } = element.current;
        if (!Number.isInteger(key / 2)) element.current.scrollLeft = scrollWidth;
      });
    }, 500);
  }, []);

  return (
    <>
      {tags && (
        <div className="categoriesContainer">
          {tags.map((item, key) => (
            <div key={key} className="singleContainer" ref={containers[key]}>
              {item.map(({ tag, product }, key2) => (
                <div key={key2}>
                  <img src={product.image} alt={tag} />
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import "./Categories.scss";

export const Categories = ({ categories, url = "" }) => {
  return (
    <>
      {categories && categories.length !== 0 && (
        <div className="categories">
          {categories.map(({ tag, product }, key) => (
            <Link
              key={key}
              className="categories-item"
              title={tag}
              to={`/${tag.replace(/[ ]+/g, "-")}${url}`}
            >
              <div>
                <img src={product.image} alt={tag} />
              </div>
              <label>
                <span>
                  {tag} | {product.storeId.name}
                </span>
              </label>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

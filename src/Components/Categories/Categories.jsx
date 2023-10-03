import React from "react";
import { Link } from "react-router-dom";
import "./Categories.scss";

export const Categories = ({ categories, url = "" }) => {
  return (
    <>
      {categories && categories.length !== 0 && (
        <div className="categories">
          {categories.map(({ tag, product }, key) => (
            <Link key={key} className="categories-item" to={`/${tag.replace(/[ ]+/g, '-')}${url}`}>
              <div>
                <img src={product.image} alt={tag} />
              </div>
              <label>
                {tag} | {product.storeId.name}
              </label>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

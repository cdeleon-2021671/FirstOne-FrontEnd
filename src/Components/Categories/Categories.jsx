import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Categories.scss";
import $ from "jquery";

export const Categories = ({ tags, url }) => {

  useEffect(() => {
    tags.forEach(({ product }) => {
      $(`.container-${product._id}`).css(
        "background-image",
        `url(${product.image})`
      );
    });
  }, [tags]);

  return (
    <>
      {tags && (
        <div id="categories-container">
          {tags.map(({ tag, product }) => (
            <Link
              key={product._id}
              className={`container-${product._id}`}
              to={`/${url}/${tag.replace('#', '')}`}
              title={tag}
            >
              <span>
                {tag} <br />
                <b>| {product.storeId.name}</b>
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

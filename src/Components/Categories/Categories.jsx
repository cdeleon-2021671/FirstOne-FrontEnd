import React from 'react';
import "./Categories.scss";

export const Categories = ({ allTags }) => {
  return (
    <>
      {allTags && (
        <div className="categoriesContainer">
          {allTags.map(({ product, tag }) => (
            <div className="singleCategory" key={product._id}>
              <img src={product.image} alt={tag} />
              <div>
                <span>{tag}</span>
                <span>
                  | <b>{product.storeId.name}</b>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

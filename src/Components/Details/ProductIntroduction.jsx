import React from "react";
import './Details.scss';

export const ProductIntroduction = ({ name, image, views, price }) => {
  return (
    <div  className="detailaOfProduct">
      <span>
        {name} {views}
      </span>
      <div>
        <img src={image} alt={name} />
      </div>
      <span className="price">Q{price.toFixed(2)}</span>
    </div>
  );
};

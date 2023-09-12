import React from "react";
import "./Introduction.scss";

export const StoreIntroduction = ({ urlLogo, name, description }) => {
  return (
    <div className="storeIntroduction">
      <div></div>
      <img src={urlLogo} alt={name} />
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
};

import React from "react";
import "./Introduction.scss";
import ReactHtmlParser from "react-html-parser";

export const Introduction = ({ name, urlLogo, description }) => {
  return (
    <div id="store-introduction">
      <img src={urlLogo} alt={name} />
      <div className="introduction">
        <h2>{name}</h2>
        <p className="description">{ReactHtmlParser(description)}</p>
      </div>
    </div>
  );
};

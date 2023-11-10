import React from "react";
import "./Introduction.scss";
import ReactHtmlParser from "react-html-parser";

export const Introduction = ({ name, urlLogo, description }) => {
  return (
    <div id="store-introduction">
      <div style={{ backgroundImage: `url(${urlLogo})` }}></div>
      <div className="introduction">
        <h2>{name}</h2>
        {ReactHtmlParser(description)}
      </div>
    </div>
  );
};

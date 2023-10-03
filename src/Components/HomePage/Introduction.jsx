import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Index";
import { Link } from "react-router-dom";
import "./Introduction.scss";
import $ from "jquery";

export const Introduction = () => {
  const { stores } = useContext(AuthContext);

  const resizeWindow = () => {
    const tablet = "https://api.tienda.gt/image/tablet";
    const phone = "https://api.tienda.gt/image/phone";
    const computer = "https://api.tienda.gt/image/computer";
    const { innerWidth } = window;
    if (innerWidth <= 500) {
      $(".home-introduction-banner")[0].src = phone;
    } else if (innerWidth <= 700) {
      $(".home-introduction-banner")[0].src = tablet;
    } else $(".home-introduction-banner")[0].src = computer;
  };

  useEffect(() => {
    resizeWindow();
    $(window).on("resize", resizeWindow);
    return () => {
      $(window).off("resize");
    };
  }, []);

  return (
    <div className="home-introduction">
      <img
        src="https://api.tienda.gt/image/computer"
        alt="Tienda.gt"
        crossOrigin="anonymous"
        className="home-introduction-banner"
      />
      {stores && (
        <div className="home-introduction-stores">
          <div className="home-introduction-stores-container">
            {stores.map(({ store }, key) => {
              const { name, urlLogo, _id } = store;
              return (
                <Link
                  className={`home-introduction-stores-container-item`}
                  to={`/${name.replace(/[ ]+/g, "-")}/${_id}`}
                  key={key}
                >
                  <img src={urlLogo} alt={name} title={name} />
                  <span>{name}</span>
                </Link>
              );
            })}
            {stores.map(({ store }, key) => {
              const { name, urlLogo, _id } = store;
              return (
                <Link
                  className={`home-introduction-stores-container-item`}
                  to={`/${name.replace(/[ ]+/g, "-")}/${_id}`}
                  key={key}
                >
                  <img src={urlLogo} alt={name} title={name} />
                  <span>{name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

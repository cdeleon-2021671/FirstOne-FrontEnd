import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Index";
import { Link } from "react-router-dom";
import "./Introduction.scss";
import $ from "jquery";
import { v4 } from "uuid";
import { useRef } from "react";

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const Introduction = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, 
  };

  const { stores } = useContext(AuthContext);
  const containerRef = useRef();
  const classRight = v4();
  const classLeft = v4();

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

  const moveLeft = () => {
    const container = containerRef.current;
    const widthItem = $("#item-card2")[0].clientWidth;
    const { scrollLeft } = container;
    container.scrollLeft -= widthItem;
    if (scrollLeft <= widthItem) $(`.${classLeft}`).addClass("inactive");
    $(`.${classRight}`).removeClass("inactive");
  };

  const moveRight = () => {
    const container = containerRef.current;
    const widthItem = $("#item-card2")[0].clientWidth;
    const { scrollLeft } = container;
    const { scrollWidth } = container;
    const { clientWidth } = container;
    const scrollRight = scrollWidth - clientWidth - scrollLeft;
    container.scrollLeft += widthItem;
    if (scrollRight <= widthItem) $(`.${classRight}`).addClass("inactive");
    $(`.${classLeft}`).removeClass("inactive");
  };

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
            <button
              className={`btnLeft1 ${classLeft} inactive`}
              onClick={moveLeft}
            >
              {arrows[0]}
            </button>
              <div ref={containerRef} id="stores-container">
                {stores.map(({ store }, key) => {
                  const { name, urlLogo, _id } = store;
                  return (
                    <Link
                      className={`home-introduction-stores-container-item`}
                      to={`/${name.replace(/[ ]+/g, "-")}/${_id}`}
                      key={key}
                      id="item-card2"
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
            <button className={`btnRight1 ${classRight}`} onClick={moveRight}>
              {arrows[1]}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const arrows = [
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    fillOpacity={0}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>,
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    fillOpacity={0}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 4.5l7.5 7.5-7.5 7.5"
    />
  </svg>,
];

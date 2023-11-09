import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Index";
import { Link } from "react-router-dom";
import "./Introduction.scss";
import $ from "jquery";

export const Introduction = () => {
  const { stores } = useContext(AuthContext);
  const computer = "https://api.tienda.gt/image/computer";
  const tablet = "https://api.tienda.gt/image/phone";
  const phone = "https://api.tienda.gt/image/tablet";
  const [banner, setBanner] = useState(computer);

  const heightContainer = () => {
    const img = $(".home-introduction-banner");
    if (img) {
      const { offsetHeight } = img[0];
      const homeIntroduction = $(".home-introduction")[0];
      if (offsetHeight > 50) {
        homeIntroduction.style.height = offsetHeight + "px";
      } else {
        homeIntroduction.style.height = "auto";
      }
    }
  };

  const getImage = () => {
    if (window.innerWidth <= 500) setBanner(phone);
    else if (window.innerWidth <= 700) setBanner(tablet);
    else setBanner(computer);
  };

  const getHeight = () => {
    let flag = 1;
    const gettingHeight = setInterval(() => {
      heightContainer();
      if (flag == 3) clearInterval(gettingHeight);
      else flag++;
    }, 700);
  };

  useEffect(() => {
    getImage();
    getHeight();
    $(window).on("resize", getHeight);
    return () => {
      $(window).off("resize");
    };
  }, []);

  return (
    <>
      <div className="home-introduction">
        <img
          src={banner}
          alt="Tienda.gt"
          crossOrigin="anonymous"
          className="home-introduction-banner"
        />
      </div>
    </>
  );
};

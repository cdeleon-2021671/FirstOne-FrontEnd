import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Introduction.scss";
import axios from "axios";
import $ from "jquery";

export const Introduction = () => {
  const [imgBanner, setImgBanner] = useState(null);
  const [stores, setStores] = useState(null);

  const getStores = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URI_API}/store/get-stores`
      );
      const { stores } = data;
      setStores(stores);
    } catch (err) {
      console.log(err);
    }
  };

  const heightContainer = () => {
    const date = new Date();
    const start = date.getSeconds();
    const getImg = setInterval(() => {
      const end = date.getSeconds();
      const img = $(".home-introduction-banner");
      if (img && img.length != 0) {
        const { offsetHeight } = img[0];
        if (offsetHeight > 50) {
          const fnColor = getComputedStyle(document.documentElement);
          const color = fnColor.getPropertyValue("--color-secundario");
          $(".home-introduction").css("height", offsetHeight);
          $(".home-introduction").css("background", color);
          clearInterval(getImg);
        } else if (end - start >= 3) {
          $(".home-introduction").css("height", "auto");
          clearInterval(getImg);
        }
      } else if (end - start >= 3) {
        $(".home-introduction").css("height", "auto");
        clearInterval(getImg);
      }
    }, 500);
  };

  const resizeWindow = () => {
    let img = "https://api.tienda.gt/image/computer";
    if (window.innerWidth <= 500) {
      img = "https://api.tienda.gt/image/phone";
    } else if (window.innerWidth <= 700) {
      img = "https://api.tienda.gt/image/tablet";
    }
    setImgBanner(img);
    heightContainer();
  };

  useEffect(() => {
    getStores();
    resizeWindow();
    $(window).on("resize", resizeWindow);
    return () => {
      $(window).off("resize");
    };
  }, []);

  return (
    <>
      <div className="home-introduction">
        <img
          src={imgBanner}
          alt="Tienda.gt"
          crossOrigin="anonymous"
          className="home-introduction-banner"
        />
        {stores && stores.length != 0 && (
          <>
            <div className="container-animation">
              {stores.length == 1 ? (
                <>
                  <Items stores={stores}></Items>
                  <Items stores={stores}></Items>
                  <Items stores={stores}></Items>
                  <Items stores={stores}></Items>
                  <Items stores={stores}></Items>
                </>
              ) : stores.length <= 3 ? (
                <>
                  <Items stores={stores}></Items>
                  <Items stores={stores}></Items>
                  <Items stores={stores}></Items>
                </>
              ) : (
                stores.length >= 4 && (
                  <>
                    <Items stores={stores}></Items>
                    <Items stores={stores}></Items>
                  </>
                )
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

const Items = ({ stores }) => {
  return (
    <div className="home-introduction-stores">
      {stores.map(({ store }, key) => {
        const { name, urlLogo, _id } = store;
        return (
          <Link
            className={`home-introduction-stores-item`}
            to={`/${name.replace(/[ ]+/g, "-")}/${_id}`}
            key={key}
          >
            <img src={urlLogo} alt={name} title={name} />
            <span>{name}</span>
          </Link>
        );
      })}
    </div>
  );
};

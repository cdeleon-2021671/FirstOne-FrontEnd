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

  useEffect(() => {
    heightContainer();
    getImage();

    const handleResize = () => {
      heightContainer();
      getImage();
    };
    $(window).on("resize", handleResize);
    return () => {
      $(window).off("resize", handleResize);
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

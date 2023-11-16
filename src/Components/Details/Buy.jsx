import React, { useContext, useEffect, useState } from "react";
import FingerPrint from "@fingerprintjs/fingerprintjs";
import { Link, useLocation } from "react-router-dom";
import { Phone } from "../Modals/Phone";
import { AuthContext } from "../../Index";
import axios from "axios";
import $ from "jquery";

export const Buy = ({ product }) => {
  const { urlProduct, storeId } = product;
  const [view, setView] = useState(false);
  const { socialLinks, isLogged, user } = useContext(AuthContext);
  const location = useLocation();
  const [social, setSocial] = useState(null);
  const rrss = [
    urlProduct,
    storeId.whatsapp,
    storeId.messenger,
    storeId.facebook,
    storeId.instagram,
    storeId.phone,
    storeId.tiktok,
  ];

  const getSocialLinks = () => {
    const newSocial = [];
    rrss.forEach((item, key) => {
      const icon = socialLinks[key].element;
      const title = socialLinks[key].title;
      const bg = socialLinks[key].color;
      const object = {
        icon: icon,
        bg: title == "TikTok" || title == "Tienda" ? "#000" : bg,
        title: title,
        link: title == "Whatsapp" ? `https://wa.me/${item}` : item,
      };
      if (item != "") newSocial.push(object);
    });
    setSocial(newSocial);
  };

  const scrolling = () => {
    if (window.innerWidth <= 800) {
      const options = $(".social-links")[0].clientHeight;
      const description = $(
        ".details-content-description"
      )[0].getBoundingClientRect().bottom;
      const { innerHeight } = window;
      const flag = innerHeight - description - options - 8;
      if (flag < 0) $(".social-links").addClass("isActive");
      else $(".social-links").removeClass("isActive");
    }
  };

  useEffect(() => {
    scrolling();
    $(window).on("scroll", scrolling);
    return () => {
      $(window).off("scroll");
    };
  }, []);

  useEffect(() => {
    getSocialLinks();
  }, [product]);

  const showModal = () => {
    setView(true);
    $("body").css("overflow", "hidden");
    $("#navbar").css("position", "static");
    $(".key-card-image").css("backdrop-filter", "none");
    $(".key-container-products").css("position", "static");
  };

  const hiddenModal = () => {
    setView(false);
    $("body").css("overflow", "auto");
    $("#navbar").css("position", "relative");
    $(".key-card-image").css("backdrop-filter", "blur(10px)");
    $(".key-container-products").css("position", "relative");
  };

  const addEvent = async (title) => {
    try {
      if (isLogged && user.rol != "CLIENTE") return;
      const url = `https://tienda.gt${location.pathname}`;
      const fp = await FingerPrint.load();
      const { visitorId } = await fp.get();
      await axios.post(`${import.meta.env.VITE_ANALYSTICS}/newEvent/add-event`, {
        url: url,
        fingerprint: visitorId,
        product: product,
        event: "Contact",
        type: title,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {view && (
        <Phone
          title={"Número de teléfono"}
          content={storeId.phone}
          action={hiddenModal}
        ></Phone>
      )}
      <div className="social-links">
        <span>Compralo en:</span>
        <div className="social-links-icons">
          {social &&
            social.map(({ title, link, icon, bg }, key) => {
              if (title.includes("Phone")) {
                return (
                  <label
                    className="item"
                    key={key}
                    style={{ cursor: "pointer", background: "#000" }}
                    title="Teléfono"
                    onClick={showModal}
                  >
                    {icon}
                  </label>
                );
              }
              return (
                <Link
                  key={key}
                  to={link}
                  target={link == "" ? "" : "_blank"}
                  title={title}
                  className="item"
                  onClick={() => {
                    addEvent(title);
                  }}
                  style={{ background: bg }}
                >
                  {icon}
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
};

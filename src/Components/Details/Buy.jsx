import React, { useContext, useEffect, useState } from "react";
import FingerPrint from "@fingerprintjs/fingerprintjs";
import { AuthContext } from "../../Index";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import $ from "jquery";

export const Buy = (product) => {
  const {urlProduct, storeId} = product;
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
        bg: bg,
        title: title == "Phone" ? item : title,
        link:
          title == "Whatsapp"
            ? `https://wa.me/${item}`
            : title == "Phone"
            ? ""
            : item,
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
  }, [urlProduct]);

  const addEvent = async (title) => {
    try {
      if (isLogged && user.rol != "CLIENTE") return;
      const url = `https://tienda.gt${location.pathname}`;
      const fp = await FingerPrint.load();
      const { visitorId } = await fp.get();
      await axios.post(`${import.meta.env.VITE_ANALYSTICS}/event/add-event`, {
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
    <div className="social-links">
      <span>Compralo en:</span>
      {social &&
        social.map(({ title, link, icon, bg }, key) => {
          if (title.includes("+")) {
            return (
              <label className="item" key={key} style={{ cursor: "text" }}>
                {icon}
                {title}
              </label>
            );
          }
          return (
            <Link
              key={key}
              to={link}
              target={link == "" ? "" : "_blank"}
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
  );
};

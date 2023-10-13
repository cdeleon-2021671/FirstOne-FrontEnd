import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Index";
import $ from "jquery";

export const Buy = ({ urlProduct, storeId }) => {
  const { socialLinks } = useContext(AuthContext);
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
              style={{ background: bg }}
            >
              {icon}
            </Link>
          );
        })}
    </div>
  );
};

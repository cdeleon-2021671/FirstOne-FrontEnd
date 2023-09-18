import React, { useContext, useEffect, useState, useRef } from "react";
import "./Description.scss";
import { AuthContext } from "../../Index";
import $ from "jquery";
import { Link } from "react-router-dom";

export const Description = ({ description, urlProduct, storeId }) => {
  const { socialLinks } = useContext(AuthContext);
  const [social, setSocial] = useState(null);
  const menuRef = useRef(null);
  const myRef = useRef(null);

  const ssll = [
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
    ssll.forEach((item, key) => {
      const icon = socialLinks[key].element;
      const title = socialLinks[key].title;
      const object = {
        icon: icon,
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

  useEffect(() => {
    getSocialLinks();
  }, [urlProduct]);

  const moveScroll = () => {
    $("#outlet-content").on("scroll", () => {
      if ($("#outlet-content")[0].offsetWidth <= 670) {
        const positionScroll =
          $("#outlet-content")[0].offsetHeight +
          $("#header-content")[0].offsetHeight -
          myRef.current.getBoundingClientRect().top -
          myRef.current.offsetHeight;
        const positionRef = menuRef.current.offsetHeight;
        if (positionRef < positionScroll)
          $(".social-links").css("position", "static");
        else $(".social-links").css("position", "fixed");
      }
    });
  };

  useEffect(() => {
    moveScroll();
  }, []);

  return (
    <div id="description-container">
      <p ref={myRef}>{description}</p>
      <div className="social-links" ref={menuRef}>
        <span>Comprar:</span>
        {social &&
          social.map(({ title, link, icon }, key) => (
            <Link
              key={key}
              to={link}
              target={link == "" ? "" : "_blank"}
              style={{ cursor: link == "" && "text" }}
            >
              {icon}
              <label>{title}</label>
            </Link>
          ))}
      </div>
      <div className="store">
        <h1>{storeId.name}</h1>
        <span>{storeId.description}</span>
      </div>
    </div>
  );
};

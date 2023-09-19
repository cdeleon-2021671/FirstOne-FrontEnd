import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Index";
import "./Description.scss";
import $ from "jquery";

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

  const moveMenu = () => {
    if ($("#outlet-content")[0].offsetWidth <= 670) {
      const positionScroll =
        $("#outlet-content")[0].offsetHeight +
        $("#header-content")[0].offsetHeight -
        myRef.current.getBoundingClientRect().top -
        myRef.current.offsetHeight;
      const positionRef = menuRef.current.offsetHeight;
      if (positionRef < positionScroll)
        $(".social-links").css("position", "relative");
      else $(".social-links").css("position", "fixed");
    } else {
      $(".social-links").css("position", "relative");
    }
  };

  useEffect(() => {
    getSocialLinks();
    $("#outlet-content").on("scroll", moveMenu);
    return () => {
      $("#outlet-content").off("scroll");
    };
  }, [urlProduct]);

  const sizingWindow = () => {
    if (myRef.current.scrollHeight <= myRef.current.clientHeight) {
      $("#description-of-product button").css("display", "none");
    }
    $(window).on("resize", () => {
      moveMenu();
      if ($("#outlet-content")[0].offsetWidth <= 800) {
        $(`.option1`).addClass("hiddenOption");
        $(`.option2`).addClass("hiddenOption");
      }
      $("#description-of-product button").removeClass("btnSeeDesc");
      $("#description-of-product").removeClass("seeDescription");
      if (myRef.current.scrollHeight <= myRef.current.clientHeight) {
        $("#description-of-product button").css("display", "none");
      } else {
        $("#description-of-product button").css("display", "flex");
      }
    });
  };

  useEffect(() => {
    sizingWindow();
    return () => {
      $(window).off("resize");
    };
  }, [myRef]);

  const [text, setText] = useState("Ver más");
  const toggleDescription = () => {
    $("#description-of-product").toggleClass("seeDescription");
    $("#description-of-product button").toggleClass("btnSeeDesc");
    moveMenu()
    if ($("#description-of-product")[0].className == "seeDescription") {
      setText("Ver menos");
    } else {
      setText("Ver más");
    }
  };

  return (
    <div id="description-container">
      <p ref={myRef} id="description-of-product">
        {description} <button onClick={toggleDescription}>{text}</button>
      </p>
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

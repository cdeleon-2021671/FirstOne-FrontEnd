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
    if ($("#root")[0].offsetWidth <= 670) {
      const positionScroll =
        window.innerHeight -
        menuRef.current.offsetHeight -
        myRef.current.getBoundingClientRect().bottom - 16;
      if (positionScroll > 0)
        $(".social-links").css("position", "relative");
      else $(".social-links").css("position", "fixed");
    } else {
      $(".social-links").css("position", "relative");
    }
  };

  useEffect(() => {
    getSocialLinks();
    $(window).on("scroll", moveMenu);
    return () => {
      $(window).off("scroll");
    };
  }, [urlProduct]);

  const sizingWindow = () => {
    if (myRef.current.scrollHeight <= myRef.current.clientHeight) {
      $("#description-of-product button").css("display", "none");
    }
    $(window).on("resize", () => {
      moveMenu();
      if ($("#root")[0].offsetWidth <= 800) {
        $(`.option1`).addClass("hiddenOption");
        $(`.option2`).addClass("hiddenOption");
        $(`#arrowIcon1`).removeClass("animateIcon");
        $(`#arrowIcon2`).removeClass("animateIcon");
        $(`.btn1Ship`).addClass("isActive");
        $(`.btn2Pay`).removeClass("isActive");
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
    moveMenu();
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

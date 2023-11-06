import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaShoppingCart,
  FaDropbox,
  FaFire,
  FaRegStar,
  FaTag,
} from "react-icons/fa";
import { v4 } from "uuid";
import "./Navbar.scss";
import $ from "jquery";

export const Navbar = () => {
  const location = useLocation();

  useEffect(() => {
    for (const index in menu) {
      $(".menu-item")[index].classList.remove("isActive");
    }
    for (const i in menu) {
      if (location.pathname === `${menu[i].url}`) {
        $(".menu-item")[i].classList.add("isActive");
        break;
      }
    }
  }, [location]);

  return (
    <div className="menu">
      {menu.map(({ id, title, icon, url }) => (
        <Link
          key={id}
          className="menu-item"
          to={url}
          title={`Visitar ${title}`}
        >
          <label>{icon}</label>
          {title}
        </Link>
      ))}
    </div>
  );
};

const menu = [
  {
    id: v4(),
    title: "Inicio",
    icon: <FaHome />,
    url: "/",
  },
  {
    id: v4(),
    title: "Tiendas",
    icon: <FaShoppingCart />,
    url: "/all-stores",
  },
  {
    id: v4(),
    title: "Categorías",
    icon: <FaDropbox />,
    url: "/all-categories",
  },
  {
    id: v4(),
    title: "Populares",
    icon: <FaFire />,
    url: "/all-popular-in-store",
  },
  {
    id: v4(),
    title: "Trending",
    icon: <FaRegStar />,
    url: "/trending-48-hours",
  },
  {
    id: v4(),
    title: "Ofertas",
    icon: <FaTag />,
    url: "/all-offers-in-store",
  },
];

import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
    icon: (
      <svg
        shapeRendering="geometricPrecision"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fillOpacity={0}
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
    url: "/",
  },
  {
    id: v4(),
    title: "Tiendas",
    icon: (
      <svg
        shapeRendering="geometricPrecision"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fillOpacity={0}
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
      </svg>
    ),
    url: "/all-stores",
  },
  {
    id: v4(),
    title: "Categorías",
    icon: (
      <svg
        shapeRendering="geometricPrecision"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fillOpacity={0}
      >
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
    url: "/all-categories",
  },
  {
    id: v4(),
    title: "Populares",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fillOpacity={0}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
        />
      </svg>
    ),
    url: "/all-popular-in-store",
  },
  {
    id: v4(),
    title: "Destacados",
    icon: (
      <svg
        shapeRendering="geometricPrecision"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fillOpacity={0}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    url: "",
  },
  {
    id: v4(),
    title: "Ofertas",
    icon: (
      <svg
        shapeRendering="geometricPrecision"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fillOpacity={0}
      >
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
        <path d="M7 7h.01" />
      </svg>
    ),
    url: "/all-offers-in-store",
  },
];

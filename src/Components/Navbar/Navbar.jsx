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
    title: "Más vistos",
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
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    url: "/most-viewed",
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
    title: "Productos",
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
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <path d="M3.27 6.96L12 12.01l8.73-5.05" />
        <path d="M12 22.08V12" />
      </svg>
    ),
    url: "/all-products-in-store",
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

import React from "react";
import { v4 } from "uuid";
import "./Toolbar.scss";

export const Toolbar = () => {
  return (
    <div className="toolbar">
      {toolbar.map(({ id, title, icon }) => (
        <div key={id} className="toolbar-item">
          <label>{icon}</label>
          <span>{title}</span>
        </div>
      ))}
    </div>
  );
};

export const toolbar = [
  {
    id: v4(),
    title: "Sitios seguros",
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
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    url: "",
  },
  {
    id: v4(),
    title: "100% empresas chapinas verificadas",
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
        <path d="m8 11.857 2.5 2.5L15.857 9" />
        <path d="M21.77 14.18c.16-.7.24-1.43.24-2.17s-.09-1.47-.24-2.17M3.58 17.37c.79 1.23 1.83 2.28 3.07 3.07M9.84 21.77c.7.16 1.43.24 2.17.24s1.47-.09 2.17-.24M17.37 20.44c1.23-.79 2.28-1.83 3.07-3.07M6.65 3.58c-1.23.79-2.28 1.83-3.07 3.07M2.25 9.84c-.16.7-.24 1.43-.24 2.17s.09 1.47.24 2.17M14.18 2.25c-.7-.16-1.43-.24-2.17-.24s-1.47.09-2.17.24M20.44 6.65c-.79-1.23-1.83-2.28-3.07-3.07" />
      </svg>
    ),
    url: "",
  },
  {
    id: v4(),
    title: "Acerca de tienda.gt",
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
        <circle cx="12" cy="12" r="10" fill="var(--geist-fill)" />
        <path d="M12 16v-4" stroke="var(--geist-stroke)" />
        <path d="M12 8h.01" stroke="var(--geist-stroke)" />
      </svg>
    ),
    url: "",
  },
];

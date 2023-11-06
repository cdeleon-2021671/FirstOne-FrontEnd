import React from "react";
import { v4 } from "uuid";
import "./Toolbar.scss";
import { FaShieldAlt, FaCheckCircle, FaInfoCircle } from "react-icons/fa";

export const Toolbar = () => {
  const about = {
    title: "Acerca de tienda.gt",
    icon: <FaInfoCircle></FaInfoCircle>,
  };

  return (
    <div className="toolbar">
      <div className="toolbar-options">
        {toolbar.map(({ id, title, icon }) => (
          <div key={id} className="toolbar-item">
            <label>{icon}</label>
            <span>{title}</span>
          </div>
        ))}
      </div>
      <div className="toolbar-item">
        <label>{about.icon}</label>
        <span>{about.title}</span>
      </div>
    </div>
  );
};

export const toolbar = [
  {
    id: v4(),
    title: "Sitios seguros",
    icon: <FaShieldAlt></FaShieldAlt>,
  },
  {
    id: v4(),
    title: "100% empresas chapinas verificadas",
    icon: <FaCheckCircle></FaCheckCircle>,
  },
];

import React from "react";
import "./Phone.scss";

export const Phone = ({ title, content, action }) => {
  return (
    <div className="phone">
      <article className="phone-container">
        <h2 className="phone-container-title">{title}</h2>
        <p className="phone-container-content">{content}</p>
        <div className="phone-container-close">
          <button onClick={action}>Cerrar</button>
        </div>
      </article>
    </div>
  );
};

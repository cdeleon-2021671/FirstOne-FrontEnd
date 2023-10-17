import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

export const Header = ({ one = "", two = "", three = "" }) => {
  return (
    <div className="register-store">
      <Link to={"/"} className="register-store-title">
        Tienda.gt
      </Link>
      <div className="content">
        <div className={`content-option ${one}`}>
          <span className="number">1</span>&nbsp;
          <span>Cuenta</span>
        </div>
        <div className={`content-option ${two}`}>
          <span className="number">2</span>&nbsp;
          <span>Tienda</span>
        </div>
        <div className={`content-option ${three}`}>
          <span className="number">3</span>&nbsp;
          <span>Ultimos pasos</span>
        </div>
      </div>
    </div>
  );
};

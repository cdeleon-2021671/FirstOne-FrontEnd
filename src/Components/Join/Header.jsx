import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.scss";

export const Header = () => {
  const location = useLocation();
  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [three, setThree] = useState("");

  useEffect(() => {
    if (location.pathname.includes("step1")) {
      setOne("isActive");
      setTwo("");
      setThree("");
    } else if (location.pathname.includes("step2")) {
      setTwo("isActive");
      setThree("");
      setOne("");
    } else {
      setThree("isActive");
      setTwo("");
      setOne("");
    }
  }, [location]);

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

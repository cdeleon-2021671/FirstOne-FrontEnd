import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import $ from "jquery";
import "./Forms.scss";

export const Register = () => {
  useEffect(() => {
    $(".header").addClass("disable");
    $(".menu").addClass("disable");
    return () => {
      $(".header").removeClass("disable");
      $(".menu").removeClass("disable");
    };
  }, []);

  return (
    <div className="form">
      <div className="container">
        <div className="container-title">
          <Link to={"/"} title="Inicio">
            Tienda.gt
          </Link>
        </div>
        <div className="container-form">
          <span className="container-form-title">Crear cuenta</span>
          <div className="container-form-data">
            <label htmlFor="name">Nombre completo</label>
            <input type="text" id="name" />
          </div>
          <div className="container-form-data">
            <label htmlFor="email">Correo electrónico</label>
            <input type="text" id="email" />
          </div>
          <div className="container-form-data">
            <label htmlFor="pass">Contraseña</label>
            <input type="password" id="pass" />
          </div>
          <div className="container-form-data">
            <label htmlFor="confirm">Confirmar contraseña</label>
            <input type="password" id="confirm" />
          </div>
          <button className="container-form-option">¿Cuenta para tu tienda?</button>
          <button className="container-form-send">Continuar</button>
          <div className="container-form-divider">
            <hr />
            <span>Crear con redes sociales</span>
          </div>
          <Icons></Icons>
        </div>
        <Link className="container-btn">Iniciar sesion</Link>
      </div>
    </div>
  );
};

const Icons = () => {
  const socialLinks = [
    {
      title: "Facebook",
      element: <FaFacebookF />,
    },
    {
      title: "Instagram",
      element: <FaInstagram />,
    },
    {
      title: "Gmail",
      element: <BiLogoGmail />,
    },
  ];

  return (
    <div className="container-form-methods">
      {socialLinks.map(({ title, element }, key) => (
        <Link to={title} key={key} title={title}>
          {element}
        </Link>
      ))}
    </div>
  );
};

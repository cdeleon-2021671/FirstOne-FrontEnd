import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import "./Forms.scss";
import Notify from "simple-notify";
import "simple-notify/dist/simple-notify.min.css";

export const Login = ({ setView }) => {
  const [error, setError] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const sendForm = async () => {
    try {
      setInvalid(true);
      if (form.email == "") setError("Correo no válido");
      else if (form.password == "") setError("Contraseña no válida");
      else {
        setInvalid(false);
        const { data } = await axios.post(
          `${import.meta.env.VITE_URI_API}/user/login`,
          form
        );
        new Notify({
          status: "success",
          title: "Excelente!",
          text: "Inicio de sesión correcto",
          effect: "fade",
          speed: 300,
          showIcon: true,
          showCloseButton: true,
          autoclose: true,
          autotimeout: 3000,
          type: 1,
          position: "right top",
        });
        // setView(false);
      }
    } catch (err) {
      console.log(err);
      setInvalid(true);
      setError(`${err.response.data.message}`);
    }
  };

  return (
    <div className="form" id="login">
      <div className="container">
        <div className="container-title">
          <Link to={"/"} title="Inicio">
            Tienda.gt
          </Link>
          <button onClick={() => setView(false)}>
            <AiOutlineClose></AiOutlineClose>
          </button>
        </div>
        <div className="container-form">
          <span className="container-form-title">Iniciar sesión</span>
          <div className="container-form-data">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="container-form-data">
            <label htmlFor="pass">Contraseña</label>
            <input
              type="password"
              id="pass"
              name="password"
              onChange={handleChange}
            />
          </div>
          {invalid && <span className="passwordIncorrect">{error}</span>}
          <button className="container-form-send" onClick={sendForm}>
            Continuar
          </button>
          <div className="container-form-divider">
            <hr />
            <span>Iniciar con redes sociales</span>
          </div>
          <Icons></Icons>
        </div>
        <Link
          className="container-btn"
          to={"/register"}
          onClick={() => setView(false)}
        >
          Crear cuenta
        </Link>
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

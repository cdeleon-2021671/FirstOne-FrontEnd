import React from "react";
import "./Forms.scss";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <div className="form">
      <form className="form-container">
        <div className="form-container-title">
          <h2>Iniciar Sesión</h2>
        </div>
        <div className="form-container-data">
          <input type="text" />
          <label>Nombre de usuario o contraseña</label>
        </div>
        <div className="form-container-data">
          <input type="password" />
          <label>Contraseña</label>
        </div>
        <div className="form-container-send">
          <input type="password" />
          <label>Contraseña</label>
        </div>
        <label>
          Entrar con <hr />
        </label>
        <Icons></Icons>
      </form>
    </div>
  );
};

const Icons = () => {
  const socialLinks = [
    {
      title: "Facebook",
      element: (
        <svg
          shapeRendering="geometricPrecision"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            fill="var(--geist-fill)"
            d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
          />
        </svg>
      ),
    },
    {
      title: "Twitter",
      element: (
        <svg
          shapeRendering="geometricPrecision"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            fill="var(--geist-fill, currentColor)"
            stroke="none"
            d="M16.99 0H20.298L13.071 8.26L21.573 19.5H14.916L9.702 12.683L3.736 19.5H0.426L8.156 10.665L0 0H6.826L11.539 6.231L16.99 0ZM15.829 17.52H17.662L5.83 1.876H3.863L15.829 17.52Z"
          />
        </svg>
      ),
    },
    {
      title: "Gmail",
      element: (
        <svg
          shapeRendering="geometricPrecision"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
        </svg>
      ),
    },
    {
      title: "Correo",
      element: (
        <svg
          shapeRendering="geometricPrecision"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <path d="M22 6l-10 7L2 6" />
        </svg>
      ),
    },
  ];

  return (
    <div className="form-container-sign">
      {socialLinks.map(({ title, element }, key) => (
        <Link to={title} key={key}>
          {element}
        </Link>
      ))}
    </div>
  );
};

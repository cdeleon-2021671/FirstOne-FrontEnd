import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import $ from "jquery";
import "./Forms.scss";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Index";

export const Register = () => {
  const { type } = useParams();
  const { isLogged } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [isDiferent, setIsDiferent] = useState(false);
  const [sendCode, setSendCode] = useState(false);
  const [code, setCode] = useState("");
  const [myCode, setMyCode] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    rol: "CLIENTE",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value.trim(),
    });
  };

  useEffect(() => {
    if (form.password != form.confirm) {
      setIsDiferent(true);
      setMessage("Las contraseñas no coinciden");
    } else setIsDiferent(false);
  }, [form.confirm, form.password]);

  const sendInfo = async () => {
    try {
      setMessage("");
      setIsDiferent(true);
      if (form.name == "") setMessage("El nombre no puede estar vacío");
      else if (form.email == "") setMessage("El correo es obligatorio");
      else if (isDiferent) setMessage("Las contraseñas deben coincidir");
      else if (form.password.length < 8)
        setMessage("La contraseña debe contener al menos 8 dígitos");
      else {
        const code = [];
        for (let i = 0; i < 8; i++) {
          const random = Math.floor(Math.random() * 9);
          code.push(random);
        }
        const newCode = code.join("");
        setMyCode(newCode);
        const { data } = await axios.post(
          `${import.meta.env.VITE_URI_API}/user/code`,
          { form, newCode }
        );
        new Notify({
          status: "success",
          title: "Verificación",
          text: "Correo enviado con el código de verificación",
          effect: "fade",
          speed: 300,
          showIcon: true,
          showCloseButton: true,
          autoclose: true,
          autotimeout: 3000,
          type: 1,
          position: "right top",
        });
        localStorage.setItem("codeExpired", data.token);
        setSendCode(true);
      }
    } catch (err) {
      console.log(err);
      setMessage(`${err.response.data.message}`);
    }
  };

  const addClient = async (register) => {
    try {
      // navigate("/join/trade-online/step2");
      // localStorage.setItem("register", register);
    } catch (err) {
      console.log(err);
    }
  };

  const createAccount = async () => {
    try {
      if(!type) return 
      let newForm = { ...form };
      if (type) newForm = { ...form, rol: "ADMINISTRADOR" };
      const { data } = await axios.post(
        `${import.meta.env.VITE_URI_API}/user/create-account`,
        newForm
      );
      new Notify({
        status: "success",
        title: "Excelente!",
        text: "Cuenta creada satisfactoriamente",
        effect: "fade",
        speed: 300,
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 3000,
        type: 1,
        position: "right top",
      });
      if (!type) addClient(data.register);
      else navigate(-1);
    } catch (err) {
      new Notify({
        status: "error",
        title: "Lo siento!",
        text: `${err.response.data.message}`,
        effect: "fade",
        speed: 300,
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 3000,
        type: 1,
        position: "right top",
      });
    }
  };

  const [invalidCode, setInvalidCode] = useState(false);
  const [msgInvalid, setMsgInvalid] = useState("El código no es válido");
  const validateCode = async () => {
    try {
      if (code != myCode) {
        setInvalidCode(true);
        setMsgInvalid("El código no es válido");
      } else {
        const token = localStorage.getItem("codeExpired");
        await axios.post(`${import.meta.env.VITE_URI_API}/user/validate`, {
          code: code,
          token: token,
        });
        localStorage.setItem("codeExpired", "");
        setInvalidCode(false);
        createAccount();
      }
    } catch (err) {
      console.log(err);
      setInvalidCode(true);
      setMsgInvalid("El código ha expirado");
    }
  };

  return (
    <>
      {!type && (
        <Helmet>
          <title>Tienda.gt - Registro</title>
          <meta
            name="description"
            content="Aqui puedes unirte para seleccionar productos que 
    quieres que te avisemos cuando se pongan en oferta. No te lo pierdas!"
          />
          <link rel="canonical" href="https://tienda.gt/register" />
        </Helmet>
      )}
      {!isLogged || type ? (
        <div className="form">
          <div className="container">
            {!type && (
              <div className="container-title">
                <Link to={"/"} title="Inicio">
                  Tienda.gt
                </Link>
              </div>
            )}
            <div className="container-form">
              <span className="container-form-title">Crear cuenta</span>
              <div className="container-form-data">
                <label htmlFor="name">Nombre completo</label>
                <input
                  type="text"
                  id="name"
                  onChange={handleChange}
                  name="name"
                />
              </div>
              <div className="container-form-data">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="text"
                  id="email"
                  onChange={handleChange}
                  name="email"
                />
              </div>
              <div className="container-form-data">
                <label htmlFor="pass">Contraseña</label>
                <input
                  type="password"
                  id="pass"
                  onChange={handleChange}
                  name="password"
                />
              </div>
              <div className="container-form-data">
                <label htmlFor="confirm">Confirmar contraseña</label>
                <input
                  type="password"
                  id="confirm"
                  onChange={handleChange}
                  name="confirm"
                />
              </div>
              {isDiferent && (
                <span className="passwordIncorrect">{message}</span>
              )}
              <button className="container-form-send" onClick={sendInfo}>
                Continuar
              </button>
              {!type && (
                <>
                  <div className="container-form-divider">
                    <hr />
                    <span>Crear con redes sociales</span>
                  </div>
                  <Icons></Icons>
                </>
              )}
              {sendCode && (
                <>
                  <div className="container-form-data">
                    <label htmlFor="code">Codigo de confirmacion</label>
                    <input
                      type="text"
                      id="code"
                      required
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                  {invalidCode && (
                    <span className="passwordIncorrect">{msgInvalid}</span>
                  )}
                  <button
                    className="container-form-send"
                    onClick={validateCode}
                  >
                    Confirmar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
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

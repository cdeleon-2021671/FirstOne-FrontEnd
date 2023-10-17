import React, { useEffect, useState } from "react";
import "./Form.scss";
import axios from "axios";

export const Form = () => {
  const [sendCode, setSendCode] = useState(false);
  const [isDiferent, setIsDiferent] = useState(false);
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");
  const [myCode, setMyCode] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (form.password != form.confirm) {
      setIsDiferent(true);
      setMessage("Las contraseñas no coinciden");
    } else setIsDiferent(false);
  }, [form.confirm]);

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
    }
  };

  const [invalidCode, setInvalidCode] = useState(false);
  const [msgInvalid, setMsgInvalid] = useState("");
  const validateCode = async () => {
    try {
      if (code != myCode) setInvalidCode(true);
      else {
        const token = localStorage.getItem("codeExpired");
        await axios.post(`${import.meta.env.VITE_URI_API}/user/validate`, {
          code: code,
          token: token,
        });
        new Notify({
          status: "success",
          title: "Excelente!",
          text: "EL código es correcto",
          effect: "fade",
          speed: 300,
          showIcon: true,
          showCloseButton: true,
          autoclose: true,
          autotimeout: 3000,
          type: 1,
          position: "right top",
        });
        localStorage.clear();
        setInvalidCode(false);
      }
    } catch (err) {
      console.log(err);
      setInvalidCode(true);
      setMsgInvalid("El código ha expirado");
    }
  };

  return (
    <div className="register-form">
      <div className="form">
        <div className="container">
          <div className="container-form">
            <span className="container-form-title">
              Registrar cuenta de empresa
            </span>
            <div className="container-form-data">
              <label htmlFor="name">Persona encargada</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                onChange={handleChange}
              />
            </div>
            <div className="container-form-data">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="text"
                id="email"
                name="email"
                required
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
            <div className="container-form-data">
              <label htmlFor="confirm">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirm"
                name="confirm"
                onChange={handleChange}
              />
            </div>
            {isDiferent && <span className="passwordIncorrect">{message}</span>}
            <button className="container-form-send" onClick={sendInfo}>
              Continuar
            </button>
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
                <button className="container-form-send" onClick={validateCode}>
                  Confirmar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

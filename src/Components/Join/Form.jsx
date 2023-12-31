import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Form.scss";
import { AuthContext } from "../../Index";
import { Animation } from "../Animation/Animation";

export const Form = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { user, isLogged, setIsLogged } = useContext(AuthContext);
  const [sendCode, setSendCode] = useState(false);
  const [isDiferent, setIsDiferent] = useState(false);
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");
  const [myCode, setMyCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    rol: "COMERCIANTE",
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
      const email = form.email.replace(/[ ]+/g, "");
      const name = form.name.replace(/[ ]+/g, "");
      setMessage("");
      setIsDiferent(true);
      setLoading(true);
      if (name == "") setMessage("El nombre no puede estar vacío");
      else if (email == "") setMessage("El correo es obligatorio");
      else if (isDiferent) setMessage("Las contraseñas deben coincidir");
      else if (form.password.length < 8)
        setMessage("La contraseña debe contener al menos 8 dígitos");
      else {
        createAccount();
        // const code = [];
        // for (let i = 0; i < 8; i++) {
        //   const random = Math.floor(Math.random() * 9);
        //   code.push(random);
        // }
        // const newCode = code.join("");
        // setMyCode(newCode);
        // const { data } = await axios.post(
        //   `${import.meta.env.VITE_URI_API}/user/code`,
        //   { form, newCode }
        // );
        // new Notify({
        //   status: "success",
        //   title: "Verificación",
        //   text: "Correo enviado con el código de verificación",
        //   effect: "fade",
        //   speed: 300,
        //   showIcon: true,
        //   showCloseButton: true,
        //   autoclose: true,
        //   autotimeout: 3000,
        //   type: 1,
        //   position: "right top",
        // });
        // localStorage.setItem("codeExpired", data.token);
        // setSendCode(true);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      setMessage(`${err.response.data.message}`);
    }
  };

  const addBoss = async (register) => {
    try {
      localStorage.setItem("token", register);
      setIsLogged(true);
      navigate("/join/trade-online/step2/information");
    } catch (err) {
      console.log(err);
    }
  };

  const getInfo = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URI_API}/user/get-user-by-id/${user.sub}`
      );
      return {
        ...form,
        rol: "TRABAJADOR",
        boss: user.sub,
        stores: data.user.stores,
      };
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const createAccount = async () => {
    try {
      setLoading(true);
      let newForm = { ...form };
      if (type) newForm = await getInfo();
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
      setLoading(false);
      if (!type) addBoss(data.token);
      else navigate(-1);
    } catch (err) {
      setLoading(false);
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
      setLoading(true);
      if (code != myCode) setInvalidCode(true);
      else {
        const token = localStorage.getItem("codeExpired");
        await axios.post(`${import.meta.env.VITE_URI_API}/user/validate`, {
          code: code,
          token: token,
        });
        localStorage.setItem("codeExpired", "");
        setInvalidCode(false);
        createAccount();
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setInvalidCode(true);
      setMsgInvalid("El código ha expirado");
    }
  };

  return (
    <>
      {loading && <Animation></Animation>}
      {!isLogged || type ? (
        <div className="register-form">
          <div className="form">
            <div className="container">
              <div className="container-form">
                <span className="container-form-title">
                  {type
                    ? "Registrar nuevo trabajador"
                    : "Registrar cuenta de empresa"}
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
                {isDiferent && (
                  <span className="passwordIncorrect">{message}</span>
                )}
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
        </div>
      ) : null}
    </>
  );
};

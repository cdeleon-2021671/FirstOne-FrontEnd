import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Index";
import axios from "axios";

export const Shipping = () => {
  const { isLogged, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { storeId } = useParams();
  const [shipping, setShipping] = useState({ method1: "" });
  const [methods, setMethods] = useState({ method1: "" });
  const [boxes, setBoxes] = useState(null);

  const handleChange = (e) => {
    setMethods({
      ...shipping,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const keys = Object.keys(methods);
    let values = {};
    keys.forEach((item) => {
      const value = methods[item];
      const element = value.replace(/[ ]+/g, "");
      const cant = Object.keys(values);
      const key = `method${cant.length + 1}`;
      if (element != "") values = { ...values, [key]: value };
    });
    const cant = Object.keys(values);
    const key = `method${cant.length + 1}`;
    if (cant.length == 0) setShipping({ method1: "" });
    else if (cant.length < 10) {
      setShipping({ ...values, [key]: "" });
    } else setShipping(values);
  }, [methods]);

  useEffect(() => {
    const keys = Object.keys(shipping);
    setBoxes(keys);
  }, [shipping]);

  const sendMethods = async () => {
    try {
      const email = localStorage.getItem("register");
      if (email == "" && isLogged == false) {
        new Notify({
          status: "error",
          title: "Lo siento!",
          text: "Necesitas iniciar sesión",
          effect: "fade",
          speed: 300,
          showIcon: true,
          showCloseButton: true,
          autoclose: true,
          autotimeout: 3000,
          type: 1,
          position: "right top",
        });
      } else if (isLogged && user.rol != "COMERCIANTE") {
        new Notify({
          status: "error",
          title: "Lo siento!",
          text: "Tu cuenta no tiene permiso para realizar esta acción",
          effect: "fade",
          speed: 300,
          showIcon: true,
          showCloseButton: true,
          autoclose: true,
          autotimeout: 3000,
          type: 1,
          position: "right top",
        });
      } else {
        if (email != "") {
          await axios.post(`${import.meta.env.VITE_URI_API}/user/validate`, {
            token: email,
          });
        }
        const { data } = await axios.put(
          `${import.meta.env.VITE_URI_API}/store/update-shipping`,
          { shipping, storeId }
        );
        new Notify({
          status: "success",
          title: "Excelente!",
          text: `${data.message}`,
          effect: "fade",
          speed: 300,
          showIcon: true,
          showCloseButton: true,
          autoclose: true,
          autotimeout: 3000,
          type: 1,
          position: "right top",
        });
        navigate(`/join/trade-online/step2/payment/${storeId}`);
      }
    } catch (err) {
      console.log(err);
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
  
  return (
    <div className="register-form">
      <div className="form">
        <div className="container step2">
          <div className="container-form">
            <span className="container-form-title">Métodos de envío</span>
            {boxes &&
              boxes.map((item, key) => {
                return (
                  <div className="container-form-data" key={key}>
                    <label htmlFor={item}>Método {key + 1}</label>
                    <input
                      type="text"
                      id={`method${key + 1}`}
                      name={item}
                      onChange={handleChange}
                      value={shipping[item]}
                    />
                  </div>
                );
              })}
            <button
              className="container-btn"
              style={{ cursor: "pointer" }}
              onClick={sendMethods}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

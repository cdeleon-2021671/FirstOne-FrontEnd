import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Index";
import axios from "axios";
import { Animation } from "../Animation/Animation";

export const Payment = () => {
  const { isLogged, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { storeId } = useParams();
  const [payments, setPayments] = useState({ method1: "" });
  const [methods, setMethods] = useState({ method1: "" });
  const [boxes, setBoxes] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setMethods({
      ...payments,
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
    if (cant.length == 0) setPayments({ method1: "" });
    else if (cant.length < 10) {
      setPayments({ ...values, [key]: "" });
    } else setPayments(values);
  }, [methods]);

  useEffect(() => {
    const keys = Object.keys(payments);
    setBoxes(keys);
  }, [payments]);

  const sendMethods = async () => {
    try {
      setLoading(true);
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
          `${import.meta.env.VITE_URI_API}/store/update-payments`,
          { payments, storeId }
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
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
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
    <>
      {loading && <Animation></Animation>}
      <div className="register-form">
        <div className="form">
          <div className="container step2">
            <div className="container-form">
              <span className="container-form-title">Métodos de pago</span>
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
                        value={payments[item]}
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
    </>
  );
};

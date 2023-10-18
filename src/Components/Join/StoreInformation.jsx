import React, { useContext, useState } from "react";
import { AuthContext } from "../../Index";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const StoreInformation = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { isLogged, user } = useContext(AuthContext);
  const [form, setForm] = useState({
    xml: "",
    urlStore: "",
    urlLogo: "",
    banner: "",
    name: "",
    description: "",
    phone: "",
    whatsapp: "",
    facebook: "",
    instagram: "",
    tiktok: "",
    messenger: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const sendForm = async (e) => {
    try {
      const email = localStorage.getItem("register");
      if (email == "" && isLogged == false) {
        setMessage("Necesitas iniciar sesión");
      } else if (isLogged && user.rol != "BUSINESSMAN") {
        setMessage("Tu cuenta no tiene permiso para realizar esta acción");
      } else {
        if (form.xml == "") setMessage("XML es obligatorio");
        else if (form.urlStore == "")
          setMessage("URL de la tienda es obligatorio");
        else if (form.urlLogo == "") setMessage("URL del logo es obligatorio");
        else if (form.banner == "") setMessage("URL del banner es obligatorio");
        else if (form.name == "")
          setMessage("Nombre de la tienda es obligatorio");
        else if (form.description == "")
          setMessage("Descripción es obligatorio");
        else {
          setMessage("");
          if (email != "") {
            await axios.post(`${import.meta.env.VITE_URI_API}/user/validate`, {
              token: email,
            });
          }
          const { data } = await axios.post(
            `${import.meta.env.VITE_URI_API}/store/add-store`,
            form
          );
          new Notify({
            status: "success",
            title: "Excelente!",
            text: "Tienda en espera. Sigue llenando los datos",
            effect: "fade",
            speed: 300,
            showIcon: true,
            showCloseButton: true,
            autoclose: true,
            autotimeout: 5000,
            type: 1,
            position: "right top",
          });
          const { storeId } = data;
          if (email != "") {
            await axios.post(
              `${import.meta.env.VITE_URI_API}/user/update-stores`,
              {
                register: email,
                storeId: storeId,
              }
            );
          } else {
            await axios.post(
              `${import.meta.env.VITE_URI_API}/user/update-stores`,
              {
                email: user.email,
                storeId: storeId,
              }
            );
          }
          navigate(`/join/trade-online/step2/${storeId}`);
        }
      }
    } catch (err) {
      console.log(err);
      setMessage(`${err.response.data.message}`);
    }
  };

  return (
    <div className="register-form">
      <div className="form">
        <div className="container newForm">
          <div className="container-form">
            <span className="container-form-title">
              Información de la tienda
            </span>
            <div className="content">
              <div className="container-form-data">
                <label htmlFor="xml">
                  XML de la tienda
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="xml"
                  name="xml"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="container-form-data">
                <label htmlFor="urlStore">
                  URL de la tienda
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="urlStore"
                  name="urlStore"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="container-form-data">
                <label htmlFor="urlLogo">
                  URL del logo
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="urlLogo"
                  name="urlLogo"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="container-form-data">
                <label htmlFor="banner1">
                  URL del banner
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="banner1"
                  name="banner"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="container-form-data">
                <label htmlFor="name">
                  Nombre de la tienda
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="container-form-data">
                <label htmlFor="description">
                  Descripción de la tienda
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="container-form-data">
                <label htmlFor="phone">Teléfono de la tienda</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="container-form-data">
                <label htmlFor="whatsapp">Whatsapp de la tienda</label>
                <input
                  type="text"
                  id="whatsapp"
                  name="whatsapp"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="container-form-data">
                <label htmlFor="facebook">Facebook de la tienda</label>
                <input
                  type="text"
                  id="facebook"
                  name="facebook"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="container-form-data">
                <label htmlFor="instagram">Instagram de la tienda</label>
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="container-form-data">
                <label htmlFor="tiktok">Tiktok de la tienda</label>
                <input
                  type="text"
                  id="tiktok"
                  name="tiktok"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="container-form-data">
                <label htmlFor="messenger">Messenger de la tienda</label>
                <input
                  type="text"
                  id="messenger"
                  name="messenger"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <span className="passwordIncorrect">{message}</span>
            <button className="container-form-send" onClick={sendForm}>
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

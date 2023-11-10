import React, { useContext, useState } from "react";
import { AuthContext } from "../../Index";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Animation } from "../Animation/Animation";

export const StoreInformation = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { isLogged, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      if (isLogged && user.rol != "COMERCIANTE") {
        setMessage("Tu cuenta no tiene permiso para realizar esta acción");
      } else {
        if (form.xml.replace(/[ ]+/g, "") == "")
          setMessage("XML es obligatorio");
        else if (form.urlStore.replace(/[ ]+/g, "") == "")
          setMessage("URL de la tienda es obligatorio");
        else if (form.urlLogo.replace(/[ ]+/g, "") == "")
          setMessage("URL del logo es obligatorio");
        else if (form.banner.replace(/[ ]+/g, "") == "")
          setMessage("URL del banner es obligatorio");
        else if (form.name.replace(/[ ]+/g, "") == "")
          setMessage("Nombre de la tienda es obligatorio");
        else if (form.description.replace(/[ ]+/g, "") == "")
          setMessage("Descripción es obligatorio");
        else {
          setMessage("");
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
          await axios.post(
            `${import.meta.env.VITE_URI_API}/user/update-stores`,
            {
              storeId: storeId,
              register: localStorage.getItem("token"),
            }
          );
          navigate(`/join/trade-online/step2/tags/${storeId}`);
        }
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      setMessage(`${err.response.data.message}`);
    }
  };

  return (
    <>
      {loading && <Animation></Animation>}
      {localStorage.getItem("token") && (
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
                  <div className="container-form-data">
                    <label htmlFor="description">
                      Observaciones
                    </label>
                    <input
                      type="text"
                      id="description"
                      name="description"
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
                  <div className="container-form-data">
                    <label htmlFor="description">
                      Observaciones
                    </label>
                    <input
                      type="text"
                      id="description"
                      name="description"
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
      )}
    </>
  );
};

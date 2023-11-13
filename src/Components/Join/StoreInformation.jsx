import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Index";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Animation } from "../Animation/Animation";
import { Editor } from "@tinymce/tinymce-react";
import { Message } from "../Modals/Message";
import { Tags } from "./Tags";
import $ from "jquery";

export const StoreInformation = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { isLogged, setIsLogged, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(false);
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
    shippingTerms: ["Envíos a toda Guatemala"],
    paymentOptions: [],
    tags: [],
  });

  const sendForm = async (e) => {
    try {
      setLoading(true);
      if (!isLogged) {
        setMessage("Tu cuenta no tiene permiso para realizar esta acción");
      }
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
          showView();
        }
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      setMessage(`${err.response.data.message}`);
    }
  };

  const showView = () => {
    $("body").css("overflow", "hidden");
    setView(true);
  };
  const hiddenView = () => {
    $("body").css("overflow", "auto");
    setView(false);
    navigate("/profile/all-stores");
  };

  return (
    <>
      {loading && <Animation></Animation>}
      {view && (
        <Message
          title={"Hola!"}
          content={`Gracias por sumarte a nuestra app. Estamos súper emocionados de poder 
          compartir tus geniales productos con nuestra gente. Tu tienda ya es parte de esta 
          gran familia y estamos seguros de que esta aventura nos va a beneficiar a todos.
          Se nota que le pones corazón y calidad a cada cosa que haces, y estamos listos para 
          mostrárselo al mundo entero. Un millón de gracias por embarcarte en este viaje digital 
          con nosotros. ¡Vamos a lograr cosas increíbles juntos!`}
          action={hiddenView}
        ></Message>
      )}
      {isLogged && (
        <div className="register-form">
          <div className="form">
            <div className="container newForm">
              <Information setForm={setForm} form={form}></Information>
              <Description setForm={setForm} form={form}></Description>
              <ShippingTerms setForm={setForm} form={form}></ShippingTerms>
              <PaymentOptions setForm={setForm} form={form}></PaymentOptions>
              <Tags setForm={setForm} form={form}></Tags>
              <span className="passwordIncorrect">{message}</span>
              <button className="container-btn" onClick={sendForm}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Data = ({ title, name, req, form, setForm }) => {
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container-form-data">
      <label htmlFor={name}>
        {title}
        {req && <span className="required">*</span>}
      </label>
      <input type="text" id={name} name={name} onChange={handleChange} />
    </div>
  );
};

const Information = ({ setForm, form }) => {
  return (
    <div className="container-form">
      <span className="container-form-title">Información de la tienda</span>
      <div className="content">
        <Data
          title={"XML de la tienda"}
          name={"xml"}
          req={true}
          form={form}
          setForm={setForm}
        ></Data>
        <Data
          title={"URL de la tienda"}
          name={"urlStore"}
          req={true}
          form={form}
          setForm={setForm}
        ></Data>
        <Data
          title={"URL del logo"}
          name={"urlLogo"}
          req={true}
          form={form}
          setForm={setForm}
        ></Data>
        <Data
          title={"URL del banner"}
          name={"banner"}
          req={true}
          form={form}
          setForm={setForm}
        ></Data>
        <Data
          title={"Nombre de la tienda"}
          name={"name"}
          req={true}
          form={form}
          setForm={setForm}
        ></Data>
        <Data
          title={"Teléfono de la tienda"}
          name={"phone"}
          form={form}
          setForm={setForm}
        ></Data>
        <Data
          title={"Whatsapp de la tienda"}
          name={"whatsapp"}
          form={form}
          setForm={setForm}
        ></Data>
        <Data
          title={"Facebook de la tienda"}
          name={"facebook"}
          form={form}
          setForm={setForm}
        ></Data>
        <Data
          title={"Instagram de la tienda"}
          name={"instagram"}
          form={form}
          setForm={setForm}
        ></Data>
        <Data
          title={"Tiktok de la tienda"}
          name={"tiktok"}
          form={form}
          setForm={setForm}
        ></Data>
        <Data
          title={"Messenger de la tienda"}
          name={"messenger"}
          form={form}
          setForm={setForm}
        ></Data>
      </div>
    </div>
  );
};

const Description = ({ form, setForm }) => {
  const editorRef = useRef(null);

  const handleChange = () => {
    if (editorRef.current) {
      setForm({
        ...form,
        description: editorRef.current.getContent(),
      });
    }
  };

  return (
    <div className="container-form">
      <span className="container-form-title">Descripción de la tienda</span>
      <Editor
        apiKey="zvxwf6llqq2c558yqoy29godx3b6jx7xjquuznib0jbe5nhb"
        onInit={(evt, editor) => (editorRef.current = editor)}
        onChange={handleChange}
        init={{
          height: 200,
          max_height: 400,
          menubar: true,
          plugins: [
            // "advlist",
            // "autolink",
            // "lists",
            // "link",
            // "image",
            // "charmap",
            // "preview",
            // "anchor",
            // "searchreplace",
            // "visualblocks",
            // "code",
            // "fullscreen",
            // "insertdatetime",
            // "media",
            // "code",
          ],
          toolbar:
            "undo redo | " +
            "bold italic forecolor" +
            "numlist | " +
            "removeformat",
        }}
      />
    </div>
  );
};

const ShippingTerms = ({ setForm, form }) => {
  const [typing, setTyping] = useState(true);
  const [shipping, setShipping] = useState({
    cobertura: "Envíos a toda Guatemala",
    shippingNormal: "",
    saleOff: "",
    observaciones: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping({
      ...shipping,
      [name]: value,
    });
  };

  const getShipping = () => {
    const keys = Object.keys(shipping);
    const array = [];
    for (const key of keys) {
      let text = shipping[key];
      if (key == "saleOff" && typing == true) continue;
      else if (key == "saleOff")
        text = `Envío gratis a partir de Q${parseFloat(text).toFixed(2)}`;
      else if (text.replace(/[ ]+/g, "") == "") continue;
      else if (key == "shippingNormal")
        text = `Costo de envío a Q${parseFloat(text).toFixed(2)}`;
      array.push(text);
    }
    setForm({
      ...form,
      shippingTerms: array,
    });
  };

  useEffect(() => {
    getShipping();
  }, [shipping, typing]);

  const verifyKey = (e) => {
    if (e.keyCode == 189 || e.keyCode == 187) e.preventDefault();
  };

  const checkedOff = (e) => {
    setTyping(!e.target.checked);
  };

  return (
    <div className="container-form">
      <span className="container-form-title">Términos de envío</span>
      <div className="container-form-data">
        <label htmlFor="cobertura">Cobertura</label>
        <select
          className="cobertura"
          name="cobertura"
          value={shipping.cobertura}
          onChange={handleChange}
        >
          <option>Envíos a toda Guatemala</option>
          <option>Envíos unicamente a ciudad de Guatemala</option>
          <option>Envíos unicamente en la localidad</option>
        </select>
      </div>
      <div className="container-form-data">
        <label htmlFor="shippingNormal">Costo normal de envío</label>
        <input
          type="number"
          id="shippingNormal"
          name="shippingNormal"
          onChange={handleChange}
          onKeyDown={verifyKey}
          min={0}
        />
      </div>
      <div className="shippingOff">
        <div className="container-form-data">
          <label htmlFor="shippingOff">Envío gratis </label>
          <input
            type="checkbox"
            id="shippingOff"
            name="shippingOff"
            onClick={checkedOff}
          />
        </div>
        <div className="container-form-data">
          <label htmlFor="saleOff">Envío gratis a partir de </label>
          <input
            type="number"
            min={0}
            id="saleOff"
            name="saleOff"
            onChange={handleChange}
            onKeyDown={verifyKey}
            disabled={typing}
          />
        </div>
      </div>
      <div className="container-form-data">
        <label htmlFor="observaciones">Observaciones</label>
        <input
          type="text"
          id="observaciones"
          name="observaciones"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

const PaymentOptions = ({ form, setForm }) => {
  const [payment, setPayment] = useState({
    one: false,
    two: false,
    three: false,
    for: false,
  });

  const handleChange = (e) => {
    const { name } = e.target;
    setPayment({
      ...payment,
      [name]: !payment[name],
    });
  };

  useEffect(() => {
    const keys = Object.keys(payment);
    const options = {
      one: "Pago contra entrega",
      two: "Depósito",
      three: "Tarjetas de crédito o débito",
      for: "Pago en cuotas",
    };
    const array = [];
    for (const key of keys) {
      const value = payment[key];
      let text = options[key];
      if (value == false) continue;
      array.push(text);
    }
    setForm({
      ...form,
      paymentOptions: array,
    });
  }, [payment]);

  return (
    <div className="container-form">
      <span className="container-form-title">Métodos de pago</span>
      <div className="shippingOff">
        <div className="container-form-data">
          <label htmlFor="one">Pago contra entrega</label>
          <input
            type="checkbox"
            id="one"
            name="one"
            checked={payment.one}
            readOnly
            onClick={handleChange}
          />
        </div>
      </div>
      <div className="shippingOff">
        <div className="container-form-data">
          <label htmlFor="two">Depósito</label>
          <input
            type="checkbox"
            id="two"
            name="two"
            checked={payment.two}
            readOnly
            onClick={handleChange}
          />
        </div>
      </div>
      <div className="shippingOff">
        <div className="container-form-data">
          <label htmlFor="three">Tarjetas de crédito o débito</label>
          <input
            type="checkbox"
            id="three"
            name="three"
            checked={payment.three}
            readOnly
            onClick={handleChange}
          />
        </div>
      </div>
      <div className="shippingOff">
        <div className="container-form-data">
          <label htmlFor="for">Cuotas</label>
          <input
            type="checkbox"
            id="for"
            name="for"
            checked={payment.for}
            readOnly
            onClick={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

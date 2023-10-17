import React, { useState } from "react";

export const StoreInformation = () => {
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
    tags: [],
    shippingTerms: [],
    paymentOptions: [],
  });
  return (
    <div className="register-form">
      <div className="form">
        <div className="container">
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
                <input type="text" id="xml" name="xml" required />
              </div>
              <div className="container-form-data">
                <label htmlFor="urlStore">
                  URL de la tienda
                  <span className="required">*</span>
                </label>
                <input type="text" id="urlStore" name="urlStore" required />
              </div>
              <div className="container-form-data">
                <label htmlFor="urlLogo">
                  URL del logo
                  <span className="required">*</span>
                </label>
                <input type="text" id="urlLogo" name="urlLogo" required />
              </div>
              <div className="container-form-data">
                <label htmlFor="banner1">
                  URL del banner
                  <span className="required">*</span>
                </label>
                <input type="text" id="banner1" name="banner" required />
              </div>
              <div className="container-form-data">
                <label htmlFor="name">
                  Nombre de la tienda
                  <span className="required">*</span>
                </label>
                <input type="text" id="name" name="name" required />
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
                />
              </div>
              <div className="container-form-data">
                <label htmlFor="phone">Teléfono de la tienda</label>
                <input type="text" id="phone" name="phone" required />
              </div>
              <div className="container-form-data">
                <label htmlFor="whatsapp">Whatsapp de la tienda</label>
                <input type="text" id="whatsapp" name="whatsapp" required />
              </div>
              <div className="container-form-data">
                <label htmlFor="facebook">Facebook de la tienda</label>
                <input type="text" id="facebook" name="facebook" required />
              </div>
              <div className="container-form-data">
                <label htmlFor="instagram">Instagram de la tienda</label>
                <input type="text" id="instagram" name="instagram" required />
              </div>
              <div className="container-form-data">
                <label htmlFor="tiktok">Tiktok de la tienda</label>
                <input type="text" id="tiktok" name="tiktok" required />
              </div>
              <div className="container-form-data">
                <label htmlFor="messenger">Messenger de la tienda</label>
                <input type="text" id="messenger" name="messenger" required />
              </div>
            </div>
            <button className="container-form-send">Continuar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

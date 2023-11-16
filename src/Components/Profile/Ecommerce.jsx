import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Animation } from "../Animation/Animation";
import ReactHtmlParser from "react-html-parser";
import { AuthContext } from "../../Index";
import axios from "axios";
import "./Stores.scss";

export const Ecommerce = () => {
  const { storeId } = useParams();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(false);

  const getStoreById = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URI_API}/store/get-store-by-id/${storeId}`
      );
      const { store } = data;
      setStore(store);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStoreById();
  }, []);

  const reladStore = async (xml, storeId) => {
    try {
      setLoading(true);
      const headers = {
        "content-types": "aplication/json",
        Authorization: localStorage.getItem("token"),
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_URI_API}/reload/add-store`,
        { xml, storeId },
        { headers: headers }
      );
      new Notify({
        status: "success",
        title: "Verificación",
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
      setLoading(false);
    } catch (err) {
      console.log(err);
      new Notify({
        status: "error",
        title: "Lo siento",
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
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Animation></Animation>}
      {store && (
        <div className="info">
          <div className="info-title">
            <h2>
              {store.name} - {store.state}
            </h2>
            {store.state == "ACTIVA" && (
              <button
                className="info-title-action"
                to="/join/trade-online/step2"
                onClick={() => reladStore(store.xml, store._id)}
              >
                Recargar feed
              </button>
            )}
          </div>
          <div className="all">
            <div className="all-content">
              <Introduction store={store}></Introduction>
              <Methods store={store}></Methods>
              <div>
                <SocialLinks store={store}></SocialLinks>
                <img src={store.banner} alt={`Banner - ${store.banner}`} />
              </div>
              <Options store={store} reloadStore={getStoreById}></Options>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Introduction = ({ store }) => {
  return (
    <div className="all-content-introduction">
      <div className="info">
        <img src={store.urlLogo} alt={`Logo - ${store.name}`} />
      </div>
      <div className="content">
        <Link to={store.urlLogo} target="_blank">
          {" "}
          <strong>Logo:&nbsp;</strong>
          {store.urlLogo}
        </Link>
        <Link to={store.banner} target="_blank">
          {" "}
          <strong>Banner:&nbsp;</strong>
          {store.banner}
        </Link>
        <Link to={store.xml} target="_blank">
          {" "}
          <strong>XML:&nbsp;</strong>
          {store.xml}
        </Link>
        <span>
          {" "}
          <strong>Descripción:&nbsp;</strong>
          {ReactHtmlParser(store.description)}
        </span>
        <Links store={store}></Links>
      </div>
    </div>
  );
};

const Methods = ({ store }) => {
  return (
    <div className="container">
      <div className="apart">
        <label>Etiquetas</label>
        {store.tags.length != 0 ? (
          store.tags.map((item, key) => <span key={key}>{item}</span>)
        ) : (
          <>
            <span>No se han agregado etiquetas</span>
          </>
        )}
      </div>
      <div className="apart">
        <label>Opciones de envio</label>
        {store.shippingTerms.length != 0 ? (
          store.shippingTerms.map((item, key) => {
            if (item.includes("http") || item.includes("www"))
              return (
                <Link
                  key={key}
                  to={item}
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                >
                  Ver más
                </Link>
              );
            else return <span key={key}>{item}</span>;
          })
        ) : (
          <>
            <span>No se han agregado opciones de envío</span>
          </>
        )}
      </div>
      <div className="apart">
        <label>Opciones de pago</label>
        {store.paymentOptions.length != 0 ? (
          store.paymentOptions.map((item, key) => <span key={key}>{item}</span>)
        ) : (
          <>
            <span>No se han agregado métodos de pago</span>
          </>
        )}
      </div>
    </div>
  );
};

const Options = ({ store, reloadStore }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const deleteStore = async (id) => {
    try {
      setLoading(true);
      const headers = {
        "content-types": "aplication/json",
        Authorization: localStorage.getItem("token"),
      };
      await axios.delete(
        `${import.meta.env.VITE_URI_API}/store/delete-store/${id}`,
        { headers: headers }
      );
      new Notify({
        status: "success",
        title: "Excelente",
        text: "Tienda eliminada satisfacoriamente",
        effect: "fade",
        speed: 300,
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 3000,
        type: 1,
        position: "right top",
      });
      navigate(-1);
      setLoading(false);
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
      setLoading(false);
    }
  };

  const activeStore = async (id) => {
    try {
      setLoading(true);
      const headers = {
        "content-types": "aplication/json",
        Authorization: localStorage.getItem("token"),
      };
      await axios.post(
        `${import.meta.env.VITE_URI_API}/product/add-products`,
        { storeId: id },
        { headers: headers }
      );
      new Notify({
        status: "success",
        title: "Excelente",
        text: "Tienda activada satisfacoriamente",
        effect: "fade",
        speed: 300,
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 3000,
        type: 1,
        position: "right top",
      });
      reloadStore();
      setLoading(false);
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
      setLoading(false);
    }
  };

  const inactiveStore = async (id) => {
    try {
      setLoading(true);
      const headers = {
        "content-type": "aplication/json",
        Authorization: localStorage.getItem("token"),
      };
      await axios.put(
        `${import.meta.env.VITE_URI_API}/store/inactive-store/${id}`,
        {},
        { headers: headers }
      );
      new Notify({
        status: "success",
        title: "Excelente",
        text: "Tienda inactivada satisfacoriamente",
        effect: "fade",
        speed: 300,
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 3000,
        type: 1,
        position: "right top",
      });
      reloadStore();
      setLoading(false);
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
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Animation></Animation>}
      {(user && user.rol == "MAESTRO") || (user && user.rol == "ADMIN") ? (
        <div className="options">
          <button onClick={() => deleteStore(store._id)}>
            Eliminar Tienda
          </button>
          {store.state != "ACTIVA" && (
            <button
              style={{ background: "rgb(4, 238, 4)" }}
              onClick={() => activeStore(store._id)}
            >
              Activar Tienda
            </button>
          )}
          {store.state == "ACTIVA" && (
            <button onClick={() => inactiveStore(store._id)}>
              Inactivar Tienda
            </button>
          )}
        </div>
      ) : null}
    </>
  );
};

const SocialLinks = ({ store }) => {
  const { socialLinks } = useContext(AuthContext);
  const [social, setSocial] = useState(null);
  const rrss = [
    store.urlStore,
    store.whatsapp,
    store.messenger,
    store.facebook,
    store.instagram,
    store.phone,
    store.tiktok,
  ];
  const getSocialLinks = () => {
    const newSocial = [];
    rrss.forEach((item, key) => {
      const icon = socialLinks[key].element;
      const title = socialLinks[key].title;
      const color =
        title == "Tienda" || title == "Phone" || title == "TikTok"
          ? "#000"
          : socialLinks[key].color;
      const object = {
        icon: icon,
        title: title == "Phone" ? item : title,
        bg: color,
        link:
          title == "Whatsapp"
            ? `https://wa.me/${item}`
            : title == "Phone"
            ? ""
            : item,
      };
      if (item != "") newSocial.push(object);
    });
    setSocial(newSocial);
  };

  useEffect(() => {
    getSocialLinks();
  }, [store]);

  return (
    <>
      {social && (
        <div className="container-links">
          {social.map(({ title, bg, link, icon }, key) => (
            <Link
              key={key}
              to={link}
              title={title}
              target={link == "" ? "" : "_blank"}
              style={{ background: bg }}
            >
              {icon}
              <label>{title}</label>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

const Links = ({ store }) => {
  const { socialLinks } = useContext(AuthContext);
  const [social, setSocial] = useState(null);
  const rrss = [
    store.urlStore,
    store.whatsapp,
    store.messenger,
    store.facebook,
    store.instagram,
    store.phone,
    store.tiktok,
  ];
  const getSocialLinks = () => {
    const newSocial = [];
    rrss.forEach((item, key) => {
      const icon = socialLinks[key].element;
      const title = socialLinks[key].title;
      const color = socialLinks[key].color;
      const object = {
        icon: icon,
        title: title == "Phone" ? "Teléfono" : title,
        bg: color,
        link:
          title == "Whatsapp"
            ? `https://wa.me/${item}`
            : title == "Phone"
            ? item
            : item,
      };
      if (item != "") newSocial.push(object);
    });
    setSocial(newSocial);
  };

  useEffect(() => {
    getSocialLinks();
  }, [store]);

  return (
    <>
      {social && (
        <div>
          {social.map(({ title, link }, key) => (
            <Link
              key={key}
              to={title != "Teléfono" ? link : ""}
              target={title == "Teléfono" ? "" : "_blank"}
            >
              <strong>{title}:&nbsp;</strong>
              {link}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Index";
import { Link } from "react-router-dom";
import "./Stores.scss";
import axios from "axios";

export const Ecommerce = ({ stores }) => {
  const { user } = useContext(AuthContext);

  const reladStore = async (xml, storeId) => {
    try {
      if (user && user.rol != "COMERCIANTE") return;
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
    }
  };
  return (
    <div className="all">
      {stores &&
        stores.map(({ storeId }, key) => {
          return (
            <div key={key} className="all-content">
              <div className="all-content-introduction">
                <div className="info">
                  <label>
                    {storeId.name} - {storeId.state}
                  </label>
                  <img src={storeId.urlLogo} alt={storeId.name} />
                </div>
                <div className="content">
                  <Link to={storeId.urlLogo} target="_blank">
                    {" "}
                    <strong>Logo: </strong>
                    {storeId.urlLogo}
                  </Link>
                  <Link to={storeId.banner} target="_blank">
                    {" "}
                    <strong>Banner: </strong>
                    {storeId.banner}
                  </Link>
                  <Link to={storeId.xml} target="_blank">
                    {" "}
                    <strong>XML: </strong>
                    {storeId.xml}
                  </Link>
                  <span>
                    {" "}
                    <strong>Descripción:</strong> {storeId.description}
                  </span>
                  <Links store={storeId}></Links>
                </div>
              </div>
              <div className="container">
                <div className="apart">
                  <label>Etiquetas</label>
                  {storeId.tags.length != 0 ? (
                    storeId.tags.map((item, key) => (
                      <span key={key}>{item}</span>
                    ))
                  ) : (
                    <>
                      <span>No tienes etiquetas</span>
                      <Link>Agregar etiquetas</Link>
                    </>
                  )}
                </div>
                <div className="apart">
                  <label>Opciones de envio</label>
                  {storeId.shippingTerms.length != 0 ? (
                    storeId.shippingTerms.map((item, key) => {
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
                      <span>No tienes opciones de envío</span>
                      <Link>Agregar opciones</Link>
                    </>
                  )}
                </div>
                <div className="apart">
                  <label>Opciones de pago</label>
                  {storeId.paymentOptions.length != 0 ? (
                    storeId.paymentOptions.map((item, key) => (
                      <span key={key}>{item}</span>
                    ))
                  ) : (
                    <>
                      <span>No tienes métodos de pago</span>
                      <Link>Agregar métodos</Link>
                    </>
                  )}
                </div>
              </div>
              <div>
                <SocialLinks store={storeId}></SocialLinks>
                <img src={storeId.banner} alt={storeId.name} />
              </div>
              <button
                className="reload"
                onClick={() => reladStore(storeId.xml, storeId._id)}
              >
                Recargar Feed
              </button>
            </div>
          );
        })}
    </div>
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
        title == "Tienda" || title == "Phone" ? "#000" : socialLinks[key].color;
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
              target={link == "" ? "" : "_blank"}
              style={{ cursor: link == "" && "text", background: bg }}
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
              <strong>{title}: </strong>
              {link}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

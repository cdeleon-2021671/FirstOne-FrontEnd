import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Index";
import { Link } from "react-router-dom";
import "./StoresList.scss";

export const StoresList = ({ stores }) => {
  return (
    <>
      {stores && stores.length !== 0 && (
        <div className="all-stores">
          {stores.map(({ store, products }, key) => {
            const { urlLogo, name, description, _id } = store;
            return (
              <Link
                to={`/${name.replace(/[ ]+/g, "-")}/${_id}`}
                className="all-stores-content"
                key={key}
              >
                <img src={urlLogo} alt={name} />
                <div className="container">
                  <div className="container-description">
                    <label>{name}</label>
                    <span>{description}</span>
                    <span style={{ color: "#008000" }}>
                      {products} productos
                    </span>
                  </div>
                  <div className="container-option">
                    <label>Opciones de envio</label>
                    {store.shippingTerms.map((item, key) => {
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
                    })}
                  </div>
                  <div className="container-option">
                    <label>Opciones de pago</label>
                    {store.paymentOptions.map((item, key) => (
                      <span key={key}>{item}</span>
                    ))}
                  </div>
                  <SocialLinks store={store}></SocialLinks>
                </div>
              </Link>
            );
          })}
        </div>
      )}
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
        <div className="container-links" onClick={(e) => e.preventDefault()}>
          {social.map(({ title, bg, link, icon }, key) => (
            <Link
              key={key}
              onClick={(e) => e.stopPropagation()}
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

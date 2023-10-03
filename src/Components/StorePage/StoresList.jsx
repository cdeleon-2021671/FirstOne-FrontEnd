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
            const { urlLogo, name, description } = store;
            return (
              <div className="all-stores-content" key={key}>
                <Link to={`/${name.replace(/[ ]+/g, "-")}/${store._id}`}>
                  <img src={urlLogo} alt={name} />
                </Link>
                <div className="container">
                  <div className="all-stores-content-information">
                    <h2>{name}</h2>
                    <span>{description}</span>
                    <span style={{ color: "#008000" }}>
                      {products} productos
                    </span>
                  </div>
                  <div className="all-stores-content-options">
                    <label>Opciones de envio</label>
                    {store.shippingTerms.map((item, key) => {
                      if (item.includes("http") || item.includes("www"))
                        return (
                          <Link key={key} to={item} target="_blank">
                            Ver más
                          </Link>
                        );
                      else return <span key={key}>{item}</span>;
                    })}
                  </div>
                  <div className="all-stores-content-options">
                    <label>Opciones de pago</label>
                    {store.paymentOptions.map((item, key) => (
                      <span key={key}>{item}</span>
                    ))}
                  </div>
                  <SocialLinks store={store}></SocialLinks>
                </div>
              </div>
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
    "",
    store.tiktok,
  ];
  const getSocialLinks = () => {
    const newSocial = [];
    rrss.forEach((item, key) => {
      const icon = socialLinks[key].element;
      const title = socialLinks[key].title;
      const object = {
        icon: icon,
        title: title == "Phone" ? item : title,
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
        <div className="links">
          {social.map(({ title, link, icon }, key) => (
            <Link
              key={key}
              to={link}
              target={link == "" ? "" : "_blank"}
              style={{ cursor: link == "" && "text" }}
            >
              {icon}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

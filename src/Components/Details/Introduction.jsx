import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Index";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlinePayments } from "react-icons/md";
import "./Introduction.scss";

export const Introduction = (product) => {
  const { name, price, description, urlProduct, image, storeId } = product;
  const { shippingTerms, paymentOptions } = storeId;

  return (
    <div id="details-introduction">
      <h1 className="title-responsive">{name}</h1>
      <img src={image} alt={name} className="img-product" />
      <div className="information-container">
        <div className="content">
          <h1>{name}</h1>
          <div className="banner">
            <div className="price-container">
              <div>
                <span>Q{price.toFixed(2).split(".")[0]}.</span>
                <span className="little">{price.toFixed(2).split(".")[1]}</span>
              </div>
            </div>
          </div>
          <p>{description}</p>
          <div className="options-container">
            {shippingTerms && (
              <TwoOptions
                array={shippingTerms}
                title="envío"
                myClass={"btn1Ship"}
                optionClass={"option1"}
                arrowNumber={"arrowIcon1"}
                icon={<LiaShippingFastSolid />}
              ></TwoOptions>
            )}

            {paymentOptions && (
              <TwoOptions
                array={paymentOptions}
                title="pago"
                myClass={"btn2Pay"}
                optionClass={"option2"}
                arrowNumber={"arrowIcon2"}
                icon={<MdOutlinePayments />}
              ></TwoOptions>
            )}
          </div>
          <div className="goToProduct">
            <Link to={urlProduct} target="_blank" title="Detalles del producto">
              Comprar
            </Link>
          </div>
        </div>
        <div className="store-information">
          <h2>{storeId.name}</h2>
          <div
            style={{ backgroundImage: `url(${storeId.urlLogo})` }}
            className="imgLogo"
          />
          <p>{storeId.description}</p>
          <div className="rrss">
            <Link to={`${storeId.urlStore}`} title={`Ir a ${storeId.name}`} target="_blank">
              Vendido por {storeId.name}
            </Link>
            <RRSS storeId={storeId} />
          </div>
          <div className="goToMyStore">
            <Link
              to={`/${storeId.name}/${storeId._id}`}
              title={`Detalles de ${storeId.name}`}
            >
              Ver tienda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const RRSS = ({ storeId }) => {
  const { socialLinks } = useContext(AuthContext);
  const [social, setSocial] = useState(null);

  const ssll = [
    "",
    storeId.whatsapp,
    storeId.messenger,
    storeId.facebook,
    storeId.instagram,
    storeId.phone,
    storeId.tiktok,
  ];

  const getSocialLinks = () => {
    const newSocial = [];
    ssll.forEach((item, key) => {
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
  }, []);
  return (
    <>
      {social && (
        <>
          {social.map(({ title, link, icon }, key) => (
            <Link
              key={key}
              to={link}
              title={title}
              target={link == "" ? "" : "_blank"}
              style={{ cursor: link == "" && "text" }}
            >
              <label>{icon}</label>
              {title}
            </Link>
          ))}
        </>
      )}
    </>
  );
};

const TwoOptions = ({ array, title, myClass, optionClass, icon }) => {
  return (
    <div className="options">
      <span className={`${title != "pago" ? "isActive" : ""} ${myClass}`}>
        Opciones de {title}
        <label>{icon}</label>
      </span>
      <div className={`${optionClass}`}>
        {array.map((item, key) => {
          if (item.includes("http") || item.includes("www"))
            return (
              <Link to={item} key={key} target="_blank">
                Ver más
              </Link>
            );
          else return <label key={key}>{item}</label>;
        })}
      </div>
    </div>
  );
};

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Index";
import "./ProductsCard.scss";
import $ from "jquery";

export const ProductsCard = ({ products, tags }) => {
  const { offers } = useContext(AuthContext);
  const [myOffers, setMyOffers] = useState(null);

  useEffect(() => {
    if ($(".more-options")[0]) $(".more-options")[0].scrollLeft = 0;
  }, [tags]);

  useEffect(() => {
    const allOffers = [];
    offers.forEach(({ _id }, key) => {
      allOffers.push(_id);
    });
    setMyOffers(allOffers);
  }, [products]);

  return (
    <>
      {products && (
        <div id="products-card">
          {tags && tags.length !== 0 && (
            <div className="more-options">
              <label>Ver más:</label>
              {tags.map((item, key) => (
                <Link key={key} to={`/${item}`}>
                  {item}
                </Link>
              ))}
            </div>
          )}
          <div className="products">
            {products.map(
              (
                {
                  _id,
                  tags,
                  image,
                  urlProduct,
                  price,
                  name,
                  storeId,
                  salePrice,
                },
                key
              ) => {
                const saleOff = (salePrice * 100) / price;
                return (
                  <Link
                    key={key}
                    to={`/${name}/${tags.join("-")}/${price}/${_id}`}
                    className="single-product"
                  >
                    <img src={image} alt={name} />
                    {salePrice || (myOffers && myOffers.includes(_id)) ? (
                      <small className="tag-offer">Oferta</small>
                    ) : null}
                    <div className="product-information">
                      <h1>
                        {name} - {storeId.name}
                      </h1>
                      <div className="price-container">
                        {salePrice && (
                          <div className="offer-porcent">
                            <span>-{saleOff}%</span>
                          </div>
                        )}
                        <div className="price">
                          <span>Q{price.toFixed(2).split(".")[0]}.</span>
                          <span className="little">
                            {price.toFixed(2).split(".")[1]}
                          </span>
                        </div>
                      </div>
                      {salePrice && (
                        <div className="salePrice">
                          <span className="normal-price">Precio normal:</span>
                          <span className="tipico">
                            Q{salePrice.toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                    <RRSS storeId={storeId} urlProduct={urlProduct}></RRSS>
                  </Link>
                );
              }
            )}
          </div>
        </div>
      )}
    </>
  );
};

const RRSS = ({ storeId, urlProduct }) => {
  const { socialLinks } = useContext(AuthContext);
  const [social, setSocial] = useState(null);
  const ssll = [
    urlProduct,
    storeId.whatsapp,
    storeId.messenger,
    storeId.facebook,
    storeId.instagram,
    "",
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
        <div className="social-links">
          {social.map(({ title, link, icon }, key) => (
            <Link
              key={key}
              to={link}
              target={link == "" ? "" : "_blank"}
              style={{ cursor: link == "" && "text" }}
              title={title}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {icon}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

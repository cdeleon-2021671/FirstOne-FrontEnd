import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Index";

export const Description = ({ description, urlProduct, storeId }) => {
  const { socialLinks } = useContext(AuthContext);
  const social = [
    { id: 0, link: urlProduct },
    { id: 1, link: storeId.whatsapp },
    { id: 2, link: storeId.messenger },
    { id: 3, link: storeId.facebook },
    { id: 4, link: storeId.instagram },
    { id: 5, link: storeId.phone },
    { id: 6, link: storeId.tiktok },
  ];

  const allSocial = social.filter((item) => item.link != "");

  return (
    <div className="descriptionOfProduct">
      <p>{description}</p>
      <div className="socialContainer">
        <label>Comprar:</label>
        {allSocial && (
          <div>
            {allSocial.map((item) => (
              <Link key={item.id} to={item.link}>
                <label>{socialLinks[item.id].element}</label>
                <span>{socialLinks[item.id].title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


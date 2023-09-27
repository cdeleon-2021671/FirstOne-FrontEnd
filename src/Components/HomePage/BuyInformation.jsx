import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import "./BuyInformation.scss";
import { AuthContext } from "../../Index";

export const BuyInformation = () => {
  const { menuItems } = useContext(AuthContext);

  return (
    <>
      {menuItems && (
        <div id="buy-container">
          <article>
            <div className="items">
              {menuItems.map(({ id, title, icon, url }) => (
                <Link key={id} to={url}>
                  <label>{icon}</label>
                  <span>{title}</span>
                </Link>
              ))}
            </div>
            <div className="explore">
              <Link to={""}>
                <span>Explorar</span>
                <label>
                  <IoIosArrowForward />
                </label>
              </Link>
            </div>
          </article>
        </div>
      )}
    </>
  );
};

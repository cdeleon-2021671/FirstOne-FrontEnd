import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Index";
import "./Aside.scss";

export const Aside = () => {
  const { menuItems } = useContext(AuthContext);
  const [items, setItems] = useState(null);
  const [icons, setIcons] = useState(null);

  useEffect(() => {
    const { menu } = menuItems;
    const { methods } = menuItems;
    setItems(menu);
    setIcons(methods);
  }, [menuItems]);

  return (
    <div id="aside-content" className="thisMenu">
      {items && (
        <div className="items">
          {items.map((element) => (
            <ItemsLink {...element} key={element.id} />
          ))}
          {icons && (
            <div className="contact">
              <div className="divider">
                <label>Redes sociales</label>
                <hr />
              </div>
              <div className="social">
                {icons.map(({ id, icon, url }) => (
                  <Link key={id} to={url} target="_blank">
                    {icon}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ItemsLink = ({ title, url, icon }) => {
  return (
    <Link to={`${url}`} className="item-link">
      {icon}
      {title}
    </Link>
  );
};

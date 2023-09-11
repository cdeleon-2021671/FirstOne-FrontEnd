import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../Index";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import "./Introduction.scss";

export const Introduction = () => {
  const { stores } = useContext(AuthContext);
  const introductionRef = useRef(null);
  const [viewArrow, setViewArrow] = useState(false);

  const moveLeft = () => {
    const container = introductionRef.current;
    const { scrollWidth, scrollLeft } = container;
    if (scrollLeft == 0) container.scrollLeft = scrollWidth;
    else container.scrollLeft -= 450;
  };

  const moveRight = () => {
    const container = introductionRef.current;
    const { clientWidth, scrollWidth, scrollLeft } = container;
    const scrollRight = scrollWidth - scrollLeft - clientWidth;
    if (scrollRight == 0) container.scrollLeft = 0;
    else container.scrollLeft += 450;
  };

  useEffect(() => {
    setTimeout(() => {
      const container = introductionRef.current;
      const { clientWidth, scrollWidth } = container;
      if (scrollWidth > clientWidth) setViewArrow(true);
    }, 500);
  }, []);

  return (
    <div className="introductionContainer">
      <span className="descriptionStore">
        Todo lo que buscas <br /> lo encuentras en Tienda.gt
      </span>
      {stores && (
        <div className="scrollStores">
          {viewArrow && (
            <button className="arrowLeft" onClick={moveLeft}>
              <MdOutlineArrowBackIos></MdOutlineArrowBackIos>
            </button>
          )}
          <div ref={introductionRef}>
            {stores.map((item, key) => (
              <ShowAllStores key={key} {...item} />
            ))}
          </div>
          {viewArrow && (
            <button className="arrowRight" onClick={moveRight}>
              <MdOutlineArrowForwardIos></MdOutlineArrowForwardIos>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const ShowAllStores = ({ urlLogo, name, _id }) => {
  return (
    <Link to={`/store/${name}-${_id}`} target="_blank">
      <img src={urlLogo} alt={name} />
      <span>{name}</span>
    </Link>
  );
};

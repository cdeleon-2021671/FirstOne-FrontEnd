import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { AuthContext } from "../../Index";
import "./Introduction.scss";

export const Introduction = () => {
  const { stores } = useContext(AuthContext);
  const containerRef = useRef(null);

  const moveLeft = () => {
    const container = containerRef.current;
    const { innerWidth } = window;
    let scroll = 0;
    if (innerWidth >= 1550) scroll = 24 * 10.7;
    else scroll = (innerWidth * 15) / 100;
    container.scrollLeft -= scroll;
    const { scrollLeft } = container;
    $("#arrowRightStore").removeClass("hiddenButton");
    if (scrollLeft <= scroll) $("#arrowLeftStore").addClass("hiddenButton");
  };

  const moveRight = () => {
    const container = containerRef.current;
    const { innerWidth } = window;
    let scroll = 0;
    if (innerWidth >= 1550) scroll = 24 * 10.7;
    else scroll = (innerWidth * 15) / 100;
    container.scrollLeft += scroll;
    const { scrollLeft } = container;
    const { scrollWidth } = container;
    const { clientWidth } = container;
    const scrollRight = scrollWidth - clientWidth - scrollLeft;
    $("#arrowLeftStore").removeClass("hiddenButton");
    if (scrollRight <= scroll) {
      $("#arrowRightStore").addClass("hiddenButton");
    }
  };

  useEffect(() => {
    moveLeft();
  }, []);

  return (
    <>
      {stores && stores.length !== 0 && (
        <div id="stores-container">
          <div className="stores">
            <div className="single">
              <button id="arrowLeftStore" onClick={moveLeft}>
                <IoIosArrowBack />
              </button>
              <div ref={containerRef}>
                {stores.map(({ urlLogo, _id, name, description }) => {
                  return (
                    <Link key={_id} to={`/${name}/${_id}`}>
                      <img src={urlLogo} alt={name} />
                      <label>{name}</label>
                    </Link>
                  );
                })}
                {stores.map(({ urlLogo, _id, name }) => {
                  return (
                    <Link key={_id}>
                      <img src={urlLogo} alt={name} />
                      <label>{name}</label>
                    </Link>
                  );
                })}
              </div>
              {stores.length > 1 && (
                <button id="arrowRightStore" onClick={moveRight}>
                  <IoIosArrowForward />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ShowStores = ({ array }) => {
  return (
    <>
      {array.map(({ _id, urlLogo, name }) => (
        <Link
          key={_id}
          to={`/store/${name}/${_id}`}
          title={`Ver tienda ${name}`}
        >
          <img src={urlLogo} alt={name} />
          <span>{name}</span>
        </Link>
      ))}
    </>
  );
};

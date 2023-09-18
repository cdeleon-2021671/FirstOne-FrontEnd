import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { AuthContext } from "../../Index";
import './Introduction.scss'

export const Introduction = () => {
  const { stores } = useContext(AuthContext);
  const repeat = stores && stores.length < 4 ? 5 : 1;
  const containerRef = useRef(null);

  const moveLeft = () => {
    const container = containerRef.current;
    container.scrollLeft -= 400;
    const { scrollLeft } = container;
    const { scrollWidth } = container;
    const { clientWidth } = container;
    const scrollRight = scrollWidth - clientWidth - scrollLeft;
    if (scrollRight == 0) $("#arrowRightStore").removeClass("hiddenButton");
    if (scrollLeft <= 400) $("#arrowLeftStore").addClass("hiddenButton");
  };

  const moveRight = () => {
    const container = containerRef.current;
    container.scrollLeft += 400;
    const { scrollLeft } = container;
    const { scrollWidth } = container;
    const { clientWidth } = container;
    const scrollRight = scrollWidth - clientWidth - scrollLeft;
    if (scrollRight <= 400) {
      $("#arrowRightStore").addClass("hiddenButton");
    }
    if (scrollLeft == 0) $("#arrowLeftStore").removeClass("hiddenButton");
  };

  useEffect(() => {
    $("#arrowLeftStore").addClass("hiddenButton");
  }, []);

  return (
    <div id="stores-container">
      <div className="description">
        <span>Todo lo que buscas lo encuentras en Tienda.gt</span>
      </div>
      <div className="stores">
        <button onClick={moveLeft} id="arrowLeftStore">
          <IoIosArrowBack />
        </button>
        <div ref={containerRef}>
          {stores &&
            Array.from(new Array(repeat)).map((item, key) => (
              <ShowStores array={stores} key={key}></ShowStores>
            ))}
        </div>
        <button onClick={moveRight} id="arrowRightStore">
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

const ShowStores = ({ array }) => {
  return (
    <>
      {array.map(({ _id, urlLogo, name }) => (
        <Link key={_id} to={`/store/${name}/${_id}`} title={`Ver tienda ${name}`}>
          <img src={urlLogo} alt={name} />
          <span>{name}</span>
        </Link>
      ))}
    </>
  );
};

import React from "react";
import { GoToLink } from "../GoToLink/GoToLink";
import "./Banner.scss";

export const Banner = ({ banner, urlStore }) => {
  return (
    <>
      {banner && (
        <div
          id="banner1"
          style={{
            backgroundImage: `url(${banner})`,
          }}
        >
          <GoToLink
            url={urlStore}
            mode="_blank"
            title="Explora toda la tienda"
          ></GoToLink>
        </div>
      )}
    </>
  );
};

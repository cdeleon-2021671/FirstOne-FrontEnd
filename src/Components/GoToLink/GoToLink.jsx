import React from "react";
import { Link } from "react-router-dom";
import "./GoToLink.scss";

export const GoToLink = ({ url = "", title = "Explorar todo", mode = "" }) => {
  return (
    <div className="goToLink">
      <Link to={url} target={mode}>{title}</Link>
    </div>
  );
};
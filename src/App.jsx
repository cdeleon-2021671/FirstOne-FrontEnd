import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./Styles.scss";

function App() {
  return (
    <>
      <Header></Header>
      <div className="max-page-container">
        <div className="max-width-computer">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}

export default App;

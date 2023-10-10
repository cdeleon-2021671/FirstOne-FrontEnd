import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import { Navbar } from "./Components/Navbar/Navbar";
import { HelmetProvider } from "react-helmet-async";
import "./Styles.scss";

function App() {
  return (
    <HelmetProvider>
      <Header></Header>
      <Navbar></Navbar>
      <div className="max-page-container">
        <div className="max-page-container-content">
          <Outlet></Outlet>
        </div>
      </div>
    </HelmetProvider>
  );
}
export default App;

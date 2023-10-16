import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import { Navbar } from "./Components/Navbar/Navbar";
import { Login } from "./Components/Forms/Login";
import { HelmetProvider } from "react-helmet-async";
import "./Styles.scss";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <HelmetProvider>
      {showLogin && <Login setView={setShowLogin}></Login>}
      <Header setView={setShowLogin}></Header>
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

import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import { Navbar } from "./Components/Navbar/Navbar";
import { HelmetProvider } from "react-helmet-async";
import "./Styles.scss";

function App() {
  const location = useLocation();
  const [view, setView] = useState(true);

  useEffect(() => {
    const { pathname } = location;
    if (pathname.includes("form")) setView(false);
    else if (pathname.includes("join")) setView(false);
    else setView(true);
  }, [location]);

  return (
    <HelmetProvider>
      {view && (
        <>
          <Header></Header>
          <Navbar></Navbar>
        </>
      )}
      {location.pathname == "/" && (
        <img src={`/assets/Tienda.gt-banner.jpg`} alt="Tienda.gt" />
      )}
      <div className="max-page-container">
        <div className="max-page-container-content">
          <Outlet></Outlet>
        </div>
      </div>
    </HelmetProvider>
  );
}
export default App;

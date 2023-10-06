import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Login } from "./Components/Forms/Login";
import { Header } from "./Components/Header/Header";
import { Navbar } from "./Components/Navbar/Navbar";
import { HelmetProvider } from "react-helmet-async";
import "./Styles.scss";

function App() {
  const [showForm, setShowForm] = useState(false);
  return (
    <HelmetProvider>
      {showForm && <Login setView={setShowForm}></Login>}
      <Header setView={setShowForm}></Header>
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

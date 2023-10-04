import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Login } from "./Components/Forms/Login";
import { Header } from "./Components/Header/Header";
import { Navbar } from "./Components/Navbar/Navbar";
import { Helmet, HelmetData } from "react-helmet-async";
import "./Styles.scss";

function App() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="max-page-container">
      {showForm && <Login setView={setShowForm}></Login>}
      <Header setView={setShowForm}></Header>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
}

export default App;

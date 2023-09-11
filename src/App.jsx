import React from "react";
import { Header } from "./Components/Header/Header";
import { Outlet } from "react-router-dom";
import "./Styles.scss";

function App() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
}

export default App;

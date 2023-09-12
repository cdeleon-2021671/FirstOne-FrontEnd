import React from "react";
import { Header } from "./Components/Header/Header";
import { Outlet } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
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

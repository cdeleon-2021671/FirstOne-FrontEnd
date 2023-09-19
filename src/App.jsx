import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import { Aside } from "./Components/Aside/Aside";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./Styles.scss";

function App() {
  return (
    <>
      <Header></Header>
      <main id="main-content">
        <Aside></Aside>
        <div id="outlet-content">
          <Outlet></Outlet>
        </div>
      </main>
    </>
  );
}

export default App;
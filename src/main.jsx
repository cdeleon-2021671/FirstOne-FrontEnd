import React from "react";
import ReactDOM from "react-dom/client";
import { Index } from "./Index";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Index></Index>
    </HelmetProvider>
  </React.StrictMode>
);

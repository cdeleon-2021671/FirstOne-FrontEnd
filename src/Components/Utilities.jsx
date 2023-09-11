import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { NotFoundPage } from "../Pages/NotFoundPage/NotFoundPage";
import { HomePage } from "../Pages/HomePage";
import { StorePage } from "../Pages/StorePage";
import { ProductDetails } from "../Pages/ProductDetails";
import { SearchPage } from "../Pages/SearchPage";
import App from "../App";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "store/:store",
        element: <StorePage />,
      },
      {
        path: "product-details/:filter",
        element: <ProductDetails />,
      },
      {
        path: "searching/:search",
        element: <SearchPage />,
      },
    ],
  },
]);

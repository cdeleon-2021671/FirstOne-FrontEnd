import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import {
  BsWhatsapp,
  BsFacebook,
  BsMessenger,
  BsInstagram,
  BsTiktok,
  BsFillTelephoneFill,
} from "react-icons/bs";
import { NotFoundPage } from "../Pages/NotFoundPage/NotFoundPage";
import { HomePage } from "../Pages/HomePage";
import { StorePage } from "../Pages/StorePage";
import { ProductDetails } from "../Pages/ProductDetails";
import { Filters } from "../Pages/Filters";
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
        path: "product-details/:productId",
        element: <ProductDetails />,
      },
      {
        path: "searching/:search",
        element: <Filters />,
      },
    ],
  },
]);

export const socialLinks = [
  {
    title: "Store",
    element: <HiShoppingCart />,
  },
  {
    title: "Whatsapp",
    element: <BsWhatsapp />,
  },
  {
    title: "Messenger",
    element: <BsMessenger />,
  },
  {
    title: "Facebook",
    element: <BsFacebook />,
  },
  {
    title: "Instagram",
    element: <BsInstagram />,
  },
  {
    title: "Teléfono",
    element: <BsFillTelephoneFill />,
  },
  {
    title: "TikTok",
    element: <BsTiktok />,
  }
];

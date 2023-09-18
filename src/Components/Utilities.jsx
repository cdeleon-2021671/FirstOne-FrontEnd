import React from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
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
import App from "../App";
import { StorePage } from "../Pages/StorePage";
import { Details } from "../Pages/Details";
import { OutletProducts } from "../Pages/OutletProducts";

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
        path: "store",
        element: <Outlet></Outlet>,
        children: [
          {
            path: ":store/:storeId",
            element: <StorePage />,
          },
          {
            path: ":store/:storeId/:category",
            element: <OutletProducts />,
          },
        ],
      },
      {
        path: ":store/products/:storeId",
        element: <OutletProducts />,
      },
      {
        path: ":store/offers/:storeId",
        element: <OutletProducts />,
      },
      {
        path: "searching",
        element: <OutletProducts />,
      },
      {
        path: "searching/:search",
        element: <OutletProducts />,
      },
      {
        path: "products",
        element: <Outlet></Outlet>,
        children: [
          {
            path: "all",
            element: <OutletProducts />,
          },
          {
            path: "offers",
            element: <OutletProducts />,
          },
          {
            path: ":category",
            element: <OutletProducts />,
          },
        ],
      },
      {
        path: "product/:product/:productId",
        element: <Details />,
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
    title: "Phone",
    element: <BsFillTelephoneFill />,
  },
  {
    title: "TikTok",
    element: <BsTiktok />,
  },
];

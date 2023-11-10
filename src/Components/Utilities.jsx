import React from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import { NotFoundPage } from "../Pages/NotFoundPage/NotFoundPage";
import { HomePage } from "../Pages/HomePage";
import { StorePage } from "../Pages/StorePage";
import { OutletProducts } from "../Pages/OutletProducts";
import { AllCategories } from "../Pages/AllCategories";
import { Details } from "../Pages/Details";
import App from "../App";
import { AllStores } from "../Pages/AllStores";
import { Register } from "./Forms/Register";
import { RegisterStore } from "../Pages/RegisterStore";
import { Profile } from "../Pages/Profile";
import { Info } from "./Profile/Info";
import { StoreInformation } from "./Join/StoreInformation";
import { Form } from "./Join/Form";
import { Tags } from "./Join/Tags";
import { Stores } from "./Profile/Stores";
import { Users } from "./Profile/Users";
import { Payment } from "./Join/Payment";
import { Shipping } from "./Join/Shipping";
import { AddUser } from "./Forms/AddUser";
import { Ecommerce } from "./Profile/Ecommerce";
import {
  FaFacebookF,
  FaFacebookMessenger,
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaShoppingCart,
  FaPhoneAlt,
} from "react-icons/fa";
import { Login } from "./Forms/Login";
import { Question } from "./Forms/Question";

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
        path: "join/trade-online",
        element: <RegisterStore></RegisterStore>,
        children: [
          {
            path: "step1",
            element: <Form></Form>,
          },
          {
            path: "step2",
            element: <StoreInformation></StoreInformation>,
          },
          {
            path: "step2/tags/:storeId",
            element: <Tags></Tags>,
          },
          {
            path: "step2/payment/:storeId",
            element: <Payment></Payment>,
          },
          {
            path: "step2/shipping/:storeId",
            element: <Shipping></Shipping>,
          },
        ],
      },
      {
        path: "form",
        element: <Outlet></Outlet>,
        children: [
          {
            path: "login",
            element: <Login></Login>,
          },
          {
            path: "type",
            element: <Question></Question>,
          },
          {
            path: "register",
            element: <Register></Register>,
          }
        ]
      },
      {
        path: "profile",
        element: <Profile></Profile>,
        children: [
          {
            path: "store/:store/:storeId",
            element: <Ecommerce></Ecommerce>,
          },
          {
            path: "info/:user/:userId",
            element: <Info></Info>,
          },
          {
            path: "all-stores",
            element: <Stores></Stores>,
          },
          {
            path: "all-users",
            element: <Users></Users>,
          },
          {
            path: "register/:type",
            element: <AddUser></AddUser>,
          },
        ],
      },
      // Detalles de una tienda | Funciona
      {
        path: ":store/:storeId",
        element: <StorePage />,
      },
      // Todas los productos de una categoria | Funciona
      {
        path: ":category",
        element: <OutletProducts />,
      },
      // Todas las categorias | Funciona
      {
        path: "all-categories",
        element: <AllCategories />,
      },
      // Todas las mas vistos | Funciona
      {
        path: "all-popular-in-store",
        element: <OutletProducts />,
      },
      // Todas las productos trending | Funciona
      {
        path: "trending-48-hours",
        element: <OutletProducts />,
      },
      // Todas las ofertas | Funciona
      {
        path: "all-offers-in-store",
        element: <OutletProducts />,
      },
      // Todas las tiendas | Funciona
      {
        path: "all-stores",
        element: <AllStores />,
      },
      // Todos los productos de una categoria de una tienda | Funciona
      {
        path: ":category/:store/:storeId",
        element: <OutletProducts />,
      },
      // Todas las ofertas de una tienda | Funciona
      {
        path: ":store/offers/:storeId",
        element: <OutletProducts />,
      },
      // Todos los productos de una tienda | Funciona
      {
        path: ":store/popular/:storeId",
        element: <OutletProducts />,
      },
      // Todos los productos trending de una tienda | Funciona
      {
        path: ":store/trending/:storeId",
        element: <OutletProducts />,
      },
      // Resultados de busqueda | Funciona
      {
        path: "gt/products-results/:search",
        element: <OutletProducts />,
      },
      // Detalles de un producto | Funciona
      {
        path: ":product/:tags/:price/:productId",
        element: <Details />,
      },
    ],
  },
]);

export const socialLinks = [
  {
    title: "Tienda",
    color: "transparent",
    element: <FaShoppingCart />,
  },
  {
    title: "Whatsapp",
    color: "#25D366",
    element: <FaWhatsapp />,
  },
  {
    title: "Messenger",
    color: "linear-gradient(#00B2FF, #006AFF)",
    element: <FaFacebookMessenger />,
  },
  {
    title: "Facebook",
    color: "#0866ff",
    element: <FaFacebookF />,
  },
  {
    title: "Instagram",
    color: `radial-gradient(circle at 33% 100%, #fed373 4%, #f15245 30%, #d92e7f 62%, #9b36b7 85%, #515ecf)`,
    element: <FaInstagram />,
  },
  {
    title: "Phone",
    color: "transparent",
    element: <FaPhoneAlt />,
  },
  {
    title: "TikTok",
    color: "transparent",
    element: <FaTiktok />,
  },
];

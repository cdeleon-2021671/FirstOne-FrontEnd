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
  BsShieldLock,
} from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { NotFoundPage } from "../Pages/NotFoundPage/NotFoundPage";
import { HomePage } from "../Pages/HomePage";
import App from "../App";
import { StorePage } from "../Pages/StorePage";
import { Details } from "../Pages/Details";
import { OutletProducts } from "../Pages/OutletProducts";
import { AllCategories } from "../Pages/AllCategories";
import { v4 } from "uuid";

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
      // Todos los productos | Funciona
      {
        path: "all-products-in-store",
        element: <OutletProducts />,
      },
      // Todas las ofertas | Funciona
      {
        path: "all-offers-in-store",
        element: <OutletProducts />,
      },
      // Todos los productos de una categoria de una tienda
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
        path: ":store/products/:storeId",
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
    title: "Producto",
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

export const menuItems = [
  {
    id: v4(),
    title: "Sitios seguros",
    icon: <BsShieldLock />,
    url: "",
  },
  {
    id: v4(),
    title: "Empresas verificadas",
    icon: <MdVerified />,
    url: "",
  },
  {
    id: v4(),
    title: "Tienda.gt 100% empresas chapinas verificadas",
    icon: <img src="https://flagcdn.com/w20/gt.png" alt="GT" />,
    url: "",
  },
];

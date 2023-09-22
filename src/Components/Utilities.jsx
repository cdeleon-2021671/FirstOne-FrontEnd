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
  BsTwitter,
  BsCheckCircle,
} from "react-icons/bs";
import { NotFoundPage } from "../Pages/NotFoundPage/NotFoundPage";
import { HomePage } from "../Pages/HomePage";
import App from "../App";
import { StorePage } from "../Pages/StorePage";
import { Details } from "../Pages/Details";
import { OutletProducts } from "../Pages/OutletProducts";
import { AllCategories } from "../Pages/AllCategories";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { AiOutlineDropbox } from "react-icons/ai";
import { FaCircleUser } from "react-icons/fa6";
import { HiUserAdd } from "react-icons/hi";
import { BiLogoGmail } from "react-icons/bi";
import { TfiWorld } from "react-icons/tfi";
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
        path: "all-categories",
        element: <AllCategories />,
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

export const menuItems = {
  menu: [
    {
      id: v4(),
      title: "Acerca de tienda.gt",
      icon: <IoIosInformationCircleOutline />,
      url: "",
    },
    {
      id: v4(),
      title: "Todas las tiendas",
      icon: <HiShoppingCart />,
      url: "",
    },
    {
      id: v4(),
      title: "Todos los productos",
      icon: <AiOutlineDropbox />,
      url: "",
    },
    {
      id: v4(),
      title: "Disponibles",
      icon: <BsCheckCircle />,
      url: "",
    },
    {
      id: v4(),
      title: "Iniciar sesión",
      icon: <FaCircleUser />,
      url: "",
    },
    {
      id: v4(),
      title: "Registrarse",
      icon: <HiUserAdd />,
      url: "",
    },
  ],
  methods: [
    {
      id: v4(),
      icon: <BiLogoGmail />,
      url: "",
    },
    {
      id: v4(),
      icon: <BsWhatsapp />,
      url: "",
    },
    {
      id: v4(),
      icon: <TfiWorld />,
      url: "https://webifica.com/",
    },
    {
      id: v4(),
      icon: <BsFacebook />,
      url: "",
    },
  ],
};

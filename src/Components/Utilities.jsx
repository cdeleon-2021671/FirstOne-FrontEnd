import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { NotFoundPage } from "../Pages/NotFoundPage/NotFoundPage";
import { HomePage } from "../Pages/HomePage";
import { StorePage } from "../Pages/StorePage";
import { OutletProducts } from "../Pages/OutletProducts";
import { AllCategories } from "../Pages/AllCategories";
import { Details } from "../Pages/Details";
import App from "../App";
import { BsWhatsapp, BsTiktok, BsMessenger } from "react-icons/bs";
import { AllStores } from "../Pages/AllStores";

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
      // Todas las mas vistos | Funciona
      {
        path: "most-viewed",
        element: <OutletProducts />,
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
    element: (
      <svg
        shapeRendering="geometricPrecision"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fillOpacity={0}
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
      </svg>
    ),
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
    element: (
      <svg
        shapeRendering="geometricPrecision"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fillOpacity={0}
      >
        <path
          fill="var(--geist-fill)"
          d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
        />
      </svg>
    ),
  },
  {
    title: "Instagram",
    element: (
      <svg
        shapeRendering="geometricPrecision"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fillOpacity={0}
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <path d="M17.5 6.5h.01" />
      </svg>
    ),
  },
  {
    title: "Phone",
    element: (
      <svg
        shapeRendering="geometricPrecision"
        stroke="currentColor"
        strokLinecap="round"
        strokLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fillOpacity={0}
      >
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    title: "TikTok",
    element: <BsTiktok />,
  },
];

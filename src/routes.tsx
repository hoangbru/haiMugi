/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Navigate,
  createBrowserRouter,
} from "react-router-dom";

import { LayoutSite, LayoutAdmin } from "./layouts";
import {
  About,
  Checkout,
  Contact,
  Home,
  PageNotFound,
  ProductDetailPage,
  ProductsPage,
  SigninPage,
  SignupPage,
} from "./pages";
import {
  CategoryAdd,
  CategoryEdit,
  CategoryList,
  Dashboard,
  ProductAdd,
  ProductEdit,
  ProductList,
} from "./pages/admin";
import { PrivateRoute } from "./helpers/protectionRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutSite />,
    children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/products/:id", element: <ProductDetailPage /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
  {
    path: "/admin",
    element: <PrivateRoute isAuth={true} />,
    children: [
      {
        element: <LayoutAdmin />,
        children: [
          { index: true, element: <Navigate to="dashboard" /> },
          { path: "dashboard", element: <Dashboard /> },
          {
            path: "products",
            children: [
              { index: true, element: <Navigate to="list" /> },
              { path: "list", element: <ProductList /> },
              { path: "add", element: <ProductAdd /> },
              { path: ":id/edit", element: <ProductEdit /> },
            ],
          },
          {
            path: "categories",
            children: [
              { index: true, element: <Navigate to="list" /> },
              { path: "list", element: <CategoryList /> },
              { path: "add", element: <CategoryAdd /> },
              { path: ":id/edit", element: <CategoryEdit /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/signin",
    element: <SigninPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

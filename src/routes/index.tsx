import {  createBrowserRouter } from "react-router-dom";
import Test from "./Test";
import { Home, Signin, Signup } from "@/pages";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "test",
    element: <Test />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "signin",
    element: <Signin />,
  },
]);

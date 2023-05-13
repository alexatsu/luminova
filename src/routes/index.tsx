import {  createBrowserRouter } from "react-router-dom";
import Test from "./Test";
import { Home, Login, Join, Error } from "@/pages";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "test",
    element: <Test />,
  },
  {
    path: "join",
    element: <Join />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);

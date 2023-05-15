import {  createBrowserRouter } from "react-router-dom";
import Test from "./Test";
import { Home, Login, Join, Error } from "@/pages";
import { Favorites } from "@/pages/Favorites";

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
  {
    path: "favorites",
    element: <Favorites/>
  }
]);

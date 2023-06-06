import { RouteObject } from "react-router-dom";
import { Home, Category, Join, Login } from "../pages";
import { Root } from "../layouts";
import { Error } from "../../../pages";

export const core: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "categories/:category",
        element: <Category />,
      },
    ],
  },
  {
    path: "join",
    element: <Join />,
  },
  {
    path: "login",
    element: <Login />,
  },
];

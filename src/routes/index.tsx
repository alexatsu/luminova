import { createBrowserRouter } from "react-router-dom";
import Test from "./Test";
import { Home, Login, Join, Error } from "@/pages";
import { Favorites } from "@/pages";
import { Category } from "@/pages";
import { Root } from "@/pages/Root";
import Blog from "@/pages/Blog/Blog";

export const routes = createBrowserRouter([
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
    element: <Favorites />,
  },
  {
    path: "blog",
    element: <Blog/>
  }
]);

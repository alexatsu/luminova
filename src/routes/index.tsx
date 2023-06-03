import { createBrowserRouter } from "react-router-dom";
import Blog from "@/modules/blog/Blog";
import { Root } from "@/modules/core/layouts";
import { Error } from "@/pages";
import { Home, Login, Join, Category } from "@/modules/core/pages";

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
    path: "join",
    element: <Join />,
  },
  {
    path: "login",
    element: <Login />,
  },

  {
    path: "blog",
    element: <Blog />,
  },
]);

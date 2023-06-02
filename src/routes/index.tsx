import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Join, Favorites, Category, Root } from "@/pages/Core";
import { Error } from "@/pages";
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
    element: <Blog />,
  },
]);

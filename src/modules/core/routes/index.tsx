import { RouteObject } from "react-router-dom";
import { Home, Category, Join, Login, Promotion, Discover } from "../pages";
import { Root, Profile, Account } from "../layouts";
import { Error } from "../../../pages";
import { CloseAccount, ChangePass, Collections, Edit, Likes, Photos, Stats } from "../pages/user";

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
  {
    path: "advertise",
    element: <Promotion />,
  },
  {
    path: "discover",
    element: <Discover />,
  },
  {
    path: "/:userName",
    element: <Profile />,
    children: [
      {
        index: true,
        element: <Photos />,
      },
      {
        path: "likes",
        element: <Likes />,
      },
      {
        path: "collections",
        element: <Collections />,
      },
      {
        path: "stats",
        element: <Stats />,
      },
    ],
  },
  {
    path: "/account",
    element: <Account />,
    children: [
      {
        index: true,
        element: <Edit />,
      },
      {
        path: "password",
        element: <ChangePass />,
      },
      {
        path: "close",
        element: <CloseAccount />,
      },
    ],
  },
];

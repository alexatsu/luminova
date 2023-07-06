import { RouteObject } from "react-router-dom";
import { UserProfile as Root, Photos, Likes, Collections, Stats } from "../index";

export const profile: RouteObject[] = [
  {
    path: "profile",
    element: <Root />,
    children: [
      {
        path: "/profile/photos",
        element: <Photos />,
      },
      {
        path: "/profile/likes",
        element: <Likes />,
      },
      {
        path: "/profile/collections",
        element: <Collections />,
      },
      {
        path: "/profile/stats",
        element: <Stats />,
      },
    ],
  },
];

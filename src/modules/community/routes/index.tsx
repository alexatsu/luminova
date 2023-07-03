import { RouteObject } from "react-router-dom";
import { Root } from "@/layouts";
import { Error } from "@/pages";
import {
  Awards,
  Collection,
  Contributor,
  Stats,
  Trends,
  Topics,
} from "../pages";

export const community: RouteObject[] = [
  {
    path: "community",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "awards",
        element: <Awards />,
      },
      {
        path: "collection",
        element: <Collection />,
      },
      {
        path: "contributor",
        element: <Contributor />,
      },
      {
        path: "stats",
        element: <Stats />,
      },
      {
        path: "trends",
        element: <Trends />,
      },
      {
        path: "topics",
        element: <Topics />,
      },
    ],
  },
];

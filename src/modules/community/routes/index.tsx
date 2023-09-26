import { RouteObject } from "react-router-dom";
import { Root } from "@/shared/layouts";
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

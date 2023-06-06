import { RouteObject } from "react-router-dom";
import { Root } from "../layouts";
import { License } from "../pages";
import { Error } from "@/pages";
import { Privacy } from "../pages/Privacy";

export const tos: RouteObject[] = [
  {
    path: "tos",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "license",
        element: <License />,
      },
      {
        path: "privacy",
        element: <Privacy />,
      },
    ],
  },
];

import { RouteObject } from "react-router-dom";
import { Root } from "@/layouts";
import { License, Conditions, Security, Privacy } from "../pages";
import { Error } from "@/pages";

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
      {
        path: "conditions",
        element: <Conditions />,
      },
      {
        path: "security",
        element: <Security />,
      },
    ],
  },
];

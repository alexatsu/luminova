import { RouteObject } from "react-router-dom";
import { Root } from "@/shared/layouts";
import { License, Conditions, Security, Privacy } from "../pages";

export const tos: RouteObject[] = [
  {
    path: "tos",
    element: <Root />,
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

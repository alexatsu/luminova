import { RouteObject } from "react-router-dom";
import { Root } from "../layouts/Root";
import { About } from "../pages";

export const company: RouteObject[] = [
  {
    path: "company",
    element: <Root />,
    children: [
      {
        path: "about",
        element: <About />,
      },
    ],
  },
];

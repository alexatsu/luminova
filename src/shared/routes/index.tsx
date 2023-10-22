import { createBrowserRouter } from "react-router-dom";
import { core } from "@/modules/core/routes";
import { tos } from "@/modules/tos/routes";
import { company } from "@/modules/company/routes";
import { blog } from "@/modules/blog/routes";

import { Error, interactiveSearch } from "../pages";

const { Root: RootSearch, Images, Collections, Users } = interactiveSearch;

const shared = [
  {
    path: "search",
    element: <RootSearch />,
    children: [
      {
        path: "images/:query",
        element: <Images />,
      },
      {
        path: "collections/:query",
        element: <Collections />,
      },
      {
        path: "users/:query",
        element: <Users />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
];

export const routes = createBrowserRouter([...core, ...blog, ...tos, ...company, ...shared]);

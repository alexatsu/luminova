import { createBrowserRouter } from "react-router-dom";
import { core } from "@/modules/core/routes";
import { tos } from "@/modules/tos/routes";
import { company } from "@/modules/company/routes";
import { community } from "@/modules/community/routes";
import { blog } from "@/modules/blog/routes";

import { Error, interactiveSearch } from "../pages";

const { Root: RootSearch, Images } = interactiveSearch;

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
        element: <div>SearchCollections</div>,
      },
      {
        path: "users/:query",
        element: <div>SearchUsers</div>,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
];

export const routes = createBrowserRouter([
  ...core,
  ...blog,
  ...tos,
  ...company,
  ...community,
  ...shared,
]);

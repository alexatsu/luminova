import { createBrowserRouter } from "react-router-dom";
import { core } from "@/modules/core/routes";
import { tos } from "@/modules/tos/routes";
import { company } from "@/modules/company/routes";
import { community } from "@/modules/community/routes";
import { blog } from "@/modules/blog/routes";

import { Error, InteractiveSearch } from "../pages";

export const routes = createBrowserRouter([
  ...core,
  ...blog,
  ...tos,
  ...company,
  ...community,
  {
    path: "search",
    element: <InteractiveSearch />,
    children: [
      {
        path: "images/:query",
        element: <div>SearchImages</div>,
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
]);

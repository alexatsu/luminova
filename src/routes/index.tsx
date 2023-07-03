import { RouteObject, createBrowserRouter } from "react-router-dom";
import Blog from "@/modules/blog/Blog";
import { core } from "@/modules/core/routes";
import { tos } from "@/modules/tos/routes";
import { company } from "@/modules/company/routes";
import { community } from "@/modules/community/routes";

const blog: RouteObject[] = [
  {
    path: "blog",
    element: <Blog />,
  },
];
export const routes = createBrowserRouter([
  ...core,
  ...blog,
  ...tos,
  ...company,
  ...community,
]);

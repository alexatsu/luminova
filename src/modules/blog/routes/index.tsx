import { RouteObject } from "react-router-dom";
import Blog from "../Blog";

export const blog: RouteObject[] = [
  {
    path: "blog",
    element: <Blog />,
  },
];

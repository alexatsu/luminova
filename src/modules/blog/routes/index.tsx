import { RouteObject } from "react-router-dom";

const { Blog } = await import("../Blog");

export const blog: RouteObject[] = [
  {
    path: "blog",
    lazy: async () => ({ Component: Blog }),
  },
];

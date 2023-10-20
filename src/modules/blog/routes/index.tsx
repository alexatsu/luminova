import { RouteObject } from "react-router-dom";


export const blog: RouteObject[] = [
  {
    path: "blog",
    async lazy() {
      const { Blog } = await import("../Blog");
      return { Component: Blog };
    },
    
  },
];

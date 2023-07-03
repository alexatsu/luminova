import { createBrowserRouter } from "react-router-dom";
import { core } from "@/modules/core/routes";
import { tos } from "@/modules/tos/routes";
import { company } from "@/modules/company/routes";
import { community } from "@/modules/community/routes";
import { blog } from "@/modules/blog/routes";

export const routes = createBrowserRouter([...core, ...blog, ...tos, ...company, ...community]);

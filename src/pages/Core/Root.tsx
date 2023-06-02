import { Outlet } from "react-router-dom";
import { Navbar } from "@/pages/Core/layouts";

export function Root() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

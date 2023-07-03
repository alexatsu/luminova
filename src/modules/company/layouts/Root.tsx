import { Navbar } from "@/layouts";
import { Outlet } from "react-router-dom";

export function Root() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

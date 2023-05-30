import { Outlet } from "react-router-dom";
import { Navbar } from "@/layouts";
export function Root() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

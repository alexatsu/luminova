import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export function Root() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

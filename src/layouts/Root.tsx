import { Outlet } from "react-router-dom";
import { MemoizedNavbar } from "./Navbar";

export function Root() {
  return (
    <>
      <MemoizedNavbar />
      <Outlet />
    </>
  );
}

import { MemoizedNavbar } from "@/layouts";
import { Outlet } from "react-router-dom";

export function Root() {
  return (
    <>
      <MemoizedNavbar />
      <Outlet />
    </>
  );
}

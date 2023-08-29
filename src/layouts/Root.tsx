import { Outlet } from "react-router-dom";
import { MemoizedNavbar } from "./Navbar";
import { Footer } from "./Footer";

export function Root() {
  return (
    <div>
      <MemoizedNavbar />
      <Outlet />
      <Footer />
    </div>
  );
}

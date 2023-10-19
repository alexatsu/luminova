import { Outlet } from "react-router-dom";
import { MemoizedNavbar } from "./Navbar";
import { Footer } from "./Footer";
import { PageWrapper } from "./PageWrapper";

export function Root() {
  return (
    <PageWrapper>
      <MemoizedNavbar />
      <Outlet />
      <Footer />
    </PageWrapper>
  );
}

import { Footer, MemoizedNavbar, PageWrapper } from "../../layouts";
import { Outlet } from "react-router-dom";

export function Root() {
  return (
    <PageWrapper>
      <MemoizedNavbar />
      <Outlet />
      <Footer />
    </PageWrapper>
  );
}

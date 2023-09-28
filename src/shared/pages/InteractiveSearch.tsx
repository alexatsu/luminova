import { Footer, MemoizedNavbar, PageWrapper } from "../layouts";
import { Outlet } from "react-router-dom";

export function InteractiveSearch() {
  return (
    <PageWrapper>
      <MemoizedNavbar />
      <div>here will be the tabs</div>
      <Outlet />
      <Footer />
    </PageWrapper>
  );
}

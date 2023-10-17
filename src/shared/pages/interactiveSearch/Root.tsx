import { Outlet } from "react-router-dom";

import { Footer, MemoizedNavbar, PageWrapper } from "../../layouts";
import { SearchTabs } from "@shared/components";

export function Root() {
  return (
    <PageWrapper>
      <MemoizedNavbar />
      <SearchTabs />
      <Outlet />
      <Footer />
    </PageWrapper>
  );
}

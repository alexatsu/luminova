import { Outlet } from "react-router-dom";

import { AssistNav, ProgressBar, ScrollTopButton } from "@/components";
import { Footer, MemoizedNavbar } from "@/layouts";

export function Root() {
  return (
    <div>
      <MemoizedNavbar />
      <AssistNav />
      <Outlet />
      <ScrollTopButton />
      <Footer />
      <ProgressBar />
    </div>
  );
}

import { Outlet } from "react-router-dom";

import { AssistNav, ProgressBar, ScrollTopButton } from "@/shared/components";
import { Footer, MemoizedNavbar } from "@/shared/layouts";

export function Root() {
  return (
    <main>
      <MemoizedNavbar />
      <AssistNav />
      <Outlet />
      <ScrollTopButton />
      <Footer />
      <ProgressBar />
    </main>
  );
}

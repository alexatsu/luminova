import { Outlet } from "react-router-dom";

import { MemoizedNavbar, PageWrapper, Footer } from "@shared/layouts";
import { Sidebar } from "../layouts";

import sass from "../sass/pages/Root.module.scss";

export function Root() {
  return (
    <PageWrapper>
      <MemoizedNavbar />
      <Main />
      <Footer />
    </PageWrapper>
  );
}

function Main() {
  return (
    <main className={sass.main}>
      <Sidebar />
      <Outlet />
    </main>
  );
}

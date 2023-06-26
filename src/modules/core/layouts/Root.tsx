import { Outlet } from "react-router-dom";
import { Navbar } from "@/layouts";
import { AssistNav, ProgressBar, ScrollTopButton } from "@/components";

export function Root() {
  return (
    <>
      <Navbar />
      <AssistNav />
      <Outlet />
      <ScrollTopButton />
      <ProgressBar />
    </>
  );
}

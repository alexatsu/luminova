import { Outlet } from "react-router-dom";
import { Navbar } from "@/layouts";
import { AssistNav, ProgressBar } from "@/components";

export function Root() {
  return (
    <div>
      <Navbar />
      <AssistNav />
      <Outlet />
      <ProgressBar />
    </div>
  );
}

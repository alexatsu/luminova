import { Outlet, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Footer } from "./Footer";

import sass from "../sass/layouts/Account.module.scss";
import { MemoizedNavbar } from "@/layouts";

const dataPoints = [
  {
    title: "Edit Profile",
    path: "/account",
  },
  {
    title: "Change password",
    path: "/account/password",
  },
  {
    title: "Close account",
    path: "/account/close",
  },
];

export const Account = () => {
  const { pathname } = useLocation();
  const points = dataPoints.map(({ title, path }) => {
    const isActive = pathname === path;
    return (
      <li key={title}>
        <NavLink to={path} style={isActive ? { color: "#111", textDecoration: "none" } : undefined}>
          {title}
        </NavLink>
      </li>
    );
  });

  return (
    <div className={sass.container}>
      <MemoizedNavbar />

      <div className={sass.wrapper}>
        <div className={sass.sidebar}>
          <h2>Account settings</h2>
          <ul>{points}</ul>
        </div>
        <main>
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

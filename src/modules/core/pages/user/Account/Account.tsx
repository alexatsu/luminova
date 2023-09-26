import { Outlet, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Footer } from "@/shared/layouts";

import sass from "../../../sass/pages/user/Account.module.scss";
import { MemoizedNavbar } from "@/shared/layouts";

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

  return (
    <div className={sass.container}>
      <MemoizedNavbar />

      <div className={sass.wrapper}>
        <div className={sass.sidebar}>
          <h2>Account settings</h2>
          <ul>
            {dataPoints.map(({ title, path }) => (
              <li key={title}>
                <NavLink
                  to={path}
                  style={pathname === path ? { color: "#111", textDecoration: "none" } : undefined}
                >
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <main className={sass.main}>
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

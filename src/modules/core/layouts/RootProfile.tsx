import { AiOutlineUser } from "react-icons/ai";
import { NavLink, Outlet, useMatch } from "react-router-dom";
import { Navbar } from "@/layouts";

import sass from "../sass/layouts/RootProfile.module.scss";

const dataPoints = [
  {
    title: "Photos",
    path: "/profile",
  },
  {
    title: "Likes",
    path: "/profile/likes",
  },
  {
    title: "Collections",
    path: "/profile/collections",
  },
  {
    title: "Stats",
    path: "/profile/stats",
  },
];

export const RootProfile = () => {
  const points = () =>
    dataPoints.map(({ title, path }) => {
      const isActive = useMatch(path);
      return (
        <NavLink
          key={path}
          to={path}
          style={isActive ? { color: "#111", borderBottom: "2px solid #111" } : { color: "gray" }}
        >
          {title}
        </NavLink>
      );
    });

  return (
    <div className={sass.profile}>
      <Navbar />

      <div className={sass.wrapper}>
        <AiOutlineUser color="rgb(175, 175, 175)" className={sass.image} />
        <div className={sass.infoWrapper}>
          <div className={sass.info}>
            <h1 className={sass.username}>USERNAME</h1>
            <button className={sass.editBtn}>
              <span>&#9998;</span>Edit profile
            </button>
          </div>
          <p style={{ fontSize: "0.9rem" }}>
            Download free, beautiful high-quality photos curated by USERNAME
          </p>
          <span style={{ color: "grey" }}>&#10006; Not avalible for hire</span>
        </div>
      </div>

      <nav className={sass.navigation}>
        {points()}
        <hr />
      </nav>

      <Outlet />
    </div>
  );
};

import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Navbar } from "@/layouts";
import { AiOutlineUser } from "react-icons/ai";
import { MdInsertPhoto, MdFavorite, MdCollections, MdBarChart } from "react-icons/md";
import { Logo } from "@/components";

import sass from "../sass/layouts/Profile.module.scss";

const dataPoints = [
  {
    icon: <MdInsertPhoto />,
    title: "Photos",
    path: "/profile",
  },
  {
    icon: <MdFavorite />,
    title: "Likes",
    path: "/profile/likes",
  },
  {
    icon: <MdCollections />,
    title: "Collections",
    path: "/profile/collections",
  },
  {
    icon: <MdBarChart />,
    title: "Stats",
    path: "/profile/stats",
  },
];

export const Profile = () => {
  const { pathname } = useLocation();
  const points = dataPoints.map(({ icon, title, path }) => {
    const isActive = pathname === path;
    return (
      <NavLink
        key={path}
        to={path}
        style={isActive ? { color: "#111", borderBottom: "2px solid #111" } : { color: "gray" }}
      >
        {icon}
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
            <h2 className={sass.username}>USERNAME</h2>
            <Link to="/account" style={{ textDecoration: "none" }}>
              <button className={sass.editBtn}>
                <span>&#9998;</span>Edit profile
              </button>
            </Link>
          </div>
          <p style={{ fontSize: "0.9rem" }}>
            Download free, beautiful high-quality photos curated by USERNAME
          </p>
          <span style={{ color: "grey" }}>&#10006; Not avalible for hire</span>
        </div>
      </div>

      <nav className={sass.navigation}>{points}</nav>
      <hr />

      <Outlet />

      <footer className={sass.footer}>
        <Logo />
        <p>Make something awesome</p>
      </footer>
    </div>
  );
};

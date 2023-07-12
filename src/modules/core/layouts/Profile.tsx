import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { Navbar } from "@/layouts";
import { AiOutlineUser } from "react-icons/ai";
import { MdInsertPhoto, MdFavorite, MdCollections, MdBarChart } from "react-icons/md";
import { Logo } from "@/components";

import sass from "../sass/layouts/Profile.module.scss";

export const Profile = () => {
  const { userName } = useParams();
  const dataPoints = [
    {
      icon: <MdInsertPhoto />,
      title: "Photos",
      path: `/${userName}`,
    },
    {
      icon: <MdFavorite />,
      title: "Likes",
      path: `/${userName}/likes`,
    },
    {
      icon: <MdCollections />,
      title: "Collections",
      path: `/${userName}/collections`,
    },
    {
      icon: <MdBarChart />,
      title: "Collections",
      path: `/${userName}/collections`,
    },
  ];
  const { pathname } = useLocation();
  const LSUserName = localStorage.getItem("userName");
  const points = dataPoints.map(({ title, path }) => {
    const isActive = pathname === path;
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
            <h1 className={sass.username}>{LSUserName}</h1>
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

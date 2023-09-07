import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";

import { AiOutlineUser } from "react-icons/ai";
import { MdInsertPhoto, MdFavorite, MdCollections} from "react-icons/md";
import { Logo } from "@/components";

import sass from "../../sass/pages/user/ProfileRoot.module.scss";
import { MemoizedNavbar } from "@/layouts";

export const ProfileRoot = () => {
  const { userName } = useParams();
  const tabs = [
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
  ];

  const { pathname } = useLocation();

  return (
    <div className={sass.profile}>
      <MemoizedNavbar />

      <div className={sass.wrapper}>
        <AiOutlineUser color="rgb(175, 175, 175)" className={sass.image} />
        <div className={sass.infoWrapper}>
          <div className={sass.info}>
            <h1 className={sass.username}>{userName}</h1>
            <Link to="/account" style={{ textDecoration: "none" }}>
              <button className={sass.editBtn}>
                <span>&#9998;</span>Edit profile
              </button>
            </Link>
          </div>
          <p style={{ fontSize: "0.9rem" }}>
            Download free, beautiful high-quality photos curated by {userName}
          </p>
        </div>
      </div>

      <div className={sass.navigation}>
        {tabs.map(({ title, path, icon }) => {
          const isActive = pathname === path;
          return (
            <NavLink
              key={path}
              to={path}
              style={
                isActive ? { color: "#111", borderBottom: "2px solid #111" } : { color: "gray" }
              }
            >
              {icon}
              {title}
            </NavLink>
          );
        })}
      </div>
      <hr />

      <Outlet />

      <footer className={sass.footer}>
        <Logo />
        <p>Make something awesome</p>
      </footer>
    </div>
  );
};

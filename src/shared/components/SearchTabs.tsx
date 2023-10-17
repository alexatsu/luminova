import { MdCollections, MdInsertPhoto, MdPermIdentity } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";

import sass from "@shared/styles/components/SearchTabs.module.scss";

export function SearchTabs() {
  const { pathname } = useLocation();
  const splitPathname = pathname.split("/");
  const getTab = splitPathname[2];
  const query = splitPathname[3];

  const tabIcon = (tab: string) => (getTab === tab ? `${sass.icon}` : `${sass.iconFaded}`);
  const tabTitle = (tab: string) => (getTab === tab ? `${sass.title}` : `${sass.titleFaded}`);

  const list = [
    {
      id: 1,
      icon: <MdInsertPhoto className={tabIcon("images")} />,
      title: <span className={tabTitle("images")}>Images</span>,
      link: `/search/images/${query}`,
    },
    {
      id: 2,
      icon: <MdCollections className={tabIcon("collections")} />,
      title: <span className={tabTitle("collections")}>Collections</span>,
      link: `/search/collections/${query}`,
    },
    {
      id: 3,
      icon: <MdPermIdentity className={tabIcon("users")} />,
      title: <span className={tabTitle("users")}>Users</span>,
      link: `/search/users/${query}`,
    },
  ];

  const navlinkStyles = ({ isActive }: { isActive: boolean }) => ({
    borderBottom: isActive ? "2px solid #111" : "none",
    color: isActive ? "#111" : "",
    textDecoration: "none",
  });

  return (
    <ul className={sass.ul}>
      {list.map(({ icon, title, id, link }) => (
        <NavLink key={id} to={link} style={navlinkStyles}>
          <li className={sass.list}>
            {icon}
            {title}
          </li>
        </NavLink>
      ))}
    </ul>
  );
}

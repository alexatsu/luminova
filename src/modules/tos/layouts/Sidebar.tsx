import sass from "../sass/layouts/Sidebar.module.scss";
import { NavLink } from "react-router-dom";

export function Sidebar() {
  const paths = [
    { title: "License", path: "/tos/license" },
    { title: "Privacy Policy", path: "/tos/privacy" },
    { title: "Cookie Policy", path: "/tos/cookies" },
    { title: "Terms & Conditions", path: "/tos/terms" },
  ];

  return (
    <div className={sass.container}>
      <h1>Luminova</h1>
      <ul className={sass.list}>
        {paths.map(({ title, path }) => (
          <NavLink
            to={path}
            key={path}
            style={({ isActive }) =>
              isActive ? { textDecoration: "underline" } : { textDecoration: "none" }
            }
          >
            <li>{title}</li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}

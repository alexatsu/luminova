import { NavLink } from "react-router-dom";
import "@/styles/assistNav.scss";
import { paths } from "@/utils";

export function AssistNav() {
  const RenderNavlink = ({ to, children }: { to: string; children: React.ReactNode }) => {
    return (
      <NavLink
        to={to}
        style={({ isActive }) => ({
          borderBottom: isActive ? "2px solid #111" : "none",
          color: isActive ? "#111" : "",
        })}
      >
        {children}
      </NavLink>
    );
  };

  const categoriesList = paths.map(({ name, path }) => {
    return (
      <li key={name}>
        <RenderNavlink to={`categories/${path}`}>{name}</RenderNavlink>
      </li>
    );
  });

  return (
    <div className="assist-nav">
      <div className="main-category">
        <ul>
          <li>
            <RenderNavlink to="/">Editorial</RenderNavlink>
          </li>
        </ul>
      </div>

      <div className="line"></div>

      <div className="other-categories">
        <ul>{categoriesList}</ul>
      </div>
    </div>
  );
}

import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { paths } from "@/shared/utils";
import "@/shared/styles/assistNav.scss";

export function AssistNav() {
  const categoriesList = paths.map(({ name, path }) => {
    return (
      <li key={name}>
        <RenderNavlink to={`categories/${path}`}>{name}</RenderNavlink>
      </li>
    );
  });

  const ref = useRef<HTMLUListElement>(null);

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
        <div
          className="btn-left"
          onClick={() => (ref.current!.scrollLeft -= 150)}
          role="button"
          tabIndex={0}
        >
          <img src="/img/arrow.png" alt="to Left" />
        </div>

        <div
          className="btn-right"
          onClick={() => (ref.current!.scrollLeft += 150)}
          role="button"
          tabIndex={0}
        >
          <img src="/img/arrow.png" alt="to Right" />
        </div>

        <ul ref={ref}>{categoriesList}</ul>
      </div>
    </div>
  );
}
function RenderNavlink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        borderBottom: isActive ? "3px solid #111" : "none",
        color: isActive ? "#111" : "",
      })}
    >
      {children}
    </NavLink>
  );
}

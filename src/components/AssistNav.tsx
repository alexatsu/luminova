import { useState, useRef } from "react";

import { NavLink } from "react-router-dom";
import "@/styles/assistNav.scss";
import { paths } from "@/utils";

export function AssistNav() {
  const RenderNavlink = ({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) => {
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

  const ref = useRef<HTMLUListElement>(null);

  const [dragging, setDragging] = useState(false);

  const onDragging = (event: any) => {
    if (!dragging || !event.target || !ref.current) return;

    console.log("dragging");

    event.target.scrollLeft -= event.movementX;

    const width = ref.current.scrollWidth - ref.current.clientWidth;

    const percentage = (100 * event.target.scrollLeft) / width;

    document.querySelector<HTMLElement>(
      ".nav-progress-fill"
    )!.style.width = `${percentage}%`;
  };

  const onSetDraggingTrue = (event: any) => {
    if (event.target != ref.current) return;
    setDragging(true);
  };

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
        <ul
          ref={ref}
          onMouseMove={onDragging}
          onMouseDown={(event) => onSetDraggingTrue(event)}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
        >
          {categoriesList}

          <div className="nav-progress-bar">
            <div className="nav-progress-fill"></div>
          </div>
        </ul>
      </div>
    </div>
  );
}

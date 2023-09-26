import { Link } from "react-router-dom";
import { Logo } from "@/shared/components";

import sass from "../styles/Footer.module.scss";

export const Footer = () => {
  const mainList = [
    { title: "About", path: "/company/about" },
    { title: "Join the team", path: "/company/jointheteam" },
    { title: "Become a Contributor", path: "/community/contributor" },
    { title: "Press", path: "/company/press" },
    { title: "Blog", path: "/blog" },
    { title: "Terms & Conditions", path: "/tos/conditions" },
    { title: "Community", path: "/community" },
    { title: "Luminova Awards", path: "/community/awards" },
  ];

  const additionalList = [
    { title: "Help Center", path: "/company/helpcenter" },
    { title: "Privacy Policy", path: "/tos/privacy" },
    { title: "License", path: "/tos/license" },
  ];

  return (
    <footer className={sass.wrapper}>
      <h4>Luminova</h4>
      <nav>
        <ul>
          {mainList.map(({ title, path }) => (
            <li key={title}>
              <Link to={path}>{title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <hr />
      <div className={sass.subFooter}>
        <div className={sass.logo}>
          <Link to="/">
            <Logo />
          </Link>
          <p>Make something awesome</p>
        </div>
        <nav>
          <ul>
            {additionalList.map(({ title, path }) => (
              <li key={title}>
                <Link to={path}>{title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

import { Link } from "react-router-dom";
import { Logo } from "@/shared/components";

import sass from "../styles/Footer.module.scss";

export const Footer = () => {
  const mainList = [
    { title: "About", path: "/company/about" },
    { title: "Blog", path: "/blog" },
    { title: "Advertise", path: "/advertise" },
    { title: "Terms & Conditions", path: "/tos/terms" },
    { title: "Privacy Policy", path: "/tos/privacy" },
    { title: "License", path: "/tos/license" },
    { title: "Cookies", path: "/tos/cookies" },
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
          <p style={{marginBottom: "0"}}>Make something awesome</p>
        </div>
      </div>
    </footer>
  );
};

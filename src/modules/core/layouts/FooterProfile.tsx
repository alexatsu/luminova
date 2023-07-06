import { Logo } from "@/components";

import sass from "../sass/layouts/FooterProfile.module.scss";
export const FooterProfile = () => {
  return (
    <footer className={sass.footer}>
      <Logo />
      <p>Make something awesome</p>
    </footer>
  );
};

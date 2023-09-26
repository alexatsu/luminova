import { useEffect, useState } from "react";

import sass from "../styles/components/ScrollTopButton.module.scss";

export function ScrollTopButton() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const timerId = setTimeout(() => setScrollY(window.scrollY), 500);
      return () => clearTimeout(timerId);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  return (
    <div
      className={sass.button}
      style={{
        opacity: scrollY > 250 ? "1" : "0",
        cursor: scrollY > 250 ? "pointer" : "default",
      }}
      onClick={handleScrollToTop}
      aria-hidden="true"
    >
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="25" cy="24.9998" r="25" transform="rotate(-180 25 24.9998)" fill="#222222" />
        <path
          d="M26.0607 13.9391C25.4749 13.3533 24.5251 13.3533 23.9393 13.9391L14.3934 23.485C13.8076 24.0708 13.8076 25.0206 14.3934 25.6064C14.9792 26.1921 15.9289 26.1921 16.5147 25.6064L25 17.1211L33.4853 25.6064C34.0711 26.1921 35.0208 26.1921 35.6066 25.6064C36.1924 25.0206 36.1924 24.0708 35.6066 23.485L26.0607 13.9391ZM26.5 34.9998L26.5 14.9998H23.5L23.5 34.9998H26.5Z"
          fill="#F8F1FF"
        />
      </svg>
    </div>
  );
}

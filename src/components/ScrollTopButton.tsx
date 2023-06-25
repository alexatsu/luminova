import { useEffect, useState } from "react";

export function ScrollTopButton() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => setScrollY(window.scrollY));

    return () => {
      window.removeEventListener("scroll", () => setScrollY(window.scrollY));
    };
  });

  console.log("scroll");

  const onScrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="scroll-top-button"
      style={{
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        cursor: "pointer",
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: "1",
        transition: "all 0.2s ease-in-out",
        opacity: scrollY > 250 ? "1" : "0",
      }}
      onClick={onScrollTop}
      aria-hidden="true"
    >
      <img src="/img/arrow-top.png" alt="Arrow" style={{ width: "100%" }} />
    </div>
  );
}

import { useEffect } from "react";
import "../styles/components/progressBar.css";

export const ProgressBar = () => {
  const progressBar = () => {
    let pixelsFromTop = window.scrollY;
    let documentHeight = document.body.clientHeight;
    let windowHeight = window.innerHeight;
    let difference = documentHeight - windowHeight;
    let percentage = (100 * pixelsFromTop) / difference;
    document.querySelector<HTMLElement>(".ProgressBar-inner")!.style.width = `${percentage}%`;
  };

  useEffect(() => {
    window.addEventListener("scroll", progressBar);
    return () => window.removeEventListener("scroll", progressBar);
  }, []);

  return (
    <div className="ProgressBar">
      <div className="ProgressBar-inner"></div>
    </div>
  );
};

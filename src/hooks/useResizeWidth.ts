import { useEffect, useState } from "react";

export default function useResizeWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setTimeout(() => setWidth(window.innerWidth), 300);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

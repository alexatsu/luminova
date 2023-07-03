import { useEffect, useState } from "react";

type Debounce<T extends string[]> = (
  func: (...args: T) => void,
  delay: number
) => (...args: T) => void;

export const useResizeWidth = () => {
  const [width, setWidth] = useState(0);

  const debounce: Debounce<[]> = (func, delay) => {
    return (...args) => {
      const timeout = setTimeout(() => func(...args), delay);
      return () => clearTimeout(timeout);
    };
  };

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();

    const debouncedHandleResize = debounce(handleResize, 300);

    window.addEventListener("resize", debouncedHandleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  return width;
};

import { useEffect, useState } from "react";

type Debounce<T extends string[]> = (
  func: (...args: T) => void,
  delay: number
) => (...args: T) => void;

export const useResizeWidth = () => {
  const [width, setWidth] = useState(0);

  const debounce: Debounce<[]> = (func, delay) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args) => {
      timeoutId && clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
    };

    handleResize();

    const debouncedHandleResize = debounce(handleResize, 300);

    window.addEventListener("resize", debouncedHandleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  return width;
};

import { useEffect, useState } from "react";

export const useDebounce = <T>(data: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(data);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(data), delay);
    return () => clearTimeout(timeout);
  }, [data, delay]);

  return { debouncedValue };
};



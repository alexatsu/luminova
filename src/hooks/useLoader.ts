import { useEffect, useState } from "react";

export default function useLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoading = () => setIsLoading(false);

  useEffect(() => {
    window.addEventListener("load", handleLoading);
    return () => window.removeEventListener("load", handleLoading);
  }, []);
  return isLoading;
}

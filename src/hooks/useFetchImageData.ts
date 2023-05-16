import { useEffect, useState, useCallback } from "react";
type ImagesProps = {
  public_id: string;
  url: string;
  filename: string;
  active: boolean;
};
type ImageResources = { resources: ImagesProps[] };
export type { ImageResources, ImagesProps };
export const useFetchImageData = (url: string) => {
  const [data, setData] = useState<ImageResources>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchImageData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchImageData();
  }, [fetchImageData]);

  return { data, isLoading };
};

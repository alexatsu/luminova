import { endpoints } from "@/utils";
import { useState, useEffect } from "react";

export const useUploadImage = () => {
  const [loading, setLoading] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);
  const [imageData, setImageData] = useState({ title: "", url: "" });

  const addImageHandler = async () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      const { url, title } = imageData;

      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, title }),
      };

      fetch(endpoints.images.addImage, options)
        .then((data) => {
          data.json().then((data) => console.log(data, "add image"));
        })
        .catch((err) => {
          console.log(err.message);
        });

      setLoading(false);
      setDoneLoading(true);
      setImageData({ title: "", url: "" });
    }, 3000);
  };

  useEffect(() => {
    const timeout = doneLoading ? setTimeout(() => setDoneLoading(false), 3000) : undefined;

    return () => timeout && clearTimeout(timeout);
  }, [doneLoading]);

  return {
    imageData,
    setImageData,
    addImageHandler,
    doneLoading,
    loading,
  };
};

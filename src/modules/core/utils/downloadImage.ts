import { ImagesProps } from "@/types";

const downloadImage = async (url: ImagesProps["url"], filename: ImagesProps["filename"]) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const link = window.URL.createObjectURL(blob);
  const tag = document.createElement("a");
  tag.style.display = "none";
  tag.href = link;
  tag.download = filename;
  document.body.appendChild(tag);
  tag.click();
  window.URL.revokeObjectURL(link);
};

export { downloadImage };

import { ImageResources } from "@/types";
import { handleFetch } from "@/utils";

async function getProfilePhotos(url: string): Promise<ImageResources> {
  const userName = localStorage.getItem("userName");

  const response = await handleFetch(url, "POST", { name: userName });
  return response;
}

export { getProfilePhotos };

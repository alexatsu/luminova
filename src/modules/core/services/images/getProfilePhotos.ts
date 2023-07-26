import { ImageResources } from "@/types";
import { handleFetch } from "@/utils";

async function getProfilePhotos(url: string): Promise<ImageResources> {
  const response = await handleFetch(url, "POST");
  return response;
}

export { getProfilePhotos };

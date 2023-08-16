import { ImageResources } from "@/types";
import { handleFetch } from "@/utils";

async function getProfileImages(url: string): Promise<ImageResources> {
  const response = await handleFetch(url, "POST");
  return response;
}

export { getProfileImages };

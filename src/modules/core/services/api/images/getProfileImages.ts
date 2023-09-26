import { ImageResources } from "@/shared/types";
import { handleFetch } from "@/shared/utils";

async function getProfileImages(url: string): Promise<ImageResources> {
  const response = await handleFetch(url, "POST");
  return response;
}

export { getProfileImages };

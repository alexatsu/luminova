import { ImageResources } from "@/types";
import { endpoints, handleFetch } from "@/utils";

async function getCorePhotos(category: string | undefined): Promise<ImageResources> {
  const { forNonUser, forUser } = endpoints.images;
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    const fetchForAnyone = await handleFetch(forNonUser, "POST", {
      category: category,
      next_cursor: "",
    });
    return fetchForAnyone;
  }

  const fetchForUser = await handleFetch(forUser, "POST", {
    accessToken: accessToken,
    category: category,
    next_cursor: "",
  });
  return fetchForUser;
}

export { getCorePhotos };

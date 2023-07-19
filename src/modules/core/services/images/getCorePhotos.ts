import { ImageResources } from "@/types";
import { endpoints, handleFetch } from "@/utils";

async function getCorePhotos(category: string | undefined): Promise<ImageResources> {
  const { forNonUser, forUser } = endpoints.images;
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    const fetchForAnyone: ImageResources = await handleFetch(forNonUser, "POST", {
      category: category,
      next_cursor: "",
    });
    console.log(fetchForAnyone, 'fetchForAnyone');
    return fetchForAnyone;
  }

  const fetchForUser: ImageResources = await handleFetch(forUser, "POST", {
    accessToken: accessToken,
    category: category,
    next_cursor: "",
  });
  console.log(fetchForUser, ' fetchForUser');
  return fetchForUser;
}

export { getCorePhotos };

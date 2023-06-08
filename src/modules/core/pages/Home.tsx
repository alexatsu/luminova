import { useResizeWidth } from "@/hooks";
import { ImagesBlock, Footer, PagePreview } from "../layouts";
import { useImages } from "../hooks";
import { endpoints, handleFetch } from "@/utils";
import { ImageResources } from "@/types";
import { PageContainer } from "../components";
import { Loader } from "@/components";
import temporal from "./temporal.avif";

export function Home() {
  const width = useResizeWidth();
  const accessToken = localStorage.getItem("accessToken");

  const fetchImages = async (): Promise<ImageResources> => {
    const { imagesForNonUser, imagesForUser } = endpoints.images;

    if (!accessToken) {
      const fetchForAnyone = await handleFetch(imagesForNonUser);
      return fetchForAnyone;
    }

    const fetchForUser = await handleFetch(imagesForUser, "POST", {}, { accessToken: accessToken });
    return fetchForUser;
  };

  const queryKey = ["images", accessToken];
  const { data, isLoading, updateFavoriteImages } = useImages(queryKey, fetchImages);

  return (
    <PageContainer>
      <PagePreview imgURL={temporal} />
      {isLoading ? (
        <Loader style={{ margin: "auto" }} />
      ) : (
        <ImagesBlock width={width} data={data!} updateFavImages={updateFavoriteImages} />
      )}
      <Footer />
    </PageContainer>
  );
}

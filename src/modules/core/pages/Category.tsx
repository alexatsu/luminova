import { endpoints, handleFetch } from "@/utils";
import { useParams } from "react-router-dom";
import { ImageResources } from "@/types";
import { Loader } from "@/components";
import { useImages } from "../hooks";
import { ImagesBlock, Footer, PagePreview } from "../layouts";
import { useResizeWidth } from "@/hooks";
import { PageContainer } from "../components";

export function Category() {
  const width = useResizeWidth();
  const accessToken = localStorage.getItem("accessToken");
  const { category } = useParams();

  const fetchCategoryImages = async (): Promise<ImageResources> => {
    const { categoriesImages, categoriesUserImages } = endpoints.images;
    if (!accessToken) {
      const fetchForAnyone = await handleFetch(
        categoriesImages,
        "POST",
        {},
        { folder: category, next_cursor: "" }
      );
      return fetchForAnyone;
    }
    const fetchForUser = await handleFetch(
      categoriesUserImages,
      "POST",
      {},
      { token: accessToken, next_cursor: "", category: category }
    );
    return fetchForUser;
  };

  const queryKey = ["images", accessToken, category];
  const { data, isLoading, updateFavoriteImages } = useImages(queryKey, fetchCategoryImages);

  return (
    <PageContainer>
      {isLoading ? (
        <Loader style={{ margin: "auto" }} />
      ) : (
        <>
          <PagePreview imgURL={data?.page_preview} />
          <ImagesBlock width={width} data={data!} updateFavImages={updateFavoriteImages} />
        </>
      )}
      <Footer />
    </PageContainer>
  );
}

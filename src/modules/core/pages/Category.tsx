import { endpoints, handleFetch } from "@/utils";
import { useParams } from "react-router-dom";
import { ImageResources } from "@/types";
import { Loader } from "@/components";
import { useImages } from "../hooks";
import { ImagesBlock, Footer, PagePreview } from "../layouts";
import { useResizeWidth } from "@/hooks";
import { PageWrapper } from "../components";
import { paths } from "@/utils";

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
  const { page_preview, text_for_page_preview } = data || {};

  const { name } = paths.find(({ path }) => path === category) || {};

  return (
    <PageWrapper>
      {isLoading ? (
        <Loader style={{ margin: "auto" }} />
      ) : (
        <>
          <PagePreview imgURL={page_preview} title={name} description={text_for_page_preview} />
          <ImagesBlock width={width} data={data!} updateFavImages={updateFavoriteImages} />
        </>
      )}
      <Footer />
    </PageWrapper>
  );
}

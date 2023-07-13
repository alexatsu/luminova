import { ImagesBlock, Footer, PagePreview } from "../layouts";
import { PageWrapper } from "../components";
import { Loader } from "@/components";

import { useDebounce, useResizeWidth } from "@/hooks";
import { useImages } from "../hooks";

import { downloadImage } from "../utils";
import { Resources } from "@/types";
import { endpoints, handleFetch } from "@/utils";

export function Home() {
  const width = useResizeWidth();
  const { debouncedValue: debouncedWidth } = useDebounce<number>(width, 400);
  const category = "gallery";
  const queryKey = ["images", category];
  const { data, isLoading, updateFavoriteImages } = useImages(fetchData, queryKey);

  const { pagePreview, images } = data || {};
  
  async function fetchData() {
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
  return (
    <PageWrapper>
      {isLoading ? (
        <Loader style={{ margin: "auto" }} />
      ) : (
        <>
          <PagePreview
            imgURL={pagePreview?.img}
            title={"Luminova"}
            description={pagePreview?.description}
          />
          <ImagesBlock
            width={debouncedWidth}
            data={images as Resources[]}
            updateFavImages={updateFavoriteImages}
            download={downloadImage}
          />
        </>
      )}
      <Footer />
    </PageWrapper>
  );
}

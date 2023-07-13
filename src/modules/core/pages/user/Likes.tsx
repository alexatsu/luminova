import { Resources } from "@/types";
import { useImages } from "../../hooks";
import { ImagesBlock } from "../../layouts";
import { useDebounce, useResizeWidth } from "@/hooks";
import { downloadImage } from "../../utils";
import { handleFetch } from "@/utils";
import { PageWrapper } from "../../components";
import { Loader } from "@/components";
import { Suspense } from "react";

export const Likes = () => {
  const width = useResizeWidth();
  const { debouncedValue: debouncedWidth } = useDebounce<number>(width, 400);

  const queryKey = ["likes"];
  const { data, isLoading, updateFavoriteImages } = useImages(dataFavorite, queryKey);
  const { images } = data || {};

  async function dataFavorite() {
    console.log("fired");
    const userName = localStorage.getItem("userName");
    const url = "http://localhost:8080/images/getfavorites";
    const response = await handleFetch(url, "POST", { name: userName });
    return response;
  }

  return (
    <>
      {/* <PageWrapper> */}
        <Suspense fallback={<Loader style={{ margin: "auto" }} />}>
          <ImagesBlock
            data={images as Resources[]}
            updateFavImages={updateFavoriteImages}
            width={debouncedWidth}
            download={downloadImage}
          />
        </Suspense>
      {/* </PageWrapper> */}
    </>
  );
};
